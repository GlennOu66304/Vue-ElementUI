<template>
  <div class="user">
    <!-- path section -->

    <!--S: Mian bao xie Component -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- table content -->
    <el-card>
      <!-- search section -->

      <!-- 1.search section -->
      <!-- 1.1 search input -->

      <!-- S: When you click the search or hit the eneter, it will call the api and render the data below -->

      <el-row :gutter="20">
        <el-col :span="8">
          <!-- ue+element-ui 回车键搜索功能
          ```
           @keyup.enter.native="loadData"
          ```
          https://blog.csdn.net/ke_sin/article/details/109741447
           -->
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            :clearable="clearable"
            @keyup.enter.native="loadData"
          >
            <!-- 1.2 search icon -->
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="loadData"
            ></el-button>
          </el-input>
        </el-col>

        <!-- 1.3 add new user : Modal icon effect use-->
        <!-- S:1. Modal Compoenent use 2. call the api request-->
        <el-col :span="4">
          <!-- Form -->
          <el-button type="primary" @click="dialogAddUserVisible = true"
            >添加用户</el-button
          >
          <!-- AddUser dialog section -->
          <el-dialog title="添加用户" :visible.sync="dialogAddUserVisible">
            <el-form
              :model="addUser_form"
              :rules="addUser_rules"
              ref="addUserFormRef"
            >
              <!-- username -->
              <el-form-item
                label="用户名"
                :label-width="formLabelWidth"
                prop="username"
              >
                <el-input
                  v-model="addUser_form.username"
                  autocomplete="off"
                ></el-input>
              </el-form-item>

              <!-- password -->
              <el-form-item
                label="密码"
                :label-width="formLabelWidth"
                prop="password"
              >
                <el-input
                  v-model="addUser_form.password"
                  type="text"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <!-- email -->
              <el-form-item
                label="邮箱"
                :label-width="formLabelWidth"
                prop="email"
              >
                <el-input
                  v-model="addUser_form.email"
                  type="email"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <!-- mobile -->
              <el-form-item
                label="手机"
                :label-width="formLabelWidth"
                prop="mobile"
              >
                <el-input
                  v-model="addUser_form.mobile"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>

            <!-- footer -->
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addUserSubmit">确 定</el-button>
            </div>
          </el-dialog>

          <!-- EditUser dialog section -->
          <el-dialog title="编辑用户" :visible.sync="dialogEditUserVisible">
            <el-form
              :model="addUser_form"
              :rules="addUser_rules"
              ref="editUserFormRef"
            >
              <!-- username -->
              <el-form-item
                label="用户名"
                :label-width="formLabelWidth"
                prop="username"
              >
                <el-input
                  v-model="addUser_form.username"
                  autocomplete="off"
                  disabled
                ></el-input>
              </el-form-item>

              <!-- email -->
              <el-form-item
                label="邮箱"
                :label-width="formLabelWidth"
                prop="email"
              >
                <el-input
                  v-model="addUser_form.email"
                  type="email"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <!-- mobile -->
              <el-form-item
                label="手机"
                :label-width="formLabelWidth"
                prop="mobile"
              >
                <el-input
                  v-model="addUser_form.mobile"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>

            <!-- footer -->
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogEditUserVisible = false"
                >取 消</el-button
              >
              <el-button type="primary" @click="editUserSubmit"
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </el-col>
      </el-row>

      <!-- 2.data display -->
      <el-row>
        <!-- S:When the page come in, then load the data from  -->
        <el-table :data="userList" border>
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
            prop="username"
            label="姓名"
            width="140"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="120" align="center">
          </el-table-column>
          <el-table-column prop="mobile" label="电话" align="center">
          </el-table-column>
          <el-table-column
            prop="role_name"
            label="角色"
            width="120"
            align="center"
          >
          </el-table-column>
          <!-- data switch status -->
          <el-table-column
            prop="mg_state"
            label="状态"
            width="120"
            align="center"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="statusChange(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <!-- 2.3 data edit, delete, assign the perssion :Modal Pop up-->
          <el-table-column
            prop="address"
            label="操作"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <!-- edit button -->
              <el-button
                size="mini"
                type="primary"
                @click="getUserById(scope.row.id)"
                ><i class="el-icon-edit"></i
              ></el-button>

              <!-- delete button -->
              <el-button
                size="mini"
                type="danger"
                @click="deleteUserById(scope.row.id)"
                ><i class="el-icon-delete"></i
              ></el-button>

              <!-- rights add button -->
              <el-button
                size="mini"
                type="warning"
                @click="handleDelete(scope.$index, scope.row)"
              >
                <i class="el-icon-setting"></i
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
  name: "Users",
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 8,
      },
      userList: [],
      currentPage4: 4,
      total: "",
      pagenum: "",
      dialogAddUserVisible: false, // for the user add
      dialogEditUserVisible: false, // for the user Edit
      clearable: true,
      addUser_form: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      formLabelWidth: "120px",
      addUser_rules: {
        username: [
          // rules not filled the content
          { required: true, message: "用户名必填", trigger: "blur" },
          // rule filled the content
          {
            min: 3,
            max: 6,
            message: "用户名长度要在3到6个字符",
            trigger: "blur",
          },
        ],
        password: [
          // rules not filled the content
          { required: true, message: "用户密码必填", trigger: "blur" },
          // rule filled the content
          {
            min: 3,
            max: 6,
            message: "用户密码长度要在3到6个字符",
            trigger: "blur",
          },
        ],
        email: [
          // rules not filled the content
          { required: true, message: "邮箱必填", trigger: "blur" },
          // rule filled the content
        ],
        mobile: [
          // rules not filled the content
          { required: true, message: "手机号必填", trigger: "blur" },
          // rule filled the content
        ],
      },
    };
  },
  created() {
    // load the table data first
    this.loadData();
  },

  methods: {
    // Load the data

    async loadData() {
      await this.$axios
        .get("/api/users", { params: this.queryInfo })
        .then((res) => {
          // console.log(res.data);
          this.userList = res.data.data.users;
        });
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    // Status Change
    async statusChange(userInfo) {
      // console.log(userInfo);

      await this.$axios
        .put(`/api/users/${userInfo.id}/state/${userInfo.mg_state}`)
        .then(() => {
          // console.log(res.data);
          this.$message.success("修改状态成功");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "修改状态失败",
          });
        });
    },
    addUserSubmit() {
      this.$refs.addUserFormRef.validate(async (valid) => {
        // test the submited value
        // const result = this.loginForm;
        // console.log(result);
        if (!valid) return;

        // desctructure content
        const res = await this.$axios.post("/api/users", this.addUser_form);

        // console.log(res.data.meta.status);

        // login failed

        if (res.data.meta.status != 201) {
          // console.log("login failed");
          this.$message.error("用户添加失败");
          return;
        }
        // login success
        // console.log("login success");
        this.$message({
          message: "用户添加成功",
          type: "success",
        });
        this.dialogFormVisible = false;
        this.loadData();
      });
    },
    async getUserById(id) {
      this.dialogEditUserVisible = true;
      const res = await this.$axios.get(`/api/users/${id}`);
      // console.log(res.data.data);
      this.addUser_form = res.data.data;
    },
    editUserSubmit() {
      // then call the update data api
      this.$refs.editUserFormRef.validate(async (valid) => {
        if (!valid) return;

        const res = await this.$axios.put(
          `/api/users/${this.addUser_form.id}`,
          this.addUser_form
        );
        // console.log(res.data.data);
        this.addUser_form = res.data.data;
       

        // login failed

        if (res.data.meta.status != 200) {
          // console.log("login failed");
          this.$message.error("更新用户失败");
          return;
        }
        // login success
        // console.log("login success");
        this.$message({
          message: "更新用户成功",
          type: "success",
        });
        this.dialogEditUserVisible = false;
        this.loadData();
      });
    },
    async deleteUserById(id) {
      await this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning", // text color in the middle
      })
        .then(async () => {
          await this.$axios.delete(`/api/users/${id}`).then((res) => {
            //  console.log(res.data.meta)
            if (res.data.meta.status != 200) {
              this.$message.error("删除失败");
            }
            // When you finish the delete, then
            //1.Reset the search field
            // 2.load the data again(query info is zero)
            this.queryInfo.query = "";
            this.loadData();
            this.$message({
              type: "success",
              message: "删除成功!",
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
.el-button {
  margin-right: 10px;
}
</style>
