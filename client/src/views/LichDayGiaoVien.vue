<template lang="">
    <div>
        <ViewShedule
            :class-name="this.viewClass"
            :isOpen="this.isShowView"
            :shedule="this.dataEdit"
          />
    </div>
</template>
<script>
import ViewShedule from "./../components/TableData/ViewShedule.vue"
import TeacherScheduleService from "../api/TeacherShedule";
export default {
  name: "LichDayGiaoVien",
  components: {
    ViewShedule,
  },
  created() {
    this.getAllData()
  },
  data(){
    return {
     
      dataEdit: [],
     
    }
  },
  methods: {
    getAllData() {
      TeacherScheduleService.getByClass(this.$store.state.auth.user.data, undefined).then(
        (result) => {
          this.dataEdit = result.data;
          console.log(result.data)
        }
      );
    },
  },
};
</script>
<style lang="">
</style>