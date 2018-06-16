import request from '@/utils/request'

//用户组列表渲染
export function agentListRender(id){
  return request.get(`admin/users/followIndex?main_user_id=${id}`);
}
