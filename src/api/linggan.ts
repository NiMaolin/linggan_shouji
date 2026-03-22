import { apiFetch } from './http'

// 保存灵感内容到 T_linggan 表
export async function saveLinggan(content: string): Promise<{ id: string }> {
  return apiFetch<{ id: string }>('/api/linggan', {
    method: 'POST',
    body: JSON.stringify({ content })
  })
}
