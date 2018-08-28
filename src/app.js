import css from "./style.styl"
import './components/burgerMenu/index'
import OvalController from './components/ovalController/index'
import './scrolls'
import CircleController from "./components/circleController"
import data from './data.json'

const popups = document.querySelectorAll('[data-popup-wrapper]')
const popupTargers = document.querySelectorAll('[data-popup-target]')
const pageWrapper = document.querySelector('.page_wrapper')

const allData = [...data.scripts, ...data.mainCardDevices, ...data.favDevices]

for (let i = 0; i< popupTargers.length; i++) {
  const item = popupTargers[i]
  item.addEventListener('click', e => {
    const {x,y,width,height} = item.getBoundingClientRect()
    const popup = document.createElement('div');
    popup.className = 'popup'
    popup.style.top = y + window.pageYOffset
    popup.style.left = x + window.pageXOffset
    popup.style.width = width
    popup.style.height = height
    popup.style.position = 'fixed'
    popup.style.background = '#f7f7f7'
    document.body.appendChild(popup)
    document.body.classList.toggle('blur')
    
    const id = item.dataset.popupTarget
    
    const popupWrapperForThis = [...popups].find(i => i.dataset.popupWrapper === id)
    popupWrapperForThis.style.opacity = '0'
    popupWrapperForThis.style.display = 'flex'
    popupWrapperForThis.style.transition = 'none'
    const popupForThis = popupWrapperForThis.querySelector('.popup')

    const newSizes = popupForThis.getBoundingClientRect()

    popup.style.top = newSizes.y
    popup.style.left = newSizes.x
    popup.style.width = newSizes.width
    popup.style.height = newSizes.height
    popup.style.background = '#fff'
    popupWrapperForThis.style.opacity = '1'
    popupWrapperForThis.style.transform = 'scale(0)'
    const currentInfo = allData.find(i => i.id === id)

    setTimeout(() => {
      popupWrapperForThis.style.transition = null
      popupWrapperForThis.style.transform = 'scale(1)'
      if (currentInfo.control === 'temperature_circle') {
        new CircleController({min: 10, max: 30, current: 24, parent: popupWrapperForThis})
      } else if (currentInfo.control === 'light' || currentInfo.control === 'temperature') {
        new OvalController({ orientation: 'horizontal', parent: popupWrapperForThis })
      }
    }, 100)

    const closeBtn = popupWrapperForThis.querySelector('.btn--close')

    const handleClose = e => {
      document.body.classList.toggle('blur')
      popupWrapperForThis.style.opacity = '0'
      popup.style.top = y
      popup.style.left = x
      popup.style.width = width
      popup.style.height = height
      popup.style.position = 'fixed'
      popup.style.background = '#f7f7f7'
      setTimeout(() => {
        popup.remove()
        popupWrapperForThis.style.transform = null
        popupWrapperForThis.style.display = 'none'
        closeBtn.removeEventListener('click', handleClose)
      }, 400)
    }
    closeBtn.addEventListener('click', handleClose)
  })
}
