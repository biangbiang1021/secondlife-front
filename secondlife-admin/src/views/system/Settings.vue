<template>
  <div class="system-settings">
    <el-card>
      <div slot="header">
        <span>系统设置</span>
      </div>
      
      <el-form
        ref="settingsForm"
        :model="settings"
        :rules="settingsRules"
        label-width="150px"
        style="max-width: 600px;"
      >
        <el-form-item label="网站名称" prop="siteName">
          <el-input v-model="settings.siteName" />
        </el-form-item>
        
        <el-form-item label="网站描述" prop="siteDescription">
          <el-input
            v-model="settings.siteDescription"
            type="textarea"
            :rows="3"
          />
        </el-form-item>
        
        <el-form-item label="允许用户注册">
          <el-switch v-model="settings.allowRegistration" />
        </el-form-item>
        
        <el-form-item label="需要邮箱验证">
          <el-switch v-model="settings.requireEmailVerification" />
        </el-form-item>
        
        <el-form-item label="最大上传大小(MB)" prop="maxUploadSize">
          <el-input-number
            v-model="settings.maxUploadSize"
            :min="1"
            :max="50"
          />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="handleSave">保存设置</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 系统信息 -->
    <el-card style="margin-top: 20px;">
      <div slot="header">
        <span>系统信息</span>
      </div>
      
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="info-item">
            <div class="info-label">系统版本</div>
            <div class="info-value">{{ systemInfo.version }}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="info-item">
            <div class="info-label">运行时间</div>
            <div class="info-value">{{ systemInfo.uptime }}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="info-item">
            <div class="info-label">内存使用</div>
            <div class="info-value">{{ systemInfo.memory }}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="info-item">
            <div class="info-label">磁盘使用</div>
            <div class="info-value">{{ systemInfo.disk }}</div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'SystemSettings',
  data() {
    return {
      settings: {
        siteName: '二手手机论坛',
        siteDescription: '专业的二手手机交易平台',
        allowRegistration: true,
        requireEmailVerification: false,
        maxUploadSize: 5
      },
      settingsRules: {
        siteName: [
          { required: true, message: '请输入网站名称', trigger: 'blur' }
        ],
        siteDescription: [
          { required: true, message: '请输入网站描述', trigger: 'blur' }
        ],
        maxUploadSize: [
          { required: true, message: '请输入最大上传大小', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState('system', ['systemInfo'])
  },
  mounted() {
    this.loadSystemInfo()
    this.loadSettings()
  },
  methods: {
    ...mapActions('system', ['getSystemInfo', 'updateSettings']),

    async loadSystemInfo() {
      await this.getSystemInfo()
    },

    async loadSettings() {
      // 这里应该从API加载设置
      // 暂时使用默认值
    },

    async handleSave() {
      this.$refs.settingsForm.validate(async (valid) => {
        if (valid) {
          try {
            await this.updateSettings(this.settings)
            this.$message.success('设置保存成功')
          } catch (error) {
            this.$message.error('保存失败：' + error.message)
          }
        }
      })
    },

    handleReset() {
      this.settings = {
        siteName: '二手手机论坛',
        siteDescription: '专业的二手手机交易平台',
        allowRegistration: true,
        requireEmailVerification: false,
        maxUploadSize: 5
      }
    }
  }
}
</script>

<style scoped>
.info-item {
  text-align: center;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.info-label {
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
}

.info-value {
  color: #333;
  font-size: 18px;
  font-weight: bold;
}
</style> 