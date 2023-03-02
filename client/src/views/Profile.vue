<template lang="">
  <div class="container mx-auto px-4 mt-[400px]">
    <div
      class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64"
    >
      <div class="px-6">
        <div class="flex flex-wrap justify-center">
          <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
            <div class="relative">
              <img
              :src="user.avatar==null ? '/src/assets/avatarDefault.jpg':'http://localhost:4000/users/img/'+user.avatar" alt="..."
                class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
              />
            </div>
          </div>
          <div
            class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center"
          >
            <div class="py-6 px-3 mt-32 sm:mt-0">
              <button
                class="bg-[rgba(51,65,85,1)] active:bg-blueGray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                Connect
              </button>
            </div>
          </div>
          <div class="w-full lg:w-4/12 px-4 lg:order-1">
            <div class="flex justify-center py-4 lg:pt-4 pt-8">
               
               
            </div>
          </div>
        </div>
        <div class="text-center mt-1">
          <div
            class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase"
          >
            <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
 
           <div class="flex-1 bg-white rounded-lg shadow-xl p-8">
                    <h4 class="text-xl text-gray-900 font-bold">Jenna Stones</h4>
                    <ul class="mt-2 text-gray-700">
                      <li class="flex border-b py-2">
                            <span class="font-bold w-24">Username:</span>
                            <span class="text-gray-700">{{user.userName}}</span>
                        </li>
                        <li class="flex border-y py-2">
                            <span class="font-bold w-24">Email:</span>
                            <span class="text-gray-700">{{user.email}}</span>
                        </li>
                        <li class="flex border-b py-2">
                            <span class="font-bold w-24">Giới tính:</span>
                            <span class="text-gray-700">{{user.sex}}</span>
                        </li>
                        <li class="flex border-b py-2">
                            <span class="font-bold w-24">Ngày sinh:</span>
                            <span class="text-gray-700">{{user.date}}</span>
                        </li>
                        <li class="flex border-b py-2">
                            <span class="font-bold w-24">Địa chỉ:</span>
                            <span class="text-gray-700">{{user.Address}}</span>
                        </li>
                        <li class="flex border-b py-2">
                            <span class="font-bold w-24">Số điện thoại:</span>
                            <span class="text-gray-700">{{user.numberPhone}}</span>
                        </li>
                        <li class="flex border-b py-2">
                            <span class="font-bold w-24">Fullname:</span>
                            <span class="text-gray-700">{{user.firstName }} {{user.lastName }} </span>
                        </li>
                      
                        <li class="flex border-b py-2">
                            <span class="font-bold w-24">Lớp:</span>
                            <span class="text-gray-700">{{user.className}}</span>
                        </li>
                         
                    </ul>
                </div>
          </div>
          <div class="mb-2 text-blueGray-600 mt-10">
            <i class="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i
            >Solution Manager - Creative Tim Officer
          </div>
          <div class="mb-2 text-blueGray-600">
            <i class="fas fa-university mr-2 text-lg text-blueGray-400"></i
            >University of Computer Science
          </div>
        </div>
        <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
          <div class="flex flex-wrap justify-center">
            <div class="w-full lg:w-9/12 px-4">
              <p class="mb-4 text-lg leading-relaxed text-blueGray-700">
                An artist of considerable range, Jenna the name taken by
                Melbourne-raised, Brooklyn-based Nick Murphy writes, performs
                and records all of his own music, giving it a warm, intimate
                feel with a solid groove structure. An artist of considerable
                range.
              </p>
              <a href="#pablo" class="font-normal text-lightBlue-500"
                >Show more</a
              >
            </div>
          </div>
          <div>
            <div >
             
                <input ref="fileInput" type="file" name="file" id=""  accept="image/png, image/jpeg" >
                 <button @click="onUpLoad">submit</button>
           
        
            </div>
         
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import userService from '../api/auth/user.service';

export default {
  name: 'ProFile',
  data() {
    return {
      user: [],
      fileInput: null
    }
  },

  computed: {
  },
  methods: {


    onUpLoad() {
      console.log(this.$refs.fileInput.value)
      console.log()
      const fd = new FormData()
      fd.append('file', this.$refs.fileInput.files[0])
      console.log(fd.getAll('file'))
      // userService.updateAvatar(this.$store.state.auth.user, this.$refs.fileInput.files[0])

    }
  },
  mounted() {

    userService.getUser(this.$store.state.auth.user).then(
      res => {
<<<<<<< HEAD
        this.user = res.data.user
        console.log(this.user);
=======

        this.users = res.data.user
        console.log(this.users);
>>>>>>> 07c50f1ce3d1b390607c4f490893dfc886f13cdd

      }, error => {
        this.user =
          (error.res && error.res.data) ||
          error.message ||
          error.toString();
      }
    )


  }
};
</script>
<style lang=""></style>
