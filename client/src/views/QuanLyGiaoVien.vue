<template lang="">
     <div class="p-8 bg-white rounded-3xl">
    <h1 class="text-3xl font-bold mb-10">Quản lý Giáo Viên</h1>
    <div class="flex justify-between mb-5">
      <div class="flex gap-5">
        <div class="flex flex-col">
          <label
            for="listClass"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Chọn bộ môn giảng dạy</label
          >
          <select

            @change="changeValue"
            id="listClass"
            name="listClass"
            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected value='' >Tất cả </option>
            <option
              v-for="(item, index) in this.subjectTeacher"
              :key="item.id"
              :value="item.name"
            >
              {{
    item.name
  }}
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
             class="hover:bg-yellow-500 hover:text-white border-[1px] border-yellow-400 px-5 py-3 rounded-3xl"
             @click="this.isShowExcel = true"
           >
             Nhập Excel
           </button>
         </div>
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
             Thêm giáo viên
           </button>
         </div>
       </div>
     </div>
     <DataTable :dataColumns="this.listTeacher" :DataHeader="this.DataHeader" @actionEdit="editAction" @actionDelete="actionDelete"/>
     <AddFormTeacher
     @success="success"
       :isOpen="this.isShow"
       :listClass="this.subjectTeacher"
       @close="closeToggle"
     />
   <ExcelTable :isOpen="this.isShowExcel" @close="closeToggle"  account="gv" @importExcel="importExcel"/>
    <FormEditTeacher :dataEditor="this.dataEditor" :isOpen="this.isEditor" :class="this.subjectTeacher" :listSubject="this.subjectTeacher" @close="closeToggle" @upload="editUpdate"/>
    <ModalDelete :isActionDelete="this.isDeleteAction" @close="closeToggle" @delete="DeleteAction"/>
   </div>
</template>
<script>
import PermissionsServiece from "@/api/permission";
import SubjectTeacher from "@/api/SubjectTeacher";
import AddFormTeacher from "../components/AddForm/AddFormTeacher.vue";
import DataTable from "../components/TableData/TableDate.vue";
import ExcelTable from"../components/ExcelTable.vue";
import FormEditTeacher from "../components/FormEdit/FormEditTeacher.vue";
import AuthService from "@/api/auth/auth.service";
import  ModalDelete from "../components/ModalDelete.vue";
import UserService from "@/api/auth/user.service";
import xlsx from "xlsx/dist/xlsx.full.min";
import userService from "@/api/auth/user.service";
import ClassService from "@/api/Class";
export default {
  name: "QuanLyGiaoVien",
  data() {
    return {
      listTeacher: [],
      DataHeader: [
        "Mã Giáo Viên",
        "Họ tên",
        "Giới tính",
        "Ngày sinh",
        "Bộ Môn Giảng Dạy",
        "Địa chỉ",
        "Số điện thoại",
        "Email",
        "Chức năng",
      ],
      subjectTeacher: [],
      temp: [],
      isShow: false,
      isEditor:false,
      isDeleteAction:false  ,
      isShowExcel:false,
      dataEditor:[]
    }
  },
  components: {
    DataTable,
    AddFormTeacher,
    ExcelTable,
    FormEditTeacher,
    ModalDelete
  },

  mounted() {
    PermissionsServiece.getTeacher().then((res) => {
      this.listTeacher = res.data.permission[0].Account;
      this.temp = this.listTeacher
      console.log('datatable', this.listTeacher)
    });
    SubjectTeacher.getAll().then((res) => {
      this.subjectTeacher = res.data;
      console.log('datatable', this.subjectTeacher)
    })

  },
  watch: {
    isShowExcel: function (newValue) {
      PermissionsServiece.getTeacher().then((res) => {
        this.listTeacher = res.data.permission[0].Account;
        this.temp = this.listTeacher
      });
    },
    isEditor: function (newValue) {
      console.log(123)
      PermissionsServiece.getTeacher().then((res) => {
        this.listTeacher = res.data.permission[0].Account;
        this.temp = this.listTeacher
      });
    },
  },
  methods: {
    importExcel(data){
      console.log('data', data)
      userService.importExcelTeacher(data).then(res => {
        this.isShowExcel = false
        this.$notify({
          type: "success",
          title: "Thành Công",
          text: `Thêm Excel Thành Công`,
        });
      })
    },
    exportExcel() {
      const Heading = [['Ten']]
      const XLSX = xlsx;
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(  this.listTeacher, {original: 'A2',});
      XLSX.utils.sheet_add_aoa(workbook, Heading, {origin: 'A1'});
      XLSX.utils.book_append_sheet(workbook, worksheet, "framework");
      XLSX.writeFile(workbook, `Danh sách giáo viên.xlsx`);
      console.log(this.class);
    },
    editAction(userName) {
      this.dataEditor = this.listTeacher.filter(el => el.userName == userName);
      // console.log(this.dataEditor)
      console.log(userName)
      this.isEditor = true;
    },
    changeValue(e) {
      if (this.temp != this.listTeacher) {
        this.listTeacher = this.temp
      }
      if (e.target.value != '') {
        this.listTeacher = this.listTeacher.filter(
            el => el.subjectTeacherName == e.target.value
        )
        console.log(this.listTeacher)
      } else {
        this.listTeacher = this.temp
      }

    },
    closeToggle() {
      this.isShow = false;
      this.isShowExcel = false,
          this.isEditor = false,
          this.isDeleteAction = false
    },
    actionDelete(userName) {
      this.userDelete = userName
      this.isDeleteAction = true;
    },
    DeleteAction() {
      this.userDelete
      console.log(this.userDelete)
      UserService.UserDelete(this.userDelete).then(() => {
        this.listTeacher =   this.listTeacher.filter(el => el.userName != this.userDelete);
        this.isDeleteAction = false;
        this.$notify({type: "success", title: "Thành Công", text: `Xóa tài khoản thành công`});
      })
    },

    editUpdate(user,username) {
      let data
      UserService.updateProfileUser(user).then((res) => {
        data = res.data
        console.log('data',data)
        this.listTeacher = this.listTeacher.map(el => el.userName === res.data.userName ? {...data}: el )
        this.isEditor = false
        this.$notify({type: "success", title: "Thành Công", text: `Update Thông tin thành công`});
      })
      console.log('listClass',user)
    },
    success(data) {
       AuthService.signUpTeacher(data).then((result) => {
         console.log(result);
         if(result.isError){
           this.show = false
           this.$notify({ type: "error",title:"Lỗi", text: `${result.message}` });
         }else {
           this.$notify({ type: "success",title:"Thành Công", text: `${result.message}` });
         }

       }).catch(err => {
         console.log(err.message)

       })    }
  }
}
</script>
<style lang="">
    
</style>