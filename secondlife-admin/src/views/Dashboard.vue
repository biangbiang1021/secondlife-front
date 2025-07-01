<template>
  <div class="dashboard">
    <!-- 统计卡片 -->
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="stats-card">
          <div class="stats-content">
            <div class="stats-icon users">
              <i class="el-icon-user"></i>
            </div>
            <div class="stats-info">
              <div class="stats-number">{{ stats.totalUsers }}</div>
              <div class="stats-label">总用户数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stats-card">
          <div class="stats-content">
            <div class="stats-icon posts">
              <i class="el-icon-chat-dot-round"></i>
            </div>
            <div class="stats-info">
              <div class="stats-number">{{ stats.totalPosts }}</div>
              <div class="stats-label">总帖子数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stats-card">
          <div class="stats-content">
            <div class="stats-icon products">
              <i class="el-icon-shopping-cart-full"></i>
            </div>
            <div class="stats-info">
              <div class="stats-number">{{ stats.totalProducts }}</div>
              <div class="stats-label">总商品数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stats-card">
          <div class="stats-content">
            <div class="stats-icon views">
              <i class="el-icon-view"></i>
            </div>
            <div class="stats-info">
              <div class="stats-number">{{ stats.totalViews }}</div>
              <div class="stats-label">总浏览量</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表区域 -->
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="12">
        <el-card>
          <div slot="header">
            <span>用户增长趋势</span>
          </div>
          <div ref="userChart" style="height: 300px;"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div slot="header">
            <span>内容分布</span>
          </div>
          <div ref="contentChart" style="height: 300px;"></div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 最新动态 -->
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="12">
        <el-card>
          <div slot="header">
            <span>最新用户</span>
          </div>
          <el-table :data="latestUsers" style="width: 100%">
            <el-table-column prop="username" label="用户名" />
            <el-table-column prop="createTime" label="注册时间" />
            <el-table-column prop="status" label="状态">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status === 'active' ? 'success' : 'info'">
                  {{ scope.row.status === 'active' ? '活跃' : '非活跃' }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div slot="header">
            <span>最新帖子</span>
          </div>
          <el-table :data="latestPosts" style="width: 100%">
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="author" label="作者" />
            <el-table-column prop="createTime" label="发布时间" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'Dashboard',
  data() {
    return {
      stats: {
        totalUsers: 1250,
        totalPosts: 890,
        totalProducts: 456,
        totalViews: 15680
      },
      latestUsers: [
        { username: 'user001', createTime: '2024-01-15 10:30:00', status: 'active' },
        { username: 'user002', createTime: '2024-01-15 09:15:00', status: 'active' },
        { username: 'user003', createTime: '2024-01-15 08:45:00', status: 'inactive' }
      ],
      latestPosts: [
        { title: 'iPhone 14 Pro Max 使用体验', author: 'user001', createTime: '2024-01-15 10:30:00' },
        { title: '华为Mate 60 Pro 值得购买吗？', author: 'user002', createTime: '2024-01-15 09:15:00' },
        { title: '小米14 Ultra 拍照效果分享', author: 'user003', createTime: '2024-01-15 08:45:00' }
      ],
      userChart: null,
      contentChart: null
    }
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    initCharts() {
      // 用户增长趋势图
      this.userChart = echarts.init(this.$refs.userChart)
      this.userChart.setOption({
        tooltip: { trigger: 'axis' },
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: { type: 'value' },
        series: [{
          data: [120, 200, 150, 80, 70, 110],
          type: 'line',
          smooth: true
        }]
      })

      // 内容分布饼图
      this.contentChart = echarts.init(this.$refs.contentChart)
      this.contentChart.setOption({
        tooltip: { trigger: 'item' },
        series: [{
          type: 'pie',
          radius: '50%',
          data: [
            { value: 150, name: 'iPhone' },
            { value: 120, name: '华为' },
            { value: 80, name: '小米' },
            { value: 60, name: 'OPPO' },
            { value: 50, name: 'vivo' }
          ]
        }]
      })
    }
  },
  beforeDestroy() {
    if (this.userChart) {
      this.userChart.dispose()
    }
    if (this.contentChart) {
      this.contentChart.dispose()
    }
  }
}
</script>

<style scoped>
.stats-card {
  .stats-content {
    display: flex;
    align-items: center;
  }

  .stats-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    font-size: 24px;
    color: #fff;

    &.users { background-color: #409eff; }
    &.posts { background-color: #67c23a; }
    &.products { background-color: #e6a23c; }
    &.views { background-color: #f56c6c; }
  }

  .stats-info {
    flex: 1;
  }

  .stats-number {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }

  .stats-label {
    color: #666;
    margin-top: 5px;
  }
}
</style> 