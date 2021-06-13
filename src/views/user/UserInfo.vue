<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>

      <el-table-column label="用户名" width="210" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="密码" width="210" align="center">
        <template slot-scope="scope">
          {{ scope.row.password }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="角色" width="210" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.role | statusFilter">{{ scope.row.role }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="备注">
        <template slot-scope="scope">
          {{ scope.row.remark }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createtime }}</span>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  name: 'UserInfo',
  filters: {
    statusFilter(status) {
      const statusMap = {
        administrator: 'success',
        user: 'gray',
        superuser: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [
        {
          username: 'admin',
          password: '123456',
          role: 'administrator',
          createtime: '2021-05-14 00:03:00',
          remark: '管理员：可查看所有功能'
        },
        {
          username: 'user01',
          password: '123456',
          role: 'user',
          createtime: '2021-05-14 00:03:00',
          remark: '用户：可查看部分功能'
        },
        {
          username: 'user02',
          password: '123456',
          role: 'user',
          createtime: '2021-05-14 00:03:00',
          remark: '用户：可查看部分功能'
        },
        {
          username: 'user03',
          password: '123456',
          role: 'user',
          createtime: '2021-05-14 00:03:00',
          remark: '用户：可查看部分功能'
        },
        {
          username: 'user04',
          password: '123456',
          role: 'user',
          createtime: '2021-05-14 00:03:00',
          remark: '用户：可查看部分功能'
        },
        {
          username: 'user05',
          password: '123456',
          role: 'user',
          createtime: '2021-05-14 00:03:00',
          remark: '用户：可查看部分功能'
        }
      ],
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        // this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
