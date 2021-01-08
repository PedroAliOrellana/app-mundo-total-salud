<template>
<div>
    <li class="nav-item" v-if="link.children">
      <div @click="colapse">
        <router-link :to="link.path" event class="nav-link">
          <template>
            <i :class="link.icon"></i>
            <span class="nav-link-text">
              <strong>{{ link.name }}</strong>
            </span>
          </template>
        </router-link>
      </div>
      <div v-if="collapsed">
        <ul class="nav-item" v-for="link in link.children" :key="link.url_vista">
          <router-link
            :to="link.url_vista"
            @click.native="linkClick"
            class="nav-link"
            :target="link.target"
            :href="link.url_vista"
          >
            <template><!-- 
              <i :class="link.icono"></i> -->
              <span class="nav-link-text">
                <strong>{{ link.nombre }}</strong>
              </span>
            </template>
          </router-link>
        </ul>
      </div>
    </li>
    <li class="nav-item" v-else>
      <router-link
        :to="link.path"
        @click.native="linkClick"
        class="nav-link"
        :target="link.target"
        :href="link.path"
      >
        <template>
          <i :class="link.icon"></i>
          <span class="nav-link-text">
            <strong>{{ link.name }}</strong>
          </span>
        </template>
      </router-link>
    </li>
  </div>
</template>
<script>
/* import NavLink from './NavLink/NavLink'; */

export default {
  name: "sidebar-item" /* ,
    components: { NavLink } */,
  props: {
    link: {
      type: Object,
      default: () => {
        return {
          name: "",
          path: "",
          children: [],
        };
      },
      description:
        "Sidebar link. Can contain name, path, icon and other attributes. See examples for more info",
    },
  },
  inject: {
    autoClose: {
      default: true,
    },
  },
  data() {
    return {
      children: [],
      collapsed: false,
    };
  },
  methods: {
    linkClick() {
      if (
        this.autoClose &&
        this.$sidebar &&
        this.$sidebar.showSidebar === true
      ) {
        this.$sidebar.displaySidebar(false);
      }
    },
    colapse() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>