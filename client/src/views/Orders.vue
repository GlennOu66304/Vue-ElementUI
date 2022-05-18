<template>
  <div class="orders">
    <!-- path section -->

    <!--S: Mian bao xie Component -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
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
            label="订单编号"
            width="140"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="email"
            label="是否支付"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="phone" label="是否发货" align="center">
          </el-table-column>
          <el-table-column
            prop="roles"
            label="下单时间"
            width="120"
            align="center"
          >
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
  name: "Orders",
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
