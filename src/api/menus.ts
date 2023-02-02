import { request } from '@/utils/request'

export function getMenus() {
  return request<CommResponse<Menu>>({
    url: '/menus',
    method: 'GET',
  })
}
