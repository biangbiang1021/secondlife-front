<template>
  <div class="category-list">
    <el-card>
      <div slot="header">
        <span>分类管理</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="handleAdd">
          添加分类
        </el-button>
      </div>
      
      <el-table :data="categories" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="分类名称" />
        <el-table-column prop="count" label="帖子数量" width="120" />
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 编辑对话框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="400px">
      <el-form ref="categoryForm" :model="categoryForm" :rules="categoryRules" label-width="80px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="categoryForm.name" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'CategoryList',
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '添加分类',
      categoryForm: { name: '' },
      categoryRules: {
        name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState('forum', ['categories'])
  },
  mounted() {
    this.loadCategories()
  },
  methods: {
    ...mapActions('forum', ['getCategories']),

    async loadCategories() {
      await this.getCategories()
    },

    handleAdd() {
      this.dialogTitle = '添加分类'
      this.categoryForm = { name: '' }
      this.dialogVisible = true
    },

    handleEdit(row) {
      this.dialogTitle = '编辑分类'
      this.categoryForm = { ...row }
      this.dialogVisible = true
    },

    handleDelete(row) {
      this.$confirm('确定要删除该分类吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功')
        this.loadCategories()
      }).catch(() => {})
    },

    handleSubmit() {
      this.$refs.categoryForm.validate((valid) => {
        if (valid) {
          this.$message.success('保存成功')
          this.dialogVisible = false
          this.loadCategories()
        }
      })
    }
  }
}
</script> 