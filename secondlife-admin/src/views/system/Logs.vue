<template>
  <div class="system-logs">
    <el-card>
      <div slot="header">
        <span>系统日志</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="handleRefresh">
          刷新
        </el-button>
      </div>
      
      <el-table :data="systemLogs" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="level" label="级别" width="100">
          <template slot-scope="scope">
            <el-tag :type="getLevelType(scope.row.level)">
              {{ getLevelText(scope.row.level) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="message" label="消息" min-width="300" />
        <el-table-column prop="user" label="用户" width="120" />
        <el-table-column prop="timestamp" label="时间" width="160" />
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'SystemLogs',
  computed: {
    ...mapState('system', ['systemLogs'])
  },
  mounted() {
    this.loadLogs()
  },
  methods: {
    ...mapActions('system', ['getSystemLogs']),

    async loadLogs() {
      await this.getSystemLogs()
    },

    handleRefresh() {
      this.loadLogs()
    },

    getLevelType(level) {
      const types = {
        info: 'info',
        warning: 'warning',
        error: 'danger'
      }
      return types[level] || 'info'
    },

    getLevelText(level) {
      const texts = {
        info: '信息',
        warning: '警告',
        error: '错误'
      }
      return texts[level] || level
    }
  }
}
</script> 