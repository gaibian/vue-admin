import request from '@/utils/request'

//参数项列表渲染
export function parameterListRender(id){
  return request.get(`admin/systemParameter/itemIndex?parameter_id=${id}`);
}

//参数项添加
export function parameterSave(data){
  return request.post(`admin/systemParameter/itemSave`,data);
}
