import request from '@/utils/request'

//权限规则列表渲染
export function ruleListRender(){
  return request.get('admin/rules');
}

//权限规则删除
export function ruleListDelete(id){
  return request.delete('admin/rules/',id)
}

//添加权限
export function ruleListAdd(data){
  return request.post('admin/rules',data)
}

//添加权限渲染
export function addRuleRender(){
  return request.get('admin/rules')
}

//编辑权限保存
export function editRuleSave(id,data){
  return request.put('admin/rules/',id,data)
}

//编辑权限获取当前信息
export function editIdInfo(id){
  return request.get(`admin/rules/${id}`)
}
