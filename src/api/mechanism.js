import request from '@/utils/request'

//机构列表渲染
export function mechanismListRender(){
  return request.get('admin/organization');
}

//机构列表删除
// export function mechanismDelete(){
//   //return request.
// }

//机构列表添加
export function addMechanismData(data){
  return request.post('admin/organization',data)
}
//获取当前机构的数据
export function getMechanismData(id){
  return request.get(`admin/organization/${id}`)
}

//获取当前返佣比列的数据
export function getCommissionData(id){
  return request.get(`admin/organization/getRateRead/${id}`)
}

//机构列表编辑保存
export function editMechanismSave(id,data){
  return request.put('admin/organization/',id,data);
}
//机构列表删除
export function deleteMechanismData(id){
  return request.delete(`admin/organization/${id}`)
}

//获取地区列表
export function areaListRender(pid){
  return request.get(`admin/organization/getChildArea/${pid}`);
}

//机构佣金设置设置保存
export function editCommissionSave(data){
  return request.post('admin/organization/rateSave',data)
}


//机构佣金列表渲染
export function commissionListRender(){
  return request.get('admin/organization/getRateList');
}


