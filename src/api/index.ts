import request from '@/utils/request'
// import { jsonpAdapter } from '@pingtou/axios-jsonp'

export async function queryProse(): Promise<any> {
  return request('/prose')
}
