<template lang="">
    <div class="flex flex-col bg-yellow-400 h-full w-40">
        <h1>Logo</h1>
        <nav>
            <ul v-for="(item,index) in menus">
                <li>{{item.name}}</li>
            </ul>
        </nav>
    </div>
</template>
<script>
import { axiosinstance } from '../api/api';
export default {
    name: "Navigation",
    data() {
        return {
            menus: [],
            errors: []
        }
    },
    mounted() {
        this.getMenu();
    },
    methods: {
        getMenu() {
            axiosinstance.get('menu').then((res) => {
                console.log(res.data)
                this.menus = res.data
            })
        }
    }


}
</script>
<style lang="">

</style>