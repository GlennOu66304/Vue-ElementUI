<template>
  <div class="roles">
    <!-- path section -->

    <!--S: Mian bao xie Component -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- table content -->
    <el-card>
      <!-- search section -->

      <!-- 1.search section -->
      <!-- 1.1 search input -->

      <!-- S: When you click the search or hit the eneter, it will call the api and render the data below -->

      <el-row :gutter="20">
        <!-- 1.3 add new user : Modal icon effect use-->
        <!-- S:1. Modal Compoenent use 2. call the api request-->
        <el-col :span="4">
          <el-button type="primary">添加角色</el-button></el-col
        >
      </el-row>

      <el-row>
        <!-- 2.data display -->
        <!-- S:When the page come in, then load the data from  -->
        <el-table :data="rolestList" border stripe>
          <!-- 2.2 data row -->
          <!-- 2.1 column name first row -->
          <!-- expan column -->

          <el-table-column label="展开" align="center" type="expand" fixed>
            <template slot-scope="scope">
              <!-- <pre> {{ scope.row.children }} </pre> -->
              <el-row v-for="(item1, index) in scope.row.children" :key="index">
                <!-- 1.2three columns(level1, level2, level3) -->
                <!-- 1.3 leve1 has a tag and close icon, the right arrow,blue color

1.4 leve2 has a tag and close icon, the right arrow,green color

1.5 leve3 has a tag and close icon, gray color

1.6 the close icon is clickble, it will pop up the mssage box to confirm  -->
                <el-col :span="5">
                  <el-tag>
                    {{ item1.authName }}<i class="el-icon-close"></i> </el-tag
                  ><i class="el-icon-caret-right"></i
                ></el-col>

                <el-col :span="19">
                  <el-row
                    :class="[
                      'expand-bottom-line',
                      index === 0 ? 'expand-top-line' : '',
                    ]"
                    v-for="(item2, index) in item1.children"
                    :key="index"
                  >
                    <!-- level2 -->
                    <el-col :span="6">
                      <el-tag type="success">
                        {{ item2.authName
                        }}<i class="el-icon-close"></i> </el-tag
                      ><i class="el-icon-caret-right"></i
                    ></el-col>

                    <!-- level3 -->
                    <el-col :span="18">
                      <el-tag
                        v-for="(item3, index) in item2.children"
                        :key="index"
                        type="warning"
                        >{{ item3.authName }}<i class="el-icon-close"></i>
                      </el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <!-- index column -->
          <el-table-column label="列表" align="center" type="index">
          </el-table-column>
          <el-table-column prop="roleName" label="角色名称" align="center">
          </el-table-column>
          <el-table-column
            prop="roleDesc"
            label="角色描述"
            width="190"
            align="center"
          >
          </el-table-column>

          <!-- 2.3 data edit, delete, assign the perssion :Modal Pop up-->
          <el-table-column label="操作" align="center" fixed="right">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              ><i class="el-icon-edit"></i
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              ><i class="el-icon-delete"></i
            ></el-button>

            <el-button
              size="mini"
              type="warning"
              @click="handleDelete(scope.$index, scope.row)"
            >
              <i class="el-icon-setting"></i
            ></el-button>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Roles",
  data() {
    return {
      value: true,
      rolestList: [],
    };
  },
  created() {
    // load the table data first
    this.loadRoletData();
  },

  methods: {
    async loadRoletData() {
      await this.$axios.get("/api/roles").then((res) => {
        // console.log(res.data);
        this.rolestList = res.data.data;

        // console.log(this.rightList);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}
.el-row {
  margin-bottom: 20px;
}
.el-tag {
  margin: 7px;
}
.expand-top-line {
  border-top: 1px solid #eee;
}
.expand-bottom-line {
  border-top: 1px solid #eee;
}
</style>
