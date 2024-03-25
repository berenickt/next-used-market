export const RECENT_ITEM_IDS_KEY = 'recent_item_ids_[]' // 최근 본 상품
export const RECENT_KEYWORDS_KEY = 'recent_keywords_[]' // 최근 검색어

type ArrayKeys = typeof RECENT_ITEM_IDS_KEY | typeof RECENT_KEYWORDS_KEY

/** (1)
 * @description 로컬스토리지 배열 조회
 * @param key
 * @returns
 */
const getArray = (key: ArrayKeys) => {
  try {
    const items = localStorage.getItem(key)
    if (items) {
      return JSON.parse(items)
    }
    return []
  } catch {
    return []
  }
}

/** (2)
 * @description 로컬스토리지 배열 저장
 * - dispatchEvent : 커스컴 이벤트 생성
 * @param key
 * @param value
 */
const setArray = (key: ArrayKeys, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value))
  window.dispatchEvent(new Event(key))
}

/** (3)
 * @description 최근 검색어 조회
 */
export const getRecentKeywords = (): string[] => getArray(RECENT_KEYWORDS_KEY)

/** (4)
 * @description 최근 검색어 추가
 * @param keyword
 */
export const addRecentKeyword = (keyword: string) => {
  const items = getRecentKeywords()
  const existItem = items.find(item => item === keyword) // 중복 검사

  if (existItem) {
    // 중복된 검색어가 있으면, 기존 검색어를 삭제하고 새로운 검색어를 추가
    const prevItems = items.filter(item => item !== keyword)
    setArray(RECENT_KEYWORDS_KEY, [keyword, ...prevItems])
  } else {
    // 중복된 검색어가 없으면, 새로운 검색어를 추가
    setArray(RECENT_KEYWORDS_KEY, [keyword, ...items])
  }
}

/** (5)
 * @description 최근 검색어 삭제
 */
export const clearRecentKeyword = () => {
  setArray(RECENT_KEYWORDS_KEY, [])
}

/** (6)
 * @description 최근 본 상품 조회
 */
export const getRecentItemIds = (): string[] => getArray(RECENT_ITEM_IDS_KEY)

/** (7)
 * @description 최근 본 상품 추가
 * @param productId
 */
export const addRecentItemId = (productId: string) => {
  const items = getRecentItemIds()
  const existItem = items.find(item => item === productId)

  if (existItem) {
    const prevItems = items.filter(item => item !== productId)
    setArray(RECENT_ITEM_IDS_KEY, [productId, ...prevItems])
  } else {
    setArray(RECENT_ITEM_IDS_KEY, [productId, ...items])
  }
}

/** (8)
 * @description 최근 본 상품 삭제
 * @param productId
 */
export const removeRecentItemId = (productId: string) => {
  const items = getRecentItemIds()
  setArray(
    RECENT_ITEM_IDS_KEY,
    items.filter(item => item !== productId),
  )
}
