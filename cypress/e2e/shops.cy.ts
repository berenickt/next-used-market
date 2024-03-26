describe('상점 페이지', () => {
  /*** (1)
   * 
   */
  it('상품 탭 클릭시 상품 탭으로 이동해야 한다', () => {
    cy.visit('http://localhost:3000/shops/mock-shop-id')
    cy.get('a[data-cy="shops-products-tab"]').click() // 상품 탭 클릭
    cy.url().should('eq', 'http://localhost:3000/shops/mock-shop-id/products')
  })

  /*** (2)
   * 
   */
  it('상점 후기 탭 클릭시 상점 후기 탭으로 이동해야 한다', () => {
    cy.visit('http://localhost:3000/shops/mock-shop-id')
    cy.get('a[data-cy="shops-reviews-tab"]').click() // 상점 후기 탭 클릭
    cy.url().should('eq', 'http://localhost:3000/shops/mock-shop-id/reviews')
  })

  /*** (3)
   * 
   */
  it('찜 탭 클릭시 찜 탭으로 이동해야 한다', () => {
    cy.visit('http://localhost:3000/shops/mock-shop-id')
    cy.get('a[data-cy="shops-likes-tab"]').click() // 찜 탭 클릭
    cy.url().should('eq', 'http://localhost:3000/shops/mock-shop-id/likes')
  })

  /*** (4)
   * 
   */
  it('팔로잉 탭 클릭시 팔로잉 탭으로 이동해야 한다', () => {
    cy.visit('http://localhost:3000/shops/mock-shop-id')
    cy.get('a[data-cy="shops-following-tab"]').click() // 팔로잉 탭 클릭
    cy.url().should('eq', 'http://localhost:3000/shops/mock-shop-id/following')
  })

  /*** (5)
   * 
   */
  it('팔로워 탭 클릭시 팔로워 탭으로 이동해야 한다', () => {
    cy.visit('http://localhost:3000/shops/mock-shop-id')
    cy.get('a[data-cy="shops-follower-tab"]').click() // 팔로워 탭 클릭
    cy.url().should('eq', 'http://localhost:3000/shops/mock-shop-id/follower')
  })
})
