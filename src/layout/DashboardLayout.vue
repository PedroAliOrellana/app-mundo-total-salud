<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title=""
      title=""
    >
      <template slot="links">
        <div v-for="item in items" :key="item._id">
            <sidebar-item v-if="item.children.length != 0" :link="{name: item.nombre, icon: item.icono,children: item.children, path: item.url_vista}"/> 
            <sidebar-item v-else :link="{name: item.nombre, icon: item.icono, path: item.url_vista}"/> 
         </div>
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>

  import axios from 'axios'
  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      FadeTransition
    },
    data() {
      return {
        sidebarBackground: 'red', //vue|blue|orange|green|red|primary        
        items:[{
                nombre: "",
                icono: "",
                url_vista:"",
                children: [],
        }]
      };
    },
    beforeMount: async function(){
       if(localStorage.getItem('token')==null){
          alert("Ingresa nuevamente")
          this.$router.push('/identifcacion/login')
        }else{    
          let menu = JSON.parse(localStorage.getItem('menu'))
          const resGet = await axios('http://localhost:3000/funcionalidades/rol/'+ menu._id)
          this.items = resGet.data
        }
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    }
  };
</script>
<style lang="scss">
</style>
