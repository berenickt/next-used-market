import supabase from './supabase/browserSupabase'

/**
 * @description 이미지 여부 확인
 */
export function checkIsImage(str: string) {
  return /^data:image/.test(str) || /^https:\/\//.test(str)
}

/**
 * @description 이미지 URL 조회
 * @param fileName
 */
export async function getImageUrl(fileName: string) {
  // 이미지 URL이 이미 있는 경우, 그대로 반환
  if (fileName.startsWith('http')) {
    return fileName
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from('jggt')
    // getPublicUrl : 이미지 URL 조회
    .getPublicUrl(fileName)

  return publicUrl
}
