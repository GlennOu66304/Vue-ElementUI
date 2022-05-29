<template>
  <div class="report">
    <!-- path section -->

    <!--S: Mian bao xie Component -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- charts area -->
    <el-card>
     <span>用户来源</span>
      <div id="main" style="width:600px;height:300px"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Reports",
  components: {},

  data() {
    return {
     

      value: "",
    };
  },

  // created: {
  //   // load the table data first
  // },
  async mounted() {
    // initialize the echarts instance
    var myChart = echarts.init(document.getElementById("main"));
    // Draw the chart

    await this.$axios
      .get("api/reports/type/1")
      .then((res) => {
        myChart.setOption(res.data.data);
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "获取折线图失败",
        });
      });
  },

  methods: {
    //  indexMethod(index) {
    //     return index * 2;
    //   }
  }
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