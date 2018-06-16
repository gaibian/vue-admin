import request from '@/utils/request'

//用户组列表渲染
export function menuListRender(){
  return request.get('admin/menus');
}

//菜单管理删除
export function menuListDelete(id){
  return request.delete('admin/menus/',id)
}
//菜单编辑渲染数据
export function menuEditRender(id){
  return request.get(`admin/menus/${id}`);
}

//菜单编辑保存
export function menuSaveData(id,data){
  return request.put('admin/menus/',id,data);
}

//rule列表渲染
export function menuRuleRender(){
  return request.get('admin/rules');
}
