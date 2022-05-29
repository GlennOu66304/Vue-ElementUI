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
        <el-col>
          <span>选择商品分类:</span>
          <!-- if the hover effect does not work, you could turn off the dev tool -->
          <el-cascader
            expand-trigger="hover"
            :options="options"
            :props="catProps"
            v-model="selectedValue"
            @change="handleChange"
          ></el-cascader>
        </el-col>
      </el-row>
      <!-- tab shift section -->
      <el-row>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!-- tbapane1 -->
          <el-tab-pane label="动态参数" name="many">
            <!-- button -->
            <el-button :disabled="isDisable" size="small" round type="primary">
              添加参数
            </el-button>

            <!-- table data -->

            <el-table :data="manyTableData" border>
              <!-- 2.2 data row -->
              <!-- 2.1 column name first row -->
              <!-- index column -->
              <el-table-column
               
                type="index"
                
              >
              </el-table-column>
              <el-table-column
                prop="attr_name"
                label="参数名称"
                
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

                <el-button
                  size="mini"
                  type="warning"
                  @click="handleDelete(scope.$index, scope.row)"
                >
                  <i class="el-icon-setting"></i
                ></el-button>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <!-- tabpane2 -->
          <el-tab-pane label="静态属性" name="only">
            <el-button :disabled="isDisable" size="small" round type="primary">
              添加属性</el-button
            >
            <!-- table data -->

            <el-table :data="onlyTableData" border>
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
                prop="attr_name"
                label="参数名称"
                width="140"
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

                <el-button
                  size="mini"
                  type="warning"
                  @click="handleDelete(scope.$index, scope.row)"
                >
                  <i class="el-icon-setting"></i
                ></el-button>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Params",
  components: {},

  data() {
    return {
      manyTableData: [],
      onlyTableData: [],
      options: [],
      selectedValue: [],
      catProps: {
        //first layer
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      activeName: "many",
    };
  },

  computed: {
    isDisable() {
      if (this.selectedValue.length === 3) {
        return false;
      }
      return true;
    },
    cat_id() {
      if (this.selectedValue.length === 3) {
        return this.selectedValue[2];
      }
      return null;
    },
  },

  // created: {
  //   // load the table data first
  // },
  created() {
    // load the table data first
    this.loadAllCategoryData();
  },

  methods: {
    // Static
    async loadAllCategoryData() {
      await this.$axios.get("/api/categories").then((res) => {
        // console.log(res.data);
        this.options = res.data.data;
        // console.log(this.options);
        // this.totalCategories = res.data.data.total;
        // console.log(this.totalCategories);
      });
    },

    async handleChange() {
      // if the output value length is less than3, then reset the value to zero
      //otherwise assign the value

      if (this.selectedValue.length !== 3) {
        this.selectedValue = [];
        return;
      }

      await this.$axios
        .get(`/api/categories/${this.cat_id}/attributes`, {
          params: { sel: this.activeName },
        })
        .then((res) => {
          // console.log(res.data);
          this.manyTableData = res.data.data;
          console.log(this.tableData);
         
        });

      // if ((this.activeName == "many")) {
      //   this.manyTableData = res.data.data;
      // } else {
      //   this.onlyTableData = res.data.data;
      // }
    },

    async handleClick() {
      // this.selectedValue = value;
      await this.$axios
        .get(`/api/categories/${this.cat_id}/attributes`, {
          params: { sel: this.activeName },
        })
        .then((res) => {
          // console.log(res.data);
          this.onlyTableData = res.data.data;
          // console.log(this.categoryData)
          // this.totalCategories = res.data.data.total;
          // console.log(this.totalCategories);
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
.el-button {
  margin-bottom: 20px;
}
</style>