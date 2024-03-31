'use client'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { ChangeEventHandler, useEffect, useRef, useState } from 'react'
// @ts-ignore
import { experimental_useFormState as useFormState } from 'react-dom'

import SubmitButton from './_components/SubmitButton'
import { createProductAction, updateProductAction } from './action'

import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Text from '@/components/common/Text'
import Container from '@/components/layout/Container'
import MarkdownEditorSkeleton from '@/components/shared/MarkdownEditor/Skeleton'
import { uploadImage } from '@/repository/common/uploadImage'
import { City, cities, getDistricts } from '@/utils/address'
import supabase from '@/utils/supabase/browserSupabase'

type Props = {
  id: string
  imageUrls: string[]
  title: string
  isUsed: boolean
  isChangeable: boolean
  price: number
  city: City
  district: string
  description: string
  tags: string[]
}

/*** next/dynamic : Next.js에서 Lazy Loading을 사용하기 위한 방법
 * `Lazy Loading` : 리소스를 필요한 경우에만 로드하는 기술
 * - 필요한 경우메나 로드하기 때문에 초기 로딩 시간을 줄일 수 있음
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading
 */
const MarkdownEditor = dynamic(
  // Lazy Loading할 컴포넌트
  () => import('@/components/shared/MarkdownEditor'),
  {
    // ssr 환경에서 Lazy Loading을 사용할지 여부 (기본값: true)
    // - false로 설정하면 클라이언트에서만 컴포넌트를 로드함
    ssr: false,
    // Lazy Loading 진행 중에 Fallback을 노출하기 위한 파라미터
    // 명시적으로 loading을 통해 Fallback을 부여하지 않더라도
    // Suspense 컴포넌트를 사용해 Fallback 노출이 가능하다.
    loading: () => <MarkdownEditorSkeleton />,
  }
)

/**
 * @description 상품 등록/수정 폼
 * @param Props { id, imageUrls, title, isUsed, isChangeable, price, city, district, description, tags }
 */
export default function ProductForm({
  id: defaultId,
  imageUrls: defaultImageUrls,
  title: defaultTitle,
  isUsed: defaultIsUsed,
  isChangeable: defaultIsChangeable,
  price: defaultPrice,
  city: defaultCity,
  district: defaultDistrict,
  description: defaultDescription,
  tags: defaultTags,
}: Partial<Props>) {
  const router = useRouter()

  const formType = defaultId ? 'edit' : 'new'

  /***
   * @description useFormState : Form 상태를 관리하는 Hook
   * new 타입이면 ? 상품 생성 액션 : 상품 수정 액션
   * @see https://react.dev/reference/react-dom/hooks/useFormState
   */
  const [state, formAction] = useFormState(
    formType === 'new' ? createProductAction : updateProductAction,
    {}
  )

  useEffect(() => {
    if (state.errorMessage) alert(state.errorMessage)
    else if (state.data) router.push(`/products/${state.data.id}`)
  }, [router, state])

  const tagInputRef = useRef<HTMLInputElement>(null)

  const [tags, setTags] = useState<string[]>(defaultTags || [])
  const [city, setCity] = useState<City | undefined>(defaultCity)
  const [description, setDescription] = useState<string>(defaultDescription || '')
  const [imageUrls, setImageUrls] = useState<string[]>(defaultImageUrls || [])

  /***
   * @description 이미지 업로드 핸들러
   */
  const handleUploadImage: ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (e.target.files?.[0]) {
      const imageFile = e.target.files[0]
      const {
        data: { imageUrl },
      } = await uploadImage(supabase, imageFile)
      e.target.value = ''
      setImageUrls((prev) => [imageUrl, ...prev])
    }
  }

  /***
   * @description 태그 추가 핸들러
   */
  const handleAddTag = () => {
    if (!tagInputRef.current) return

    const tagValue = tagInputRef.current.value.trim() // 공백 제거
    tagInputRef.current.value = ''

    // 태그가 5개 이상이면 추가하지 않음
    if (tags.length >= 5) return

    // 태그가 중복되지 않으면 추가
    setTags((prevTags) => {
      if (!prevTags.find((tag) => tag === tagValue)) {
        return [...prevTags, tagValue]
      }
      return prevTags
    })
  }

  /***
   * @description 이미지 삭제 핸들러
   */
  const handleRemoveImage = (imageUrl: string) => {
    setImageUrls((prevImages) => prevImages.filter((imageUrlItem) => imageUrlItem !== imageUrl))
  }

  /***
   * @description 태그 삭제 핸들러
   */
  const handleRemoveTag = (tag: string) => {
    setTags((prevTags) => prevTags.filter((tagItem) => tagItem !== tag))
  }

  return (
    <form action={formAction}>
      {defaultId && <input type='hidden' name='id' defaultValue={defaultId} />}
      <Container>
        <div className='my-10 border-b-2 border-black py-7'>
          <Text size='2xl' className='mr-3'>
            {formType === 'edit' ? '수정하기' : '상품정보'}
          </Text>
          <Text size='md' color='red'>
            * 필수정보
          </Text>
        </div>
        <div className='flex border-b border-grey-300 pb-7 pt-5'>
          <div className='w-40'>
            <Text size='lg'> 상품 이미지 </Text>
            <Text size='lg' color='grey' weight='light'>
              ({imageUrls.length}/3)
            </Text>
            <Text size='md' color='red'>
              *
            </Text>
          </div>
          <div className='flex gap-2'>
            {/* 이미지 조회 및 삭제 */}
            {imageUrls.map((imageUrl) => (
              <div key={imageUrl} className='w-40 h-40 border relative'>
                {/* 이미지 삭제 */}
                <button
                  type='button'
                  className='rounded-full bg-black opacity-50 absolute top-1 right-1 w-8 h-8 text-white'
                  onClick={() => handleRemoveImage(imageUrl)}
                >
                  <span className='material-symbols-outlined' style={{ fontSize: '1rem' }}>
                    close
                  </span>
                </button>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageUrl} alt='' className='w-full h-full' />
                <input type='text' name='imageUrls' defaultValue={imageUrl} hidden />
              </div>
            ))}
            {/* 이미지를 3개까지만 업로드 버튼 */}
            {imageUrls.length < 3 && (
              <>
                <label htmlFor='image'>
                  <div className='w-40 h-40 border flex justify-center items-center cursor-pointer'>
                    파일 업로드 하기
                  </div>
                </label>
                <input
                  type='file'
                  id='image'
                  accept='.jpg, .jpeg, .png'
                  hidden
                  disabled={imageUrls.length >= 3}
                  onChange={handleUploadImage}
                />
              </>
            )}
          </div>
        </div>
        {/* 상품명 */}
        <div className='flex border-b border-grey-300 pb-7 pt-5'>
          <div className='w-40'>
            <Text size='lg'> 상품명 </Text>
            <Text size='md' color='red'>
              *
            </Text>
          </div>
          <div className='flex-1'>
            <Input
              type='text'
              className='w-full px-3 py-2'
              placeholder='상품명을 입력해주세요'
              name='title'
              defaultValue={defaultTitle}
              required
            />
          </div>
        </div>
        {/* 상품 상태 */}
        <div className='flex border-b border-grey-300 pb-7 pt-5'>
          <div className='w-40'>
            <Text size='lg'> 상품상태 </Text>
            <Text size='md' color='red'>
              *
            </Text>
          </div>
          <div className='flex-1'>
            <select
              required
              name='isUsed'
              className='border py-1 px-2 w-32'
              defaultValue={defaultIsUsed === undefined ? undefined : defaultIsUsed ? 'y' : 'n'}
            >
              <option value='y'>신품</option>
              <option value='n'>중고</option>
            </select>
          </div>
        </div>
        {/* 교환 여부 */}
        <div className='flex border-b border-grey-300 pb-7 pt-5'>
          <div className='w-40'>
            <Text size='lg'> 교환 </Text>
            <Text size='md' color='red'>
              *
            </Text>
          </div>
          <div className='flex-1'>
            <select
              required
              name='isChangeable'
              className='border py-1 px-2 w-32'
              defaultValue={
                defaultIsChangeable === undefined ? undefined : defaultIsChangeable ? 'y' : 'n'
              }
            >
              <option value='y'>가능</option>
              <option value='n'>불가</option>
            </select>
          </div>
        </div>
        {/* 가격 */}
        <div className='flex border-b border-grey-300 pb-7 pt-5'>
          <div className='w-40'>
            <Text size='lg'> 가격 </Text>
            <Text size='md' color='red'>
              *
            </Text>
          </div>
          <div className='flex-1'>
            <Input
              type='number'
              className='w-full px-3 py-2'
              placeholder='가격을 입력해주세요'
              name='price'
              defaultValue={defaultPrice}
              required
            />
          </div>
        </div>
        {/* 거래지역 */}
        <div className='flex border-b border-grey-300 pb-7 pt-5'>
          <div className='w-40'>
            <Text size='lg'> 거래지역 </Text>
            <Text size='md' color='red'>
              *
            </Text>
          </div>
          <div className='flex-1 flex gap-2'>
            <select
              className='border py-1 px-2 w-32'
              name='city'
              required
              defaultValue={defaultCity}
              onChange={(e) => {
                if (e.currentTarget.value) {
                  setCity(e.currentTarget.value as City)
                } else {
                  setCity(undefined)
                }
              }}
            >
              <option value=''>선택</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {!!city && (
              <select
                className='border py-1 px-2 w-32'
                name='district'
                defaultValue={defaultDistrict}
              >
                <option value=''> 선택 </option>
                {getDistricts(city).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
        {/* 상품태그 */}
        <div className='flex border-b border-grey-300 pb-7 pt-5'>
          <div className='w-40'>
            <Text size='lg'> 상품태그 </Text>
          </div>
          <div className='flex-1 flex flex-col gap-2'>
            <div className='flex gap-2 flex-wrap'>
              {tags.map((tag) => (
                <div
                  key={tag}
                  className='bg-purple-200 rounded-lg px-2 flex justify-center items-center'
                >
                  {tag}
                  <span
                    className='material-symbols-outlined cursor-pointer'
                    style={{ fontSize: '1.25rem' }}
                    onClick={() => handleRemoveTag(tag)}
                  >
                    close
                  </span>
                  <input type='text' name='tags' defaultValue={tag} hidden />
                </div>
              ))}
            </div>
            <div className='flex w-96'>
              <Input
                className='flex-1'
                type='text'
                placeholder='태그를 입력하세요. (최대 5개)'
                ref={tagInputRef}
                disabled={tags.length >= 5}
                onKeyDown={(e) => {
                  // Enter 키 입력 시 태그 추가
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddTag()
                    return false
                  }
                }}
              />
              <Button
                type='button'
                disabled={tags.length >= 5}
                onClick={() => {
                  handleAddTag()
                }}
              >
                입력
              </Button>
            </div>
          </div>
        </div>
        {/* 상품설명 */}
        <div className='flex border-b border-grey-300 pb-7 pt-5'>
          <div className='w-40'>
            <Text size='lg'> 상품설명 </Text>
            <Text size='md' color='red'>
              *
            </Text>
          </div>
          <div className='flex-1'>
            <MarkdownEditor
              initialValue={description}
              handleOnChage={(value) => {
                setDescription(value)
              }}
            />
            <input
              type='text'
              value={description}
              name='description'
              readOnly
              required
              className='opacity-0 h-1 w-1'
            />
          </div>
        </div>
      </Container>
      {/* 등록, 수정 버튼 */}
      <div className='sticky bottom-0 z-50 bg-gray-100 py-4 border-t border-gray-200'>
        <Container>
          <div className='flex justify-end'>
            <SubmitButton>{formType === 'edit' ? '수정하기' : '등록하기'}</SubmitButton>
          </div>
        </Container>
      </div>
    </form>
  )
}
