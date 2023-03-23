<template lang="">
  <div class="p-8 bg-white rounded-3xl">
    <h1 class="text-3xl font-bold mb-10">Danh sách lớp học</h1>
    <div class="flex justify-between mb-5">
      <div class="flex gap-5">
        <div class="flex flex-col">
          <label
            for="khoiName"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Chọn Khối</label
          >
          <select
            @change="changeValue"
            id="listClass"
            name="khoiName"
            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="" selected >Tất Cả</option>
            <option
              v-for="(item, index) in this.filterClass"
              :key="item.id"
              :value="item.Khoi"
            >
              {{
    item.Khoi
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
     <TableClass :dataHeader="this.HeaderData" :listClass="this.listClass" typeAccount="hs" :classes="this.class" @onClickHandler="onClickHandler"/>
     <AddFormClass
       :isOpen="this.isShow"
       :listClass="this.filterClass"
       @close="closeToggle"
       @addClass="addClass"
     />
     <ExcelTable :isOpen="this.isShowExcel" @close="closeToggle" />
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
   </div>
</template>
<script>
import TableClass from "@/components/TableData/TableClass.vue";
import ClassService from "@/api/Class";
import ExcelTable from "@/components/ExcelTable.vue";
import xlsx from "xlsx/dist/xlsx.full.min";
import AddFormClass from "@/components/AddForm/AddFormClass.vue";
import {notify} from "@kyvg/vue3-notification";
import SubjectService from "@/api/Subject";

notify({
  title: "Authorization",
  text: "You have been logged in!",
});
export default {
  name: "DanhSachLopHoc",
  components: {
    TableClass,
    ExcelTable,
    AddFormClass,
  },

  data() {
    return {
      HeaderData: ["Số thứ tự", "Tên lớp", "Khối", "Số lượng học sinh"],
      listClass: [],
      lengthStudent: [],
      filterClass: [],
      isShow: false,
      isShowExcel: false,
      class: [], khoi: ""
    };
  },
  watch: {
    isShow: function (newValue) {
      ClassService.getClass().then((res) => {
        this.listClass = res.data.classList;
      });
    },
  },
  methods: {
    changeValue(e) {
      this.khoi = e.target.value;
      ClassService.filterClass(e.target.value).then((res) => {
        this.listClass = res.data;
        console.log(res.data)
      });
      console.log(this.khoi)
    },
    onClickHandler(page) {
      console.log('page', page)
      if (this.khoi === "All" || this.khoi === "") {
        ClassService.getAllPagination(page).then(
            response => {
              this.class = response.data
            }
        )
      } else {
        SubjectService.filterSubjectbyPage(page, this.khoi).then(
            response => this.subject = response.data
        )
      }

    },
    addClass(data) {
      ClassService.createClass(data).then((result) => {
        this.isShow = false;
        if (result.data.isError) {
          this.$notify({
            type: "error",
            title: "Lỗi",
            text: `${result.data.message}`,
          });
        } else {
          this.$notify({
            type: "success",
            title: "Thành Công",
            text: `${result.data.message}`,
          });
        }
      });
    },

    closeToggle() {
      this.isShow = false;
      (this.isShowExcel = false),
          (this.isEditor = false),
          (this.isDeleteAction = false);
    },
    exportExcel() {
      const XLSX = xlsx;
      var Heading = ["Mã lớp", "Tên Lớp", "Khối"];

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(this.listClass);
      XLSX.utils.book_append_sheet(workbook, worksheet, "framework");
      XLSX.writeFile(workbook, `Danh sách Lớp.xlsx`);
      console.log(this.class);
    },
  },
  mounted() {
    ClassService.getClass().then((res) => {
      this.listClass = res.data;
      console.log(res.data);
      const khoi = this.listClass.map((o) => o.Khoi);
      this.filterClass = this.listClass.filter(
          ({Khoi}, index) => !khoi.includes(Khoi, index + 1)
      );
      console.log(this.filterClass);
    });
    ClassService.classPagination(1).then((res) => {
      this.class = res.data
      console.log(res.data)
    })
  },
};
</script>
<style lang="scss"></style>
