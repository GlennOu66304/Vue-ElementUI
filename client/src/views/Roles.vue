<template>
  <div class="roles">
    <!-- path section -->

    <!--S: Mian bao xie Component -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- table content -->
    <el-card>
      <!-- search section -->

      <!-- 1.search section -->
      <!-- 1.1 search input -->

      <!-- S: When you click the search or hit the eneter, it will call the api and render the data below -->

      <el-row :gutter="20">
        <!-- 1.3 add new user : Modal icon effect use-->
        <!-- S:1. Modal Compoenent use 2. call the api request-->
        <el-col :span="4">
          <el-button type="primary">添加角色</el-button></el-col
        >
      </el-row>

      <el-row>
        <!-- 2.data display -->
        <!-- S:When the page come in, then load the data from  -->
        <el-table :data="rolestList" border stripe>
          <!-- 2.2 data row -->
          <!-- 2.1 column name first row -->
          <!-- expan column -->

          <el-table-column label="展开" align="center" type="expand" fixed>
            <template slot-scope="scope">
              <!-- <pre> {{ scope.row.children }} </pre> -->
              <el-row v-for="(item1, index) in scope.row.children" :key="index">
                <!-- 1.2three columns(level1, level2, level3) -->
                <!-- 1.3 leve1 has a tag and close icon, the right arrow,blue color

1.4 leve2 has a tag and close icon, the right arrow,green color

1.5 leve3 has a tag and close icon, gray color

1.6 the close icon is clickble, it will pop up the mssage box to confirm  -->
                <!-- level 1 -->
                <el-col :span="5">
                  <el-tag>
                    {{ item1.authName }}
                  </el-tag>
                </el-col>

                <el-col :span="19">
                  <el-row
                    :class="[
                      'expand-bottom-line',
                      index === 0 ? 'expand-top-line' : '',
                    ]"
                    v-for="(item2, index) in item1.children"
                    :key="index"
                  >
                    <!-- level2 -->
                    <el-col :span="6">
                      <el-tag type="success"> {{ item2.authName }} </el-tag
                      ><i class="el-icon-caret-right"></i
                    ></el-col>

                    <!-- level3 -->
                    <el-col :span="18">
                      <el-tag
                        v-for="(item3, index) in item2.children"
                        :key="index"
                        type="warning"
                        closable
                        :disable-transitions="disabletransitions"
                        @close="removeLevel3ById(scope.row, item3.id)"
                        >{{ item3.authName }}
                      </el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <!-- index column -->
          <el-table-column label="列表" align="center" type="index">
          </el-table-column>
          <el-table-column prop="roleName" label="角色名称" align="center">
          </el-table-column>
          <el-table-column
            prop="roleDesc"
            label="角色描述"
            width="190"
            align="center"
          >
          </el-table-column>

          <!-- 2.3 data edit, delete, assign the perssion :Modal Pop up-->
          <el-table-column label="操作" align="center" fixed="right">
            <template slot-scope="scope">
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
                @click="dialogAssignRoleOpen(scope.row)"
              >
                <i class="el-icon-setting">分配权限</i></el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-row>

      <!-- assign right dialog section -->
      <el-dialog
        title="分配权限"
        :visible.sync="dialogAssignRoleVisible"
        @close="setRightDialog"
      >
        <el-tree
          :data="treeData"
          show-checkbox
          default-expand-all
          :default-checked-keys="dfkeys"
          node-key="id"
          ref="tree"
          highlight-current
          :props="treeProps"
        >
        </el-tree>

        <!-- footer -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetChecked">清空</el-button>
          <el-button @click="dialogAssignRoleVisible = false">取 消</el-button>
          <el-button type="primary" @click="assignRight">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Roles",
  data() {
    return {
      value: true,
      rolestList: [],
      disabletransitions: true,
      dialogAssignRoleVisible: false,
      treeData: [],

      treeProps: {
        children: "children",
        label: "authName",
      },
      dfkeys: [],
      roleId: "",
    };
  },
  created() {
    // load the table data first
    this.loadRoletData();
    this.loadRightTreeData();
  },

  methods: {
    async loadRoletData() {
      await this.$axios.get("/api/roles").then((res) => {
        // console.log(res.data);
        this.rolestList = res.data.data;

        // console.log(this.rightList);
      });
    },

    async removeLevel3ById(role, rightId) {
      // console.log(role)
      await this.$confirm("此操作将永久删除该标签, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning", // text color in the middle
      })
        .then(async () => {
          await this.$axios
            .delete(`/api/roles/${role.id}/rights/${rightId}`)
            .then((res) => {
              // console.log(res.data.meta);
              if (res.data.meta.status != 200) {
                this.$message.error("删除权限失败");
              }
              // When you finish the delete, then

              this.loadRoletData();
              this.$message({
                type: "success",
                message: "删除权限成功!",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    async assignRight() {
      // IT is an array
      const keys = [
        ...this.$refs.tree.getCheckedKeys(),
        ...this.$refs.tree.getHalfCheckedKeys(),
      ];

      const rightId = keys.join(",");
      console.log(rightId);
      await this.$confirm("此操作将增加权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning", // text color in the middle
      })
        .then(async () => {
          await this.$axios
            .post(`/api/roles/${this.roleId}/rights`, { rids: rightId })
            .then((res) => {
              // console.log(res.data.meta);
              if (res.data.meta.status != 200) {
                this.$message.error("增加权限失败");
              }
              // When you finish the delete, then

              this.loadRoletData();
              this.$message({
                type: "success",
                message: "增加权限成功!",
              });
            });
          this.dialogAssignRoleVisible = false;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消权限添加",
          });
        });
    },

    async loadRightTreeData() {
      await this.$axios.get("/api/rights/tree").then((res) => {
        // console.log(res.data);
        this.treeData = res.data.data;

        // console.log(this.rightList);
      });
    },

    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },

    dialogAssignRoleOpen(role) {
      // console.log(role);
      // load the table data first
      this.roleId = role.id;
      this.defaultRightsload(role, this.dfkeys);
      this.dialogAssignRoleVisible = true;
    },
    defaultRightsload(node, arr) {
      if (!node.children) {
        return arr.push(node.id);
      }

      node.children.forEach((item) => this.defaultRightsload(item, arr));
      this.dfkeys = arr;
      // console.log(this.dfkeys)
    },
    setRightDialog() {
      this.dfkeys = [];
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
.el-tag {
  margin: 7px;
}
.expand-top-line {
  border-top: 1px solid #eee;
}
.expand-bottom-line {
  border-top: 1px solid #eee;
}
</style>
