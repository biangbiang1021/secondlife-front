<template>
  <div class="user-list">
    <!-- 搜索区域 -->
    <el-card>
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="用户名">
          <el-input v-model="searchForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="searchForm.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态">
            <el-option label="全部" value="" />
            <el-option label="活跃" value="active" />
            <el-option label="非活跃" value="inactive" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 用户列表 -->
    <el-card>
      <div slot="header">
        <span>用户列表</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="handleAdd">
          添加用户
        </el-button>
      </div>
      
      <el-table
        v-loading="loading"
        :data="userList"
        style="width: 100%"
      >
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column label="头像" width="80">
          <template slot-scope="scope">
            <el-avatar :size="40" :src="scope.row.avatar" />
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 'active' ? 'success' : 'info'">
              {{ scope.row.status === 'active' ? '活跃' : '非活跃' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="注册时间" width="160" />
        <el-table-column prop="lastLoginTime" label="最后登录" width="160" />
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          :current-page="pagination.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pagination.pageSize"
          :total="totalUsers"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 编辑用户对话框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="500px"
    >
      <el-form
        ref="userForm"
        :model="userForm"
        :rules="userRules"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="userForm.status" placeholder="请选择状态">
            <el-option label="活跃" value="active" />
            <el-option label="非活跃" value="inactive" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'UserList',
  data() {
    return {
      searchForm: {
        username: '',
        email: '',
        status: ''
      },
      pagination: {
        page: 1,
        pageSize: 10
      },
      dialogVisible: false,
      dialogTitle: '添加用户',
      userForm: {
        username: '',
        email: '',
        status: 'active'
      },
      userRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapState('user', ['userList', 'totalUsers', 'loading'])
  },
  mounted() {
    this.loadUserList()
  },
  methods: {
    ...mapActions('user', ['getUserList', 'deleteUser']),

    async loadUserList() {
      const params = {
        ...this.searchForm,
        ...this.pagination
      }
      await this.getUserList(params)
    },

    handleSearch() {
      this.pagination.page = 1
      this.loadUserList()
    },

    handleReset() {
      this.searchForm = {
        username: '',
        email: '',
        status: ''
      }
      this.pagination.page = 1
      this.loadUserList()
    },

    handleSizeChange(size) {
      this.pagination.pageSize = size
      this.loadUserList()
    },

    handleCurrentChange(page) {
      this.pagination.page = page
      this.loadUserList()
    },

    handleAdd() {
      this.dialogTitle = '添加用户'
      this.userForm = {
        username: '',
        email: '',
        status: 'active'
      }
      this.dialogVisible = true
    },

    handleEdit(row) {
      this.dialogTitle = '编辑用户'
      this.userForm = { ...row }
      this.dialogVisible = true
    },

    async handleDelete(row) {
      try {
        await this.$confirm('确定要删除该用户吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        
        await this.deleteUser(row.id)
        this.$message.success('删除成功')
        this.loadUserList()
      } catch (error) {
        if (error !== 'cancel') {
          this.$message.error('删除失败')
        }
      }
    },

    handleSubmit() {
      this.$refs.userForm.validate(async (valid) => {
        if (valid) {
          this.$message.success('保存成功')
          this.dialogVisible = false
          this.loadUserList()
        }
      })
    }
  }
}
</script>

<style scoped>
.search-form .el-form-item {
  margin-bottom: 15px;
}

.pagination-container {
  text-align: center;
  margin-top: 20px;
}
</style> 