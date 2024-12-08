import request from '@/utils/request'
import { jsonpAdapter } from '@pingtou/axios-jsonp'

export async function queryProse(): Promise<any> {
  return request('/prose')
}

export async function addSave(data: Record<string, any>) {
  return request('http://47.93.55.40:447/loanonlineapplication/user/addSave', {
    data,
    adapter: jsonpAdapter,
    callbackParamName: 'callback',
  })
}
