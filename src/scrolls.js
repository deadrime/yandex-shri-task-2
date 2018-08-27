const addTouchEvents = (wrapper, widthY=false) => {
  let tmpX, tmpY

  wrapper.addEventListener('touchstart', e => {
    tmpX = e.touches[0].clientX + wrapper.scrollLeft
    if (widthY) {
      tmpY = e.touches[0].clientY + wrapper.scrollTop
    }
  })

  wrapper.addEventListener('touchmove', e => {
    e.preventDefault()
    const diffX = tmpX - e.touches[0].clientX
    wrapper.scrollLeft = diffX
    if (widthY) {
      const diffY = tmpY - e.touches[0].clientY
      wrapper.scrollTop = diffY
    }
  })
}

const addMousewheelEvent = (wrapper, withY=false, power=0.8) => {
  wrapper.addEventListener('mousewheel', e => {
    e.preventDefault()
    let delta = e.deltaY || e.wheelDelta
    delta *= power
  
    wrapper.scrollLeft += delta
    if (withY) {
      wrapper.scrollTop += delta
    }
  })
}

const cardsListWrapper = document.querySelector('.cards_list')
const cardsListItems = cardsListWrapper.children

const [inlineCardsPrev, inlineCardsNext] = document.querySelector('#cards_list__controller').children

inlineCardsNext.addEventListener('click', e => {
  const rowLimit = 3
  // TODO - переключение избранных сценариев на главный, разбить на страница, добавить переключение между ними 
  //const cardWidth = cardsListItems[0].getBoundingClientRect().width
  //let cardPadding = cardsListItems[1].getBoundingClientRect().x - cardsListItems[0].getBoundingClientRect().x - cardWidth
  let cardInRow = 0
  for(let i = 0; i< cardsListItems.length; i++) {
    const currentY = cardsListItems[i].getBoundingClientRect().y
    const nextY = cardsListItems[i+1].getBoundingClientRect().y
    cardInRow++
    if (currentY !== nextY) break
  }
  const gridSize = rowLimit*cardInRow
  //console.log(gridSize)
})

const mainCardsWrapper = document.querySelector('.main_card__devices__wrapper')
const inlineCardsWrapper = document.querySelector('.inline_cards')

addTouchEvents(cardsListWrapper)
addTouchEvents(mainCardsWrapper, true)
addTouchEvents(inlineCardsWrapper, true)
addMousewheelEvent(cardsListWrapper)
addMousewheelEvent(mainCardsWrapper, true)
addMousewheelEvent(inlineCardsWrapper, true)
