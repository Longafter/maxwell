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
      <span>共 {{ tableData.length }} 条信息</span>
      <el-table
        :data="tableData"
        align="center"
        :header-cell-style="{ background: '#EDF0F6' }"
      >
        <el-table-column
          prop="userName"
          label="用户名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="realName"
          label="姓名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="手机"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          align="center"
          width="190%"
        ></el-table-column>
        <el-table-column
          prop="createdTime"
          label="创建时间"
          align="center"
          width="170%"
        ></el-table-column>
        <el-table-column
          prop="updatedTime"
          label="更新时间"
          align="center"
          width="170%"
        ></el-table-column>
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
export default {
  data () {
    return {
      formSearch: {
        user: ''
      },
      tableData: []
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
  // display: flex;
  position: relative;
  .demo-form-inline1 {
    // display: flex;
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