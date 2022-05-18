<template>
  <div class="params">
    <!-- path section -->

    <!--S: Mian bao xie Component -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- table content -->
    <el-card>
      <!-- Select option -->
      <el-row :gutter="20">
        <span>选择商品分类:</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-row>

      <el-row>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="动态参数" name="first"
            ><el-button type="primary"> 添加参数 </el-button></el-tab-pane
          >
          <el-tab-pane label="静态属性" name="second"
            ><el-button type="primary"> 添加属性</el-button></el-tab-pane
          >
        </el-tabs>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Params",
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

      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
    };
  },
  created: {
    // load the table data first
  },

  methods: {
    //  indexMethod(index) {
    //     return index * 2;
    //   }
    handleClick(tab, event) {
      console.log(tab, event);
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
