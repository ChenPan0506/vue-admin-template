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
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="车辆VIN" width="210" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.vin }}</span>
        </template>
      </el-table-column>
      <el-table-column label="车辆状态" width="210" align="center">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column label="电池SOH" width="210" align="center">
        <template slot-scope="scope">
          <el-progress :text-inside="true" :stroke-width="24" :percentage="scope.row.soh" :status="scope.row.soh | statusFilter1" />
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="电池健康状态" width="210" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.health | statusFilter">{{ scope.row.health }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="备注">
        <template slot-scope="scope">
          {{ scope.row.remark }}
        </template>
      </el-table-column>
      <el-table-column label="是否有计算结果">
        <template slot-scope="scope">
          {{ scope.row.hasResult }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="更新时间" width="200">
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
  name: 'VehicleInfo',
  filters: {
    statusFilter1(status) {
      const statusMap = {
        1: 'success',
        2: 'waring',
        3: 'exception',
        0: 'default'
      }
      if (parseInt(status) <= 50) {
        return statusMap[3]
      } else if (parseInt(status) >= 85) {
        return statusMap[1]
      } else {
        return statusMap[2]
      }
    },
    statusFilter(status) {
      const statusMap = {
        5: 'success',
        4: 'success',
        3: 'gray',
        2: 'gray',
        1: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [
        {
          vin: 'LDSHEW897655556',
          status: '1',
          soh: '95',
          health: '5',
          createtime: '2021-05-14 00:03:00',
          hasResult: '是',
          remark: '备注信息'
        },
        {
          vin: 'LDSHEW897655555',
          status: '1',
          soh: '85',
          health: '4',
          createtime: '2021-05-14 00:03:00',
          hasResult: '是',
          remark: '备注信息'
        },
        {
          vin: 'LDSHEW897655554',
          status: '1',
          soh: '80',
          health: '3',
          createtime: '2021-05-14 00:03:00',
          hasResult: '是',
          remark: '备注信息'
        },
        {
          vin: 'LDSHEW897655553',
          status: '1',
          soh: '60',
          health: '2',
          createtime: '2021-05-14 00:03:00',
          hasResult: '是',
          remark: '备注信息'
        },
        {
          vin: 'LDSHEW897655552',
          status: '1',
          soh: '35',
          health: '1',
          createtime: '2021-05-14 00:03:00',
          hasResult: '是',
          remark: '备注信息'
        },
        {
          vin: 'LDSHEW897655551',
          status: '1',
          soh: '55',
          health: '2',
          createtime: '2021-05-14 00:03:00',
          hasResult: '是',
          remark: '备注信息'
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
