describe('메인페이지', () => {
  /*** (1)
   * @see https://docs.cypress.io/api/commands/visit
   * visit() : 원격 URL을 방문합니다.
   * 
   * @see https://docs.cypress.io/api/commands/contains
   * contains() : 텍스트가 포함된 DOM 요소를 가져옵니다
   */
  it('각 항목들이 노출되어야 한다', () => {
    cy.visit('http://localhost:3000') // localhost:3000으로 이동
    cy.contains('중고장터') // '중고장터'가 존재하는지 확인
    cy.contains('판매하기')
    cy.contains('내 상점')
    cy.contains('채팅')
    cy.contains('찜한 상품')
    cy.contains('최근본상품')
  })

  /*** (2)
   * @see https://docs.cypress.io/api/commands/wait
   * wait() : 다음 명령으로 넘어가기 전에 몇 밀리초 동안 기다리거나 별칭이 지정된 리소스가 해결될 때까지 기다립니다.
   * 
   * @see https://docs.cypress.io/api/commands/click#__docusaurus_skipToContent_fallback
   * click() : DOM 요소를 클릭합니다.
   */
  it('판매 페이지로 이동할 수 있어야 한다', () => {
    cy.visit('http://localhost:3000')
    cy.wait(2000) // 2초 대기
    cy.contains('판매하기').click() // 판매하기 클릭
    cy.contains('상품정보') // 상품정보가 존재하는지 확인
  })

  /*** (3)
   * 
   */
  it('내 상점 페이지로 이동할 수 있어야 한다', () => {
    cy.visit('http://localhost:3000')
    cy.wait(2000)
    cy.contains('내 상점').click()
    cy.contains('상점명 수정')
    cy.contains('내 상점 관리')
    cy.contains('소개글 수정')
  })

  /*** (4)
   * 
   */
  it('채팅 페이지로 이동할 수 있어야 한다', () => {
    cy.visit('http://localhost:3000')
    cy.wait(2000)
    cy.contains('채팅').click()
    cy.contains('대화를 선택해주세요')
  })

  /*** (5)
   * @see https://docs.cypress.io/api/commands/get
   * get() : 선택기 또는 별칭으로 하나 이상의 DOM 요소를 가져옵니다.
   */
  it('검색창 클릭시 최근 검색어가 나와야 한다', () => {
    cy.visit('http://localhost:3000')
    cy.wait(2000)
    cy.get('input[placeholder="상품명, 상점명 입력"]').click() // 검색창 클릭
    cy.contains('최근 검색어')
    cy.contains('최근 검색어가 없습니다')
  })

  /*** (6)
   * @see https://docs.cypress.io/api/commands/type
   * type() : DOM 요소에 입력합니다.
   * 
   * @see https://docs.cypress.io/api/commands/url
   * next() : DOM 요소 집합 내에서 각 DOM 요소의 바로 다음 형제 요소를 가져옵니다.
   * 
   * @see https://docs.cypress.io/api/commands/should#__docusaurus_skipToContent_fallback
   * should() : 어설션(의견)을 만듭니다. 어설션은 통과하거나 시간이 초과될 때까지 자동으로 다시 시도됨
   */
  it('검색어 입력시 자동 완성이 되어야 한다', () => {
    cy.visit('http://localhost:3000')
    cy.wait(2000)
    cy.get('input[placeholder="상품명, 상점명 입력"]').type('가위') // '가위' 입력
    cy.contains('상점 검색 >').next().contains('가위') // '가위'가 자동완성 되는지 확인
    cy.contains('가위 - 0').click() // '가위 - 0' 클릭
    // URL이 정상적으로 변경되는지 확인
    cy.url().should('eq', `http://localhost:3000/search?query=${encodeURIComponent('가위 - 0')}`)
  })

  /*** (7)
   * @see https://docs.cypress.io/api/commands/clear
   * clear() : 입력 또는 텍스트 영역의 값을 지웁니다.
   * 
   * @see https://docs.cypress.io/api/commands/parent
   * parent() : DOM 요소의 부모를 가져옵니다.
   * 
   * @sees https://docs.cypress.io/api/commands/children#__docusaurus_skipToContent_fallback
   * children() : DOM 요소의 자식을 가져옵니다.
   */
  it('상품 검색 이후 최근 검색어에 해당 검색어가 포함되어야 한다', () => {
    cy.visit('http://localhost:3000')
    cy.wait(2000)
    cy.get('input[placeholder="상품명, 상점명 입력"]').type('가위') // '가위' 입력
    cy.contains('가위 - 0').click()
    cy.wait(2000)
    cy.get('input[placeholder="상품명, 상점명 입력"]').clear() // 검색창 초기화
    // 최근 검색어에 '가위 - 0'이 포함되는지 확인
    cy.contains('최근 검색어').parent().next().children().contains('가위 - 0')
  })

  /*** (8)
   * 
   */
  it('상점 검색 클릭시 상점 검색이 되어야 한다', () => {
    cy.visit('http://localhost:3000')
    cy.wait(2000)
    cy.get('input[placeholder="상품명, 상점명 입력"]').type('가위') // '가위' 입력
    cy.contains('상점 검색 >').click() // 상점 검색 클릭
    // URL이 정상적으로 변경되는지 확인
    cy.url().should('eq', `http://localhost:3000/search/shop?query=${encodeURIComponent('가위')}`)
  })
})
