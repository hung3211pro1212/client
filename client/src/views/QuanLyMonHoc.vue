<template>
  <div class="p-8 bg-white rounded-3xl">
    <h1 class="text-3xl font-bold mb-10">Danh sách môn học</h1>
    <div class="flex justify-between mb-5">
      <div class="flex gap-5">
        <div class="flex flex-col">
          <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              for="khoiName"
          >Chọn Khối</label
          >
          <select
              id="listClass"

              class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="khoiName"
              @change="changeValue"
          >
            <option value="" selected>Tất Cả</option>
            <option
                v-for="(item, index) in  this.listKhoi"
                :key="item.id"
                :value="item.name"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
        <div>
          <button
              class="border-[1px] border-[#FEF08A] px-5 py-3 rounded-[25px] mt-[26px] hover:bg-[#FEF08A]"
              @click="fitterStudent"
          >
            Lọc
          </button>
        </div>
      </div>
      <div class="flex gap-6">
        <div class="mt-[26px] justify-end">
          <button
              class="hover:bg-green-500 hover:text-white border-[1px] border-green-400 px-5 py-3 rounded-3xl"
              @click="exportExcel"
          >
            Xuất Excel
          </button>
        </div>
        <div class="mt-[26px] justify-end">
          <button
              class="hover:bg-blue-500 hover:text-white border-[1px] border-blue-400 px-5 py-3 rounded-3xl"
              @click="this.isShow = true"
          >
            Thêm Môn Học
          </button>
        </div>
      </div>
    </div>
    <TableSubject :dataHeader="this.HeaderData" :listSubject="this.listSubject" :subject="this.subject" @onClickHandler="onClickHandler" @actionEdit="actionEdit" @actionDelete="DeleteAction"/>
    <AddFormSubject
        :isOpen="this.isShow"
        :listClass="this.listKhoi"
        @addClass="addSubject"
        @close="closeToggle"
    />
    <ExcelTable :isOpen="this.isShowExcel" @close="closeToggle"/>
    <FormEditSubject
        :dataEditor="this.dataEditor"
        :isOpen="this.isEditor"
        :listKhoi="this.listKhoi"
        @update="update"
        @close="closeToggle"
    />
    <ModalDelete
        :isActionDelete="this.isDeleteAction"
        @close="closeToggle"
        @delete="DeleteSubject"
    />
  </div>
</template>

<script>

import SubjectService from "@/api/Subject";
import TableData from "@/components/TableData/TableDate.vue";
import TableSubject from "@/components/TableData/TableSubject.vue";
import AddFormSubject from "@/components/AddForm/AddFormSubject.vue";
import listClass from "@/api/listClass";
import FormEditSubject from "@/components/FormEdit/FormEditSubject.vue";
import ModalDelete from "@/components/ModalDelete.vue";

export default {
  name: "QuanLyMonHoc",
  components: {ModalDelete, FormEditSubject, AddFormSubject, TableSubject, TableData},
  data() {
    return {
      listSubject: [],
      HeaderData: [
        "Số Thứ Tự",
        "Tên Môn Học",
        "Khối",
        "Chức Năng"
      ],
      isShow: false,
      listKhoi: [],
      subject:[],
      khoi:"",
      isEditor:false,
      dataEditor:{},
      idSubject:'',
      isDeleteAction:false,

    }
  },
  watch : {
    isShow: function (newValue) {
      SubjectService.getAllSubjects().then(
          response => this.listSubject = response.data
      )
    },
  },
  methods: {
    changeValue(e){
      this.khoi = e.target.value
      SubjectService.filterSubjectbyPage(1,this.khoi).then(response => {
       this.subject = response.data
      })
      SubjectService.filterSubjectbyPage(NaN,this.khoi).then(response => {
        this.listSubject = response.data
      })
      if(this.khoi===""){
        SubjectService.getAllSubjects().then(
            response => {this.listSubject = response.data}
        )
        SubjectService.getPaginationSubject(1).then(
            response => this.subject = response.data
        )
      }

    },
    closeToggle() {
      this.isShow = false
      this.isEditor = false
      this.isDeleteAction = false
    },
    addSubject(data){
      console.log(data)
      SubjectService.createSubject(data).then(result =>{
        console.log(result.data)
        this.isShow = false
        this.$notify({
          type: "success",
          title: "Thành Công",
          text: `Thêm Môn Học Thành Công`,
        });
      })
    },
    actionEdit(id){

      this.isEditor=true
      this.idSubject = id
      console.log(id)
      SubjectService.getAllSubjectsById(id).then(
          response => this.dataEditor = response.data

      )
    },
    onClickHandler(page){

      if(this.khoi ==="all"||this.khoi ===""){
        SubjectService.getPaginationSubject(page).then(
            response => this.subject = response.data
        )
      }else{
        SubjectService.filterSubjectbyPage(page,this.khoi).then(
            response => this.subject = response.data
        )
      }

    },
    update(data) {
      SubjectService.updateData(data,this.idSubject).then(
          response => {
            this.isEditor=false
            this.listSubject = this.listSubject.map(el => el.id  === response.data.id ? { ...response.data} :el)
            this.subject = this.subject.map(el => el.id  === response.data.id ? { ...response.data} :el)
            this.$notify({type: "success", title: "Thành Công", text: `Update Thông tin thành công`});
          }

      )

    },
    DeleteAction(id){
      console.log(id)
      this.idSubject = id
      this.isDeleteAction = true
    },
    DeleteSubject(id){
      SubjectService.deleteSubject(this.idSubject).then(() =>{
        this.subject = this.subject.filter(el => el.id != this.idSubject);
        this.isDeleteAction = false;
        this.$notify({type: "success", title: "Thành Công", text: `Xóa tài khoản thành công`});
      })
    }

  },
  created() {
    SubjectService.getAllSubjects().then(
        response => {this.listSubject = response.data}

    )
    listClass.getAll().then(response => {

      this.listKhoi = response.data.listClass
      console.log(this.listKhoi)
    })
    SubjectService.getPaginationSubject(1).then(
        response => this.subject = response.data
    )
  }
}
</script>

