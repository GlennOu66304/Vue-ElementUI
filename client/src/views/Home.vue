<template>
  <!-- total continer -->
  <el-container style="height: 500px; border: 1px solid #eee">
    <!-- header row -->
    <el-header
      style="text-align: right; font-size: 12px; background-color:#373d3f;"
    >
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- Aside and Main contet in one row -->

    <el-container>
      <!-- left aside -->
      <el-aside width="200px">
        <!-- menu container -->

        <el-menu
          router
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
        >
          <!-- group 1 -->
          <el-submenu
            v-for="item in menuList"
            :key="item.id"
            :index="item.id + ''"
          >
            <!--toggle title -->
            <span slot="title">
              <!-- dynamic get the data -->
              <i :class="iconObej[item.id]"></i>

              {{ item.authName }}</span
            >

            <el-menu-item
              v-for="subItem in item.children"
              :key="subItem.id"
              :index="'/' + subItem.path"
              ><i class="el-icon-menu"></i
              ><span>{{ subItem.authName }}</span></el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- right side content -->

      <el-main>
        <router-view> </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import menuList from "../config/menuConfig";

export default {
  name: "Home",
  data() {
    return {
      // fake data generate
      menuList: menuList,
      iconObej: {
        "125": "el-icon-user-solid",
        "103": "el-icon-s-operation",
        "101": "el-icon-s-goods",
        "102": "el-icon-s-order",
        "145": "el-icon-s-data",
      },
    };
  },

  created() {
    console.log(menuList);
  },

  methods: {
    logout() {
      // save the token into the session
      window.sessionStorage.clear();
      // router push to the /home section
      this.$router.push("/");
    },
  },
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background-color: #333744;
}
</style>
