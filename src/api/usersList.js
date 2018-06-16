import request from '@/utils/request'

//用户列表
export function usersList(data){
  return request.get('admin/users',data)
}

//用户列表删除
export function usersListDelete(id){
  return request.delete(`admin/users/${id}`)
}

//添加用户
export function addUser(data){
  return request.post(`admin/users`,data);
}

//添加用户 部门
export function groupsData(){
  return request.get('admin/groups')
}

//添加用户 用户组
export function structuresData(){
  return request.get('admin/structures')
}

//编辑用户
export function usersEditData(id,data){
  return request.put('admin/users/',id,data)
}

//
export function getCompleteData(id){
  return request.get(`admin/users/${id}`)
}

//添加关联
export function addFollowSave(data){
  return request.post('admin/users/followSave',data);
}

//分页
export function pageData(data){
  return request.get('admin/users',data)
}
