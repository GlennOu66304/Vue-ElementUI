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
          style="height: 500px;"
        >
          <el-tab-pane label="基本信息">
            <!-- input and few selection -->

            <el-form
              :model="addGoodForm"
              ref="addGoodFormRef"
              :label-width="formLabelWidth"
              class="addGood_form"
            >
              <!-- username -->
              <el-form-item label="商品名称" prop="username">
                <!-- v-model get the model object's value -->
                <el-input
                  v-model="addGoodForm.goods_name"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <!-- password -->
              <el-form-item label="商品价格" prop="password">
                <el-input
                  type="number"
                  v-model="addGoodForm.goods_price"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="商品重量" prop="username">
                <!-- v-model get the model object's value -->
                <el-input
                  v-model="addGoodForm.goods_weight"
                  autocomplete="off"
                ></el-input>
              </el-form-item>

              <el-form-item label="商品数量" prop="password">
                <el-input
                  type="number"
                  v-model="addGoodForm.goods_number"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <!-- 商品分类 -->

              <!-- select Box -->
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select> </el-form
          ></el-tab-pane>
          <el-tab-pane label="商品参数" v-model="addGoodForm.attrs"
            >商品参数</el-tab-pane
          >
          <el-tab-pane label="商品属性">商品属性</el-tab-pane>
          <el-tab-pane label="商品图片"
            ><el-button type="primary">上传图片</el-button></el-tab-pane
          >
          <el-tab-pane label="商品内容">
            <!-- bidirectional data binding（双向数据绑定） -->
            <quill-editor
              v-model="addGoodForm.goods_introduce"
              ref="myQuillEditor"
            >
            </quill-editor>
            <el-button class="addButton" type="primary">
              添加商品
            </el-button></el-tab-pane
          >
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

      addGoodForm: {
        goods_name: "",
        goods_cat: "",
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_introduce: "",
        pics: [],
        attrs: [],
      },
      formLabelWidth: "100",
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
      editorOption: {
        // some quill options
      },
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

<style >
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

.addButton {
  margin-top: 10px;
}
.edit_container {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  
}
/* You need to remove the scope and less to let css apply to the rich text editor */
.ql-editor {
  height: 300px;
}
</style>
