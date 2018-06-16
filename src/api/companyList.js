import request from '@/utils/request'

//用户组列表渲染
export function companyListRender(){
  return request.get('admin/mechanism');
}

export function addCompanyData(data){
  return request.post('admin/mechanism',data)
}

export function deleteCompanyData(id){
  return request.delete(`admin/company/${id}`)
}

export function getcompanyData(id){
  return request.get(`admin/company/${id}`)
}

export function editCompanyData(id,data){
  return request.put('admin/mechanism/',id,data)
}
