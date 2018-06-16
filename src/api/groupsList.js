import request from '@/utils/request'

//用户组列表渲染
export function groupsListRender(){
  return request.get('admin/groups');
}

//用户组列表删除
export function groupsListDelete(id){
  return request.delete('admin/groups/',id)
}

//用户组编辑渲染渲染数据
export function groupInfoRender(id){
  return request.get(`admin/groups/${id}`)
}

//用户组编辑获取权限数据
export function getRulesData(){
  return request.get('admin/rules?type=tree');
}

//用户组编辑保存
export function editGroupSave(id,data){
  return request.put('admin/groups/',id,data);
}

//添加用户组提交
export function addGroupSubmit(data){
  return request.post('admin/groups',data)
}
