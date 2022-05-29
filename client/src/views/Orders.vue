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
        <el-table :data="ordersData" border>
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
          <el-table-column prop="order_number" label="订单编号" align="center">
          </el-table-column>
          <el-table-column prop="order_price" label="订单价格" align="center">
          </el-table-column>
          <el-table-column prop="pay_status" label="是否支付" align="center">
            <template slot-scope="scope">
              <el-tag
                type="danger"
                v-if="scope.row.pay_status === `0`"
                size="mini"
                >未支付</el-tag
              >
              <el-tag type="success" v-else size="mini">支付</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="is_send" label="是否发货" align="center">
          </el-table-column>
          <el-table-column prop="create_time" label="下单时间" align="center">
            <template slot-scope="scope">
              {{ scope.row.create_time | dateFormats }}
            </template>
          </el-table-column>

          <el-table-column
            prop="address"
            label="操作"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <!-- edit button -->
              <el-button size="mini" type="primary"
                ><i class="el-icon-edit"></i
              ></el-button>

              <!-- delete button -->
              <el-button
                size="mini"
                type="success"
                @click="loadLogisticData(scope.row.id)"
                ><i class="el-icon-location"></i
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <!-- 2.4 pagination section:total page, page size, current page, go to the target page -->

      <el-row>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[1, 2, 15, 20]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalGoods"
        >
        </el-pagination>
      </el-row>
      <!-- AddUser dialog section -->
      <el-dialog title="物流信息" :visible.sync="dialogLogisticVisible">
        <el-timeline :reverse="reverse">
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.time"
          >
            {{ activity.context }}
          </el-timeline-item>
        </el-timeline>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Orders",
  components: {},

  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      ordersData: [],
      value: true,
      currentPage4: 4,
      totalGoods: 0,
      dialogLogisticVisible: false,
      reverse: true,
      activities: [
        {
          content: "活动按期开始",
          timestamp: "2018-04-15",
        },
        {
          content: "通过审核",
          timestamp: "2018-04-13",
        },
        {
          content: "创建成功",
          timestamp: "2018-04-11",
        },
      ],
    };
  },

  created() {
    // load the table data first
    this.loadOrdersData();
  },

  methods: {
    //  indexMethod(index) {
    //     return index * 2;
    //   }
    async loadOrdersData() {
      await this.$axios
        .get("/api/orders", { params: this.queryInfo })
        .then((res) => {
          // console.log(res.data);
          this.ordersData = res.data.data.goods;
          this.totalGoods = res.data.data.total;
          // console.log(this.totalUsers);
        });
    },
    handleSizeChange(pagesize) {
      this.queryInfo.pagenum = 1;
      this.queryInfo.pagesize = pagesize;
      this.loadOrdersData();
    },
    handleCurrentChange(pagenum) {
      this.queryInfo.pagenum = pagenum;
      this.loadOrdersData();
    },
     async loadLogisticData() {
       this.dialogLogisticVisible = true
      await this.$axios
        .get('/api/kuaidi/1106975712662')
        .then((res) => {
          // console.log(res.data);
          this.activities = res.data.data;
        
          // console.log(this.totalUsers);
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