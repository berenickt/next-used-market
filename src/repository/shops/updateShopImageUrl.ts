import { SupabaseClient } from '@supabase/supabase-js'

import { uploadImage } from '../common/uploadImage'

type Params = {
  shopId: string
  imageFile: File
}

/**
 * @description 상점 이미지 URL 업데이트
 * @param supabase
 * @param Params { shopId, imageFile }
 * @returns 이미지 URL
 */
export async function updateShopImageUrl(
  supabase: SupabaseClient,
  { shopId, imageFile }: Params,
): Promise<{ data: { imageUrl: string } }> {
  // Mock Data 사용 여부
  if (process.env.USE_MOCK_DATA === 'true') {
    const { getMockImageDataUri } = await import('@/utils/mock')
    return { data: { imageUrl: getMockImageDataUri() } }
  }

  // 이미지 업로드
  const {
    data: { imageUrl },
  } = await uploadImage(supabase, imageFile)

  // shopId에 해당하는 상점 이미지 URL 업데이트
  const { error } = await supabase
    .from('shops')
    .update({ image_url: imageUrl })
    .eq('id', shopId)

  if (error) throw error

  return { data: { imageUrl } }
}
