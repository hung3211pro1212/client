<template>
  <div class="p-8 bg-white rounded-3xl">
    <h1 class="text-3xl font-bold mb-10">Danh sách bộ môn</h1>
    <div class="flex justify-between mb-5">
      <div class="flex gap-5">
        <div class="flex flex-col">
          <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              for="khoiName"
          >Chọn bộ môn</label
          >
          <select

              id="listClass"
              class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="khoiName"
              @change="changeValue"
          >
            <option selected value="">Chọn bộ môn</option>
            <option
                v-for="(item, index) in this.listSubject"
                :key="item.id"
                :value="item.name"
            >
              {{ item.name }}
            </option>
          </select>
        </div>

      </div>
      <div class="flex gap-6">

        <div class="mt-[26px] justify-end">
          <button
              class="hover:bg-blue-500 hover:text-white border-[1px] border-blue-400 px-5 py-3 rounded-3xl"
              @click="this.isShow = true"
          >
            Thêm học bộ môn
          </button>
        </div>
      </div>
    </div>
    <TableClass :dataHeader="this.HeaderData" :listClass="this.listSubject" typeAccount="gv" :classes="this.subjectTeacher"  @onClickHandler="onClickHandler" />
    <AddFromSubjectTeacher
        :isOpen="this.isShow"
        @close="closeToggle"
        @success="addSubject"
    />

    <FormEdit
        :dataEditor="this.dataEditor"
        :isOpen="this.isEditor"
        :listClass="this.listClass"
        @close="closeToggle"
    />
    <ModalDelete
        :isActionDelete="this.isDeleteAction"
        @close="closeToggle"
        @delete="DeleteAction"
    />
    <notifications
        class="mt-3"
        :duration="2000"
        :width="400"
        animation-type="velocity"
        position="top right" />
  </div>
</template>

<script>
import TableClass from "@/components/TableData/TableClass.vue";
import SubjectTeacherService from "@/api/SubjectTeacher";
import AddFormClass from "@/components/AddForm/AddFormClass.vue";
import AddFromSubjectTeacher from "@/components/AddForm/AddFromSubjectTeacher.vue";
import SubjectTeacher from "@/api/SubjectTeacher";
import SubjectService from "@/api/Subject";

export default {
  name: "QuanLyBoMon",
  components: {AddFromSubjectTeacher,  TableClass},
  data() {
    return {
      listSubject: [],
      HeaderData: ["Số thứ tự", "Tên Bộ Môn", "Số lượng giáo viên"],
      isShow:false,
      subjectTeacher:[]
    }
  },
  created() {
    SubjectTeacherService.getAll().then(res => {
      this.listSubject = res.data
      console.log(this.listSubject)
    })
    SubjectTeacherService.getAllbyPage(1).then(res => {
      console.log(res.data)
      this.subjectTeacher = res.data
    })
  },
  watch:{
    isShow:function (newValue){
      SubjectTeacherService.getAll().then(res => {
        this.listSubject = res.data
        console.log(this.listSubject)
      })
    }
  },
  methods:{
    closeToggle(){
      this.isShow = false
    },
    addSubject(data){
     SubjectTeacherService.create(data).then(res => {
       this.$notify({
         type: "success",
         title: "Thành Công",
         text: `Tạo bộ môn thành công`,
       });
       this.isShow = false
     })
    },
    onClickHandler(page){


        SubjectTeacher.getAllbyPage(page).then(
            response =>{
              this.subjectTeacher = response.data
            }

        )
        // SubjectTeacher.filterSubjectbyPage(page,this.khoi).then(
        //     response => this.subject = response.data
        // )


    },
  }
}
</script>

<style scoped>

</style>