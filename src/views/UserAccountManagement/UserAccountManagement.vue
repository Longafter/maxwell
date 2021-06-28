<template>
  <div class="uam-div">
    <!-- 检索 -->
    <el-form :inline="true" :model="formSearch" class="demo-form-inline1">
      <el-form-item>
        <el-input
          v-model="formSearch.user"
          placeholder="请输入用户名称 / 姓名"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="onSearch"
          >检索</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 新增 -->
    <div class="demo-form-inline2">
      <el-button icon="el-icon-plus" type="primary" @click="onAdd"
        >新增</el-button
      >
    </div>
    <!-- 表格正文 -->
    <div class="table-div">
      <span>共 {{ userInfo.length }} 条信息</span>
      <el-table
        :data="userInfo"
        align="center"
        :header-cell-style="{ background: '#EDF0F6' }"
      >
        <el-table-column
          v-for="(item, index) in columnData"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :align="item.align"
        >
        </el-table-column>
        <el-table-column label="操作" align="center" width="190%">
          <template slot-scope="scope">
            <el-button
              @click="addOrEditHandle(scope.row, scope.$index)"
              type="text"
              size="small"
              >编辑</el-button
            >
            <el-button
              @click="resetPassword(scope.$index)"
              type="text"
              size="small"
              >重置密码</el-button
            >
            <el-button
              @click="removeUser(scope.$index)"
              type="text"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import userInfo from '@/mock/userInfo.js'
export default {
  data () {
    return {
      userInfo,
      formSearch: {
        user: ''
      },
      tableData: [],
      columnData: [
        {
          label: '用户名称',
          prop: 'userName',
          width: 150,
          align: 'center'
        },
        {
          label: '姓名',
          prop: 'trueName',
          width: 150,
          align: 'center'
        },
        {
          label: '性别',
          prop: 'gender',
          width: 100,
          align: 'center'
        },
        {
          label: '手机',
          prop: 'mobile',
          width: 130,
          align: 'center'
        },
        {
          label: '邮箱',
          prop: 'email',
          width: 200,
          align: 'center'
        },
        {
          label: '创建时间',
          prop: 'createTime',
          width: 180,
          align: 'center'
        },
        {
          label: '更新时间',
          prop: 'updateTime',
          width: 180,
          align: 'center'
        }
      ]
    }
  },
  methods: {
    onSearch () {
      console.log('search!')
    },
    onAdd () {
      console.log('add!')
    }
  }
}
</script>

<style lang="scss">
.uam-div {
  position: relative;
  .demo-form-inline1 {
    position: absolute;
    left: 8%;
    top: 50px;
  }
  .demo-form-inline2 {
    position: absolute;
    right: 8%;
    top: 50px;
  }
  .table-div {
    position: absolute;
    top: 120px;
    left: 50%;
    transform: translate(-50%);
  }
}
</style>