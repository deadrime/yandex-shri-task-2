import chunk from 'lodash/chunk'
import { resolve } from 'uri-js'

const easeInOutQuad = (t, b, c, d) => {
  t /= d / 2
  if (t < 1) return c / 2 * t * t + b
  t--
  return -c / 2 * (t * (t - 2) - 1) + b
}

const scrollTo = (element, to, duration) => {
  let start = element.scrollLeft,
    change = to - start,
    currentTime = 0,
    increment = 20

  const animateScroll = () => {
    currentTime += increment
    var val = easeInOutQuad(currentTime, start, change, duration)
    element.scrollLeft = val
    if (currentTime < duration) {
      setTimeout(animateScroll, increment)
    }
  }
  animateScroll()
}


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

const cardsListWrapper = document.querySelector('.cards_list__wrapper')
const cardsListItems = [...cardsListWrapper.children]

const [cardListPrev, cardListsNext] = document.querySelector('#cards_list__controller').children
const [inlineCardsPrev, inlineCardsNext] = document.querySelector('#inline_cards__controller').children


const mainCardsWrapper = document.querySelector('.main_card__devices__wrapper')
const inlineCardsWrapper = document.querySelector('.inline_cards')

const addPagination = (wrapperNode, nextNode, prevNode) => {
  let page = 0
  nextNode.addEventListener('click', e => {
    const w = wrapperNode.getBoundingClientRect().width + 15
    page++ // TODO - как-то определять последнюю страницу
    scrollTo(wrapperNode, w*page, 300)
  })
  prevNode.addEventListener('click', e => {
    const w = wrapperNode.getBoundingClientRect().width + 15
    page--
    page = page < 0 ? 0 : page
    scrollTo(wrapperNode, w*page, 300)
  })
}

addPagination(cardsListWrapper, cardListsNext, cardListPrev)
addPagination(inlineCardsWrapper, inlineCardsNext, inlineCardsPrev)

addTouchEvents(cardsListWrapper)
addTouchEvents(mainCardsWrapper, true)
addTouchEvents(inlineCardsWrapper, true)

addMousewheelEvent(cardsListWrapper)
addMousewheelEvent(mainCardsWrapper, true)
addMousewheelEvent(inlineCardsWrapper, true)


const createPages = (rows=3, columns=3) => {
  const pages = []
  const gridSize = rows*columns
  const chunks = chunk(cardsListItems, gridSize)
  chunks.forEach(i => {
    const newPage = document.createElement('div')
    newPage.className = 'cards_list'
    i.forEach(item => newPage.appendChild(item))
    pages.push(newPage)
  })
  return pages
}

const appendPages = pages => {
  cardsListWrapper.innerHTML = null
  pages.forEach(page => {
    cardsListWrapper.appendChild(page)
  })
}

const media = {
  query: "(min-width: 1024px) and (max-width: 1365px)",
  sizes: [4, 3]
}

const twoRows = window.matchMedia("(min-width: 1024px) and (max-width: 1365px)")
const threeRows = window.matchMedia("(min-width: 1366px) and (max-width: 1799px)")
const fourRows = window.matchMedia("(min-width: 1800px)")

const resolveTwoRows = e => {
  if (e.matches) {
    const pages = createPages(2, 3)
    appendPages(pages)
  }
}

const resolveTreeRows = e => {
  if (e.matches) {
    const pages = createPages(3, 3)
    appendPages(pages)
  }
}

const resolveFourRows = e => {
  if (e.matches) {
    const pages = createPages(4, 3)
    appendPages(pages)
  }
}

twoRows.addListener(resolveTwoRows)
threeRows.addListener(resolveTreeRows)
fourRows.addListener(resolveFourRows)

resolveTwoRows(twoRows)
resolveTreeRows(threeRows)
resolveFourRows(fourRows)
