import request from '@/utils/request.js'

/**
 * 按需导出每个请求，也就是按需导出每个api
 */

// 用户登录接口
export const postLoginAPI = (params) => request.post('apis/login', params)

// 用户登出接口
export const postLogoutAPI = () => request.post('apis/logout')

// 获取用户列表接口
export const getUserListAPI = (params) => request.get('apis/user/list', params)

// 新增用户接口
export const addUser = (params) => request.post('apis/user/insert', params)

// 修改用户接口
export const editUser = (params) => request.put('apis/user/update', params)

// 修改用户密码接口
export const editPassword = (params) => request.put('apis/user/update/password', params)

// 删除用户接口
export const deleteUser = (params) => request.delete('apis/user/delete', params)
