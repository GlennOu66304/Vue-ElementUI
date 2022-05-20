<template>
  <div class="rights">
    <!-- path section -->

    <!--S: Mian bao xie Component -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- table content -->
    <el-card>
      <!-- 2.data display -->
      <!-- S:When the page come in, then load the data from  -->
      <el-table :data="rightList" border width="100%">
        <!-- 2.2 data row -->
        <!-- 2.1 column name first row -->
        <!-- index column -->
        <el-table-column
          label="列表"
          width="100"
          align="center"
          type="index"
          fixed
        >
        </el-table-column>
        <el-table-column prop="authName" label="权限名称" width="300">
        </el-table-column>
        <el-table-column prop="path" label="路径" width="300">
        </el-table-column>
        <el-table-column
          prop="level"
          label="权限等级"
          width="300"
          fixed="right"
        >
          <!-- slot get the current row data -->
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag v-else-if="scope.row.level === '1'" type="success"
              >二级</el-tag
            >
            <el-tag v-else type="info">三级</el-tag>
            <!-- eltag show the ui of the rights name -->

            <!-- v-if v-if-else v-if choose the tag color -->
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Rights",
  data() {
    return {
      rightList: [],
      value: true,
    };
  },

  created() {
    // load the table data first
    this.loadRightData();
  },
  methods: {
    async loadRightData() {
      await this.$axios.get("/api/rights/list").then((res) => {
        // console.log(res.data);
        this.rightList = res.data.data;

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
</style>
