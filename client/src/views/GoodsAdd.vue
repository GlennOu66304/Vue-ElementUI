<template>
  <div class="goodsAdd">
    <!-- path section -->

    <!--S: Mian bao xie Component -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- table content -->
    <el-card>
      <el-alert title="添加商品" type="info" center show-icon> </el-alert>
      <!-- 1.background color is gray;2.text and icon need to be in the middle -->
      <!-- process bar -->
      <el-row>
        <el-steps
          :space="200"
          align-center
          :active="activeIndex - 0"
          finish-status="success"
        >
          <el-step title="基本信息"></el-step>
          <el-step title="商品参数"></el-step>
          <el-step title="商品属性"></el-step>
          <el-step title="商品图片"></el-step>
          <el-step title="商品内容"></el-step>
          <el-step title="完成"></el-step> </el-steps
      ></el-row>

      <el-row>
        <el-tabs
          v-model="activeIndex"
          :tab-position="tabPosition"
          style="height: 300px;"
        >
          <el-tab-pane label="基本信息">基本信息</el-tab-pane>
          <el-tab-pane label="商品参数">商品参数</el-tab-pane>
          <el-tab-pane label="商品属性">商品属性</el-tab-pane>
          <el-tab-pane label="商品图片">商品图片</el-tab-pane>
          <el-tab-pane label="商品内容">商品内容</el-tab-pane>
          <el-tab-pane label="提交完成">提交完成</el-tab-pane>
        </el-tabs>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "GoodsAdd",
  data() {
    return {
      tabPosition: "left",
      activeIndex: 0,
    };
  },
  created() {
    // load the table data first
    // this.loadGoodsData();
  },

  methods: {},
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
.el-steps {
  margin-top: 10px;
}
</style>
