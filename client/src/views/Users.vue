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
              <el-button @click="dialogAddUserVisible = false">取 消</el-button>
              <el-button type="primary" @click="addUserSubmit">确 定</el-button>
            </div>
          </el-dialog>

          <!-- EditUser dialog section -->
          <el-dialog title="编辑用户" :visible.sync="dialogEditUserVisible">
            <el-form
              :model="editUser_form"
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
                  v-model="editUser_form.username"
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
                  v-model="editUser_form.email"
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
                  v-model="editUser_form.mobile"
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

          <!-- Assign a new roles -->
          <el-dialog title="分配新角色" :visible.sync="dialogEditRoleVisible">
            <!-- data area -->
            <el-row>
              <span>当前的用户：{{ roleInfo.username }}</span>
            </el-row>

            <el-row>
              <span>当前的角色：{{ roleInfo.role_name }}</span>
            </el-row>
            <!-- select Box -->
            <el-select v-model="selectedRoleValue" placeholder="请选择">
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.roleName"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <!-- footer -->
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogEditRoleVisible = false"
                >取 消</el-button
              >
              <el-button type="primary" @click="editRoleSubmit"
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </el-col>
      </el-row>

      <!-- 2.data display -->
      <el-row>
        <!-- S:When the page come in, then load the data from  -->
        <el-table :data="userList" border stripe>
          <!-- 2.2 data row -->
          <!-- 2.1 column name first row -->
          <!-- index column -->
          <el-table-column label="列表" align="center" type="index" fixed>
          </el-table-column>

          <el-table-column prop="username" label="姓名" align="center">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" align="center">
          </el-table-column>
          <el-table-column prop="mobile" label="电话" align="center">
          </el-table-column>
          <el-table-column prop="role_name" label="角色" align="center">
          </el-table-column>
          <!-- data switch status -->
          <el-table-column prop="mg_state" label="状态" align="center">
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
            width="190"
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
                @click="getRoleById(scope.row)"
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
          @size-change="handlePageSizeChange"
          @current-change="handleCurrentPagenumChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[1, 2, 15, 20]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalUsers"
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
        pagesize: 2,
      },
      userList: [],
      currentPage: 1,
      totalUsers: 0,
      dialogAddUserVisible: false, // for the user add
      dialogEditUserVisible: false, // for the user Edit
      dialogEditRoleVisible: false, // for the user Edit
      clearable: true,
      addUser_form: {
        username: "",
        password: "",
        email: "",
        mobile: "",
        role_name: "",
      },

 editUser_form: {
        username: "",
        password: "",
        email: "",
        mobile: "",
        role_name: "",
      },
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
      roleList: [],
      roleInfo: {},
      formLabelWidth: "130px",
      selectedRoleValue: "",
    };
  },
  created() {
    // load the table data first
    this.loadData();
    this.loadRoleData();
  },

  methods: {
    // Load the data

    async loadData() {
      await this.$axios
        .get("/api/users", { params: this.queryInfo })
        .then((res) => {
          // console.log(res.data);
          this.userList = res.data.data.users;
          this.totalUsers = res.data.data.total;
          // console.log(this.totalUsers);
        });
    },
    // load the role List data

    async loadRoleData() {
      await this.$axios.get("/api/roles").then((res) => {
        // console.log(res.data);
        this.roleList = res.data.data;

        // console.log(this.roleList);
      });
    },

    handlePageSizeChange(pagesize) {
      // console.log(`每页 ${pagesize} 条`);
      // when you change the size, first let the pagenum reset to 1
      this.queryInfo.pagenum = 1;
      this.queryInfo.pagesize = pagesize;
      this.loadData();
    },
    handleCurrentPagenumChange(pagenum) {
      // console.log(`当前页: ${pagenum}`);
      this.queryInfo.pagenum = pagenum;
      this.loadData();
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
        this.dialogAddUserVisible = false;
        this.queryInfo.query = "";
        this.loadData();
      });
    },
    async getUserById(id) {
      this.dialogEditUserVisible = true;
      const res = await this.$axios.get(`/api/users/${id}`);
      // console.log(res.data.data);
      this.editUser_form = res.data.data;
    },
    editUserSubmit() {
      // then call the update data api
      this.$refs.editUserFormRef.validate(async (valid) => {
        if (!valid) return;

        const res = await this.$axios.put(
          `/api/users/${this.addUser_form.id}`,
          this.editUser_form
        );
        // console.log(res.data.data);
        this.editUser_form = res.data.data;



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
        this.queryInfo.query = "";
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
    async getRoleById(roleInfo) {
      this.dialogEditRoleVisible = true;
      // console.log(roleInfo);
      this.roleInfo = roleInfo;
      // const res = await this.$axios.get(`/api/users/${id}`);
      // console.log(res);
      // this.roleInfo = res.data.data;
    },

    async editRoleSubmit() {
      // get the from the user info
      // get the role by select option select change event
      // is the selectRole is empty, then pop up errro
      // else then send the api request to the server
      if (!this.selectedRoleValue) {
        this.$message.error("请选择对象类型");
      }
      // console.log(this.selectedRoleValue);
      const res = await this.$axios.put(`/api/users/${this.roleInfo.id}/role`, {
        rid: this.selectedRoleValue,
      });
      if (res.data.meta.status != 200) {
        // console.log("login failed");
        this.$message.error("分配角色失败");
        return;
      }
      // login success
      // console.log("login success");
      this.$message({
        message: "分配角色成功",
        type: "success",
      });
      this.dialogEditRoleVisible = false;
      this.queryInfo.query = "";
      this.loadData();
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
