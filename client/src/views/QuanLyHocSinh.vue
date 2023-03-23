<script>
import userService from "../api/auth/user.service";
import ListClass from "../api/listClass";
import DataTable from "../components/TableData/TableDate.vue";
import AddForm from "../components/AddForm/AddForm.vue";
import ExcelTable from "../components/ExcelTable.vue";
import FormEdit from "../components/FormEdit/FormEdit.vue";
import ModalDelete from "@/components/ModalDelete.vue";
import xlsx from "xlsx/dist/xlsx.full.min";
import PermissionsServiece from "@/api/permission";
import AuthService from "@/api/auth/auth.service";
import UserService from "../api/auth/user.service";

export default {
  name: "QuanLyHocSinh",
  components: {
    DataTable,
    AddForm,
    ExcelTable,
    FormEdit,
    ModalDelete
  },

  data() {
    return {
      dataTable: [],
      listClass: [],
      class: [],
      nameClass: "",
      isShow: false,
      isShowExcel: false,
      file: null,
      dataEditor: null,
      isEditor: false,
      isDeleteAction: false,
      userDelete: '',
      nameKhoi: '',
      DataHeader: [
        "Mã học sinh",
        "Họ tên",
        "Giới tính",
        "Ngày sinh",
        "Lớp",
        "Địa chỉ",
        "Số điện thoại",
        "Email",
        "Chức năng",
      ]
    };
  },
   watch : {
    isEditor: function (newValue) {
      console.log(123)
      PermissionsServiece.getStudent().then((res) => {
        this.dataTable = res.data.permission[0].Account;
      });
    },
  },


  methods: {
    importExcel(data){
      userService.importExcel(data).then(res => {
        this.isShowExcel = false
      })
    },
    register(data) {
      AuthService.signUpStudent(data).then(
          res => {
            if (res.isError) {
              this.show = false
              this.$notify({type: "error", title: "Lỗi", text: `${res.message}`});
            } else {
              this.$notify({type: "success", title: "Thành Công", text: `${res.message}`});
            }
          }
      )
    },
    exportExcel() {
      const Heading = [['Ten']]
      const XLSX = xlsx;
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(this.dataTable, {original: 'A2',});
      XLSX.utils.sheet_add_aoa(workbook, Heading, {origin: 'A1'});
      XLSX.utils.book_append_sheet(workbook, worksheet, "framework");
      XLSX.writeFile(workbook, `Danh sách học sinh  ${this.nameClass}.xlsx`);
      console.log(this.class);
    },
    changeValue(e) {
      this.nameKhoi = e.target.value;
      if (e.target.value !== "") {
        ListClass.getListClassByName(e.target.value).then((res) => {
          this.class = res.data.classList[0].class;
        });
      }
    },
    changeValueClass(e) {
      this.nameClass = e.target.value;
    },
    fitterStudent() {
      if (this.nameKhoi != '') {
        ListClass.filter(this.nameKhoi, this.nameClass).then((res) => {
          console.log(res.data)
          this.dataTable = res.data[0].class[0].student
        });
      } else {
        PermissionsServiece.getStudent().then((res) => {
          this.dataTable = res.data.permission[0].Account;
          console.log()
        })
      }

    },
    closeToggle() {
      this.isShow = false;
      this.isShowExcel = false,
          this.isEditor = false,
          this.isDeleteAction = false
    },
    previewFiles(e) {
      console.log(e.target.files[0]);
      userService.uploadExcel(e.target.files[0]).then((res) => {
        console.log(res.data.result);
        console.log(Object.keys(res.data.result[0]));
      });
    },
    editAction(userName) {
      this.dataEditor = this.dataTable.filter(el => el.userName == userName);
      console.log(this.dataEditor)
      this.isEditor = true;
    },
    editUpdate(user,username) {
      let data
      UserService.updateProfileUser(user).then((res) => {
          data = res.data
        console.log('data',data)
          this.dataTable =  this.dataTable.map(el => el.userName === res.data.userName ? {...data}: el )
          this.isEditor = false
          this.$notify({type: "success", title: "Thành Công", text: `Update Thông tin thành công`});
      })
console.log('listClass',this.dataTable)
    },
    actionDelete(userName) {
      this.userDelete = userName
      this.isDeleteAction = true;
    },
    DeleteAction() {
      console.log(this.userDelete)
      UserService.UserDelete(this.userDelete).then(() => {
        this.dataTable = this.dataTable.filter(el => el.userName != this.userDelete);
        this.isDeleteAction = false;
        this.$notify({type: "success", title: "Thành Công", text: `Xóa tài khoản thành công`});
      })
    },

  },
  mounted() {
    UserService.getStudent().then((res) => {
      this.dataTable = res.data
      console.log(res.data)
    });
    ListClass.getAll().then((res) => {
      this.listClass = res.data.listClass;
    });
  },
   unmounted() {
   }
};
</script>
<template lang="">
  <div class="p-8 bg-white rounded-3xl">
    <h1 class="text-3xl font-bold mb-10">Quản lý học sinh</h1>
    <div class="flex justify-between mb-5">
      <div class="flex gap-5">
        <div class="flex flex-col">
          <label
            for="listClass"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Chọn Khối</label
          >
          <select
            v-model="valueSelect"
            @change="changeValue"
            id="listClass"
            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value=''>Chọn khối</option>
            <option
              v-for="(item, index) in this.listClass"
              :key="item.id"
              :value="item.name"
            >
              {{
    item.name
  }}
             </option>
           </select>
         </div>
         <div class="flex flex-col">
           <label
             for="countries"
             class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
             >Chọn lớp</label
           >
           <select
             @change="changeValueClass"
             id="countries"
             class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           >
             <option value=''>Chọn lớp</option>
             <option
               v-for="(item, index) in this.class"
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
             Thêm học sinh
           </button>
         </div>
       </div>
     </div>
     <DataTable :dataColumns="this.dataTable"  @actionEdit="editAction" @actionDelete="actionDelete" :DataHeader="this.DataHeader" />
     <AddForm
       :isOpen="this.isShow"
       :listClass="this.listClass"
       @close="closeToggle"
       @register="register"
     />
   <ExcelTable :isOpen="this.isShowExcel" @close="closeToggle" account="hs"  @importExcel="importExcel"/>
    <FormEdit :dataEditor="this.dataEditor" :isOpen="this.isEditor" :listClass="this.listClass" @close="closeToggle" @upload="editUpdate" />
    <ModalDelete :isActionDelete="this.isDeleteAction" @close="closeToggle" @delete="DeleteAction"/>
   </div>
</template>
<style lang=""></style>
