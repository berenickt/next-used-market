import { SupabaseClient } from '@supabase/supabase-js'
import { nanoid } from 'nanoid'

import { getImageUrl } from '@/utils/image'

/**
 * @description 이미지 업로드
 * @param supabase
 * @param imageFile
 * @return 이미지 URL
 * @see https://github.com/ai/nanoid
 * nanoid : 이미지 업로드 시, 겹치지 않도록 고유한 ID 생성
 */
export async function uploadImage(
  supabase: SupabaseClient,
  imageFile: File,
): Promise<{ data: { imageUrl: string } }> {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    const { getMockImageDataUri } = await import('@/utils/mock')
    return { data: { imageUrl: getMockImageDataUri() } }
  }

  const { data, error } = await supabase.storage
    .from('jggt')
    // '고유키.확장자' 형태로 이미지 업로드
    .upload(
      `${nanoid()}.${imageFile.type === 'image/jpeg' ? 'jpeg' : 'png'}`,
      imageFile,
    )

  if (error) throw error

  // 이미지 URL 조회
  const imageUrl = await getImageUrl(data.path)

  return { data: { imageUrl } }
}
