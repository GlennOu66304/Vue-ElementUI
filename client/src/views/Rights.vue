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
      <el-table :data="tableData" border width="100%">
        <!-- 2.2 data row -->
        <!-- 2.1 column name first row -->
        <!-- index column -->
        <el-table-column label="列表" width="100" align="center" type="index" fixed>
        </el-table-column>
        <el-table-column prop="name" label="权限名称" width="300" >
        </el-table-column>
        <el-table-column prop="email" label="路径" width="300" >
        </el-table-column>
        <el-table-column prop="email" label="权限等级" width="300" fixed="right">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Rights",
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      phone: "15647823020",
      email: "test@qq.com",
      roles: "admin",
    };
    return {
      tableData: Array(20).fill(item),
      value: true,
    };
  },
  methods: {},
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
