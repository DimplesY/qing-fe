import request from '@/utils/request'

export function getMenus(): Promise<CommResponse<Menu[]>> {
  return request({
    url: '/menus',
    method: 'GET',
  })
}
