import css from "./style.styl"
import './components/burgerMenu/index'
import OvalController from './components/ovalController/index'
import './scrolls'
import CircleController from "./components/circleController"
import data from './data.json'

const temperaturePopup = document.querySelector('#temperature_popup')
const lightPopup = document.querySelector('#light_pupup')
const temperatureCirclePopup = document.querySelector('#temperature_circle_popup')
const defaultPopup = document.querySelector('#default_popup')
const popupTargers = document.querySelectorAll('[data-popup-target]')
const allData = [...data.scripts, ...data.mainCardDevices, ...data.favDevices]

for (let i = 0; i< popupTargers.length; i++) {
  popupTargers[i].addEventListener('click', function(e) {
    const id = this.dataset.popupTarget
    const item = allData.find(i => i.id === id)
    if (!item) return

    const {x,y,width,height} = this.getBoundingClientRect()
    const popup = document.createElement('div');
    popup.className = 'popup'
    Object.assign(popup.style, {
      top: y + window.pageYOffset,
      left: x + window.pageXOffset,
      width: width,
      height: height,
      position: 'fixed',
      background: '#f7f7f7',
    })

    document.body.appendChild(popup)
    document.body.classList.toggle('blur')
  
    let popupWrapperForThis
    switch (item.control) {
      case 'light':
        popupWrapperForThis = lightPopup
        break;
      case 'temperature':
        popupWrapperForThis = temperaturePopup
        break
      case 'temperature_circle':
        popupWrapperForThis = temperatureCirclePopup
        break
      default:
        popupWrapperForThis = defaultPopup
        break
    }

    popupWrapperForThis.style.opacity = '0'
    popupWrapperForThis.style.display = 'flex'
    popupWrapperForThis.style.transition = 'none'
    const popupForThis = popupWrapperForThis.querySelector('.popup')

    const newSizes = popupForThis.getBoundingClientRect()
    Object.assign(popup.style, {
      top: newSizes.y,
      left: newSizes.x,
      width: newSizes.width,
      height: newSizes.height,
      background: '#fff',
    })
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
      setTimeout(() => {
        popup.style.visibility = 'hidden'
      }, 400)
    }, 100)

    const closeBtn = popupWrapperForThis.querySelector('.btn--close')

    const handleClose = e => {
      document.body.classList.toggle('blur')
      popupWrapperForThis.style.opacity = '0'

      Object.assign(popup.style, {
        visibility: 'visible',
        top: y,
        left: x,
        width,
        height,
        position: 'fixed',
        background: '#f7f7f7'
      })

      setTimeout(() => {
        popup.style.opacity = '0'
        popupWrapperForThis.style.transform = null
        popupWrapperForThis.style.display = 'none'
        closeBtn.removeEventListener('click', handleClose)
        setTimeout(() => {
          popup.remove()
        }, 400)
      }, 400)
    }
    closeBtn.addEventListener('click', handleClose)
  })
}
