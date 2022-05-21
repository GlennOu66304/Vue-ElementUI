<template>
  <div class="goods">
    <!-- path section -->

    <!--S: Mian bao xie Component -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- table content -->
    <el-card>
      <!-- search section -->

      <!-- 1.search section -->
      <!-- 1.1 search input -->

      <!-- S: When you click the search or hit the eneter, it will call the api and render the data below -->

      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            :clearable="clearable"
            @keyup.enter.native="loadGoodsData"
          >
            <!-- 1.2 search icon -->
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>

        <!-- 1.3 add new user : Modal icon effect use-->
        <!-- S:1. Modal Compoenent use 2. call the api request-->
        <el-col :span="4">
          <el-button type="primary" @click="goAddGood"
            >添加商品</el-button
          ></el-col
        >
      </el-row>

      <el-row>
        <!-- 2.data display -->
        <!-- S:When the page come in, then load the data from  -->
        <el-table :data="goodsList" border>
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
          <el-table-column prop="goods_name" label="商品名称" width="300">
          </el-table-column>
          <el-table-column
            prop="goods_price"
            label="价格"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="goods_weight"
            label="商品重量"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="add_time"
            label="创建时间"
            width="120"
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
          </el-table-column>
        </el-table>
      </el-row>
      <!-- 2.4 pagination section:total page, page size, current page, go to the target page -->
      <el-row>
        <el-pagination
          @size-change="handlePageSizeChange"
          @current-change="handleCurrentPagenumChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[1, 2, 15, 20]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalGoods"
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
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      clearable: true,
      goodsList: [],
      value: true,
      totalGoods: 0,
    };
  },
  created() {
    // load the table data first
    this.loadGoodsData();
  },

  methods: {
    goAddGood() {
      this.$router.push("/goods/add");
    },
    async loadGoodsData() {
      await this.$axios
        .get("/api/goods", { params: this.queryInfo })
        .then((res) => {
          // console.log(res.data);
          this.goodsList = res.data.data.goods;
          this.totalGoods = res.data.data.total;
          // console.log(this.totalUsers);
        });
    },
    handlePageSizeChange(pagesize) {
      // console.log(`每页 ${pagesize} 条`);
      // when you change the size, first let the pagenum reset to 1
      this.queryInfo.pagenum = 1;
      this.queryInfo.pagesize = pagesize;
      this.loadGoodsData();
    },
    handleCurrentPagenumChange(pagenum) {
      // console.log(`当前页: ${pagenum}`);
      this.queryInfo.pagenum = pagenum;
      this.loadGoodsData();
    },
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
