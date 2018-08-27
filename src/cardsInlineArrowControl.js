const inlineCardsWrapper = document.querySelector('.inline_cards')
const inlindeCards = Array.prototype.slice.call(inlineCardsWrapper.children)
const [inlineCardsPrev, inlineCardsNext] = document.querySelector('#inline_cards__controller').children

const easeInOutQuad = (t, b, c, d) => {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

const scrollTo = (element, to, duration) => {
  var start = element.scrollLeft,
    change = to - start,
    currentTime = 0,
    increment = 20;

  var animateScroll = function () {
    currentTime += increment;
    var val = easeInOutQuad(currentTime, start, change, duration);
    element.scrollLeft = val;
    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  };
  animateScroll();
}

let cursor = 0
const slideCount = 1

inlineCardsNext.addEventListener('click', e => {
  cursor++
  cursor = cursor > inlindeCards.length - 1 ? cursor - 1 : cursor

  const cardWidth = inlindeCards[0].getBoundingClientRect().width
  let padding = inlindeCards[1].getBoundingClientRect().x - inlindeCards[0].getBoundingClientRect().x - cardWidth
  for (let i = 0; i < inlindeCards.length; i++) {
    const percentage = 100 * cursor * slideCount
    inlindeCards[i].style.transform = `translateX(calc( -${percentage}% - ${padding * cursor * slideCount}px))` // еще можно так
  }
})

inlineCardsPrev.addEventListener('click', e => {
  cursor--
  cursor = cursor < 0 ? 0 : cursor

  const cardWidth = inlindeCards[0].getBoundingClientRect().width

  for (let i = 0; i < inlindeCards.length; i++) {
    let padding = inlindeCards[1].getBoundingClientRect().x - inlindeCards[0].getBoundingClientRect().x - cardWidth
    const percentage = 100 * cursor * slideCount
    inlindeCards[i].style.transform = `translateX(calc( -${percentage}% - ${padding * cursor * slideCount}px))` // еще можно так
  }
})
