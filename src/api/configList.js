import request from '@/utils/request'

//参数列表渲染
export function configListRender(){
  return request.get('admin/systemParameter');
}
//参数添加
export function addConfig(data){
  return request.post('admin/systemParameter',data);
}
//参数编辑
export function editConfig(id){
  return request.get(`admin/systemParameter/${id}`);
}
//编辑参数保存
export function saveConfig(id,data){
  return request.put('admin/systemParameter/',id,data)
}
