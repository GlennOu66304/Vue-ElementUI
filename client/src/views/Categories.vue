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
        <tree-table
          :data="categoryData"
          :columns="columns"
          :selection-type="false"
          :expand-type="false"
          show-index
          index-text="#"
        >
          <template slot="isOk" slot-scope="scope">
            <i
              class="el-icon-success"
              style="color:lightgreen;"
              v-if="scope.row.cat_deleted === false"
            ></i>
            <i class="el-icon-error" style="color:red;" v-else></i>
          </template>

          <template slot="order" slot-scope="scope">
            <el-tag v-if="scope.row.cat_level === 0" size="mini">一级</el-tag>
            <el-tag
              type="success"
              v-else-if="scope.row.cat_level === 1"
              size="mini"
              >二级</el-tag
            >
            <el-tag type="info" size="mini" v-else>三级</el-tag>
          </template>
          <!-- 2.3 data edit, delete, assign the perssion :Modal Pop up-->
          <template slot="opt" slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)"
              ><i class="el-icon-edit"></i
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              ><i class="el-icon-delete"></i
            ></el-button>
          </template>
        </tree-table>
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
          :total="totalCategories"
        >
        </el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Goods",
  components: {},

  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      categoryData: [],
      value: true,
      currentPage4: 4,
      totalCategories: 0,
      columns: [
        {
          prop: "cat_name",
          label: "分类名称",
        },

        { plabel: "是否有效", type: "template", template: "isOk" },

        { label: "排序", type: "template", template: "order" },
        { label: "操作流程", type: "template", template: "opt" },
      ],
    };
  },

  created() {
    // load the table data first
    this.loadCategoryData();
  },

  methods: {
    //  indexMethod(index) {
    //     return index * 2;
    //   }
    async loadCategoryData() {
      await this.$axios
        .get("/api/categories", { params: this.queryInfo })
        .then((res) => {
          // console.log(res.data);
          this.categoryData = res.data.data.result;
          // console.log(this.categoryData)
          this.totalCategories = res.data.data.total;
          // console.log(this.totalCategories);
        });
    },

    handlePageSizeChange(pagesize) {
      // console.log(`每页 ${pagesize} 条`);
      // when you change the size, first let the pagenum reset to 1
      this.queryInfo.pagenum = 1;
      this.queryInfo.pagesize = pagesize;
      this.loadCategoryData();
    },
    handleCurrentPagenumChange(pagenum) {
      // console.log(`当前页: ${pagenum}`);
      this.queryInfo.pagenum = pagenum;
      this.loadCategoryData();
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