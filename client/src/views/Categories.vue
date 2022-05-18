<template>
  <div class="goods">
    <!-- path section -->

    <!--S: Mian bao xie Component -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- table content -->
    <el-card>
      <!-- search section -->

      <!-- 1.search section -->
      <!-- 1.1 search input -->

      <!-- S: When you click the search or hit the eneter, it will call the api and render the data below -->

      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <!-- 1.2 search icon -->
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>

        <!-- 1.3 add new user : Modal icon effect use-->
        <!-- S:1. Modal Compoenent use 2. call the api request-->
        <el-col :span="4">
          <el-button type="primary">添加分类</el-button></el-col
        >
      </el-row>

      <el-row>
        <!-- 2.data display -->
        <!-- S:When the page come in, then load the data from  -->
        <el-table :data="tableData" border>
          <!-- 2.2 data row -->
          <!-- 2.1 column name first row -->
          <!-- index column -->
          <el-table-column
            label="列表"
            width="140"
            align="center"
            type="index"
            fixed
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="分类名称"
            width="300"
           
          >
          </el-table-column>
          <el-table-column prop="email" label="价格" width="120" align="center">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="是否有效"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="排序"
            width="120"
            align="center"
          >
          </el-table-column>

          <!-- 2.3 data edit, delete, assign the perssion :Modal Pop up-->
          <el-table-column
            prop="address"
            label="操作"
            align="center"
            fixed="right"
          >
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
          </el-table-column>
        </el-table>
      </el-row>
      <!-- 2.4 pagination section:total page, page size, current page, go to the target page -->
    <el-row>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </el-row>
    
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Goods",
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
  created: {
    // load the table data first
  },

  methods: {
    //  indexMethod(index) {
    //     return index * 2;
    //   }
  },
  components: {},
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
