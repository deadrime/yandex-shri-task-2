
class OvalController {
  constructor({current=30, parent=document.body}={}) {
    const controller = parent.querySelector('.oval_controller')
    this.circle = parent.querySelector('.oval_controller__circle')

    this.controller = controller

    const x = window.matchMedia("(min-width: 1024px)")
    this.resolveOrientation(x)
    x.addListener((e) => this.resolveOrientation(e))

    const size = this.orientation === 'vertical' ? controller.clientHeight : controller.clientWidth

    this.circleH = this.circle.clientHeight
    this.size = size

    this.tmpCursor = 0
    this.tmpOffser = 0
    this.additionalOffser = (this.circleH/2)/size*100 // учитываю размеры круга, чтобы рассчитывалось из середины

    if (this.orientation === 'vertical') {
      this.mooveTop(current)
    } else {
      this.mooveLeft(current)
    }
    this.addControll()
    
  }

  mooveHandler(e) {
    let diff, newPercentage
    if (this.orientation === 'vertical') {
      const currentMouseY = e.clientY
      diff = this.tmpCursor - currentMouseY
      newPercentage = (this.tmpOffser - diff + (this.circleH/2)) / this.size * 100
    } else {
      const currentMouseX = e.clientX
      diff = this.tmpCursor - currentMouseX
      newPercentage = (this.tmpOffser - diff + (this.circleH/2)) / this.size * 100
    }

    newPercentage = newPercentage < this.additionalOffser ? this.additionalOffser : newPercentage
    newPercentage = newPercentage > 100 - this.additionalOffser ? 100 - this.additionalOffser : newPercentage
    
    if (this.orientation === 'vertical') {
      this.mooveTop(newPercentage)
    } else {
      this.mooveLeft(newPercentage)
    }
  }

  mooveTop(percentage) {
    this.circle.style.top = `${percentage - this.additionalOffser}%`
  }

  mooveLeft(percentage) {
    this.circle.style.left = `${percentage - this.additionalOffser}%`
  }

  // разная ориентация требует разной логики, высчитываю тут размеры контроллера и отступы
  resolveOrientation(x) {
    if (x.matches) {
      this.orientation = 'horizontal'
      this.controller.classList.remove('oval_controller--vertical')
      this.controller.classList.add('oval_controller--horizontal')
      this.size = this.controller.clientWidth
      this.circle.style.top = null
    } else {
      this.orientation = 'vertical'
      this.controller.classList.add('oval_controller--vertical')
      this.controller.classList.remove('oval_controller--horizontal')
      this.size = this.controller.clientHeight
      this.circle.style.left = null
    }
    this.circleH = this.circle.clientHeight
    this.additionalOffser = (this.circleH/2)/this.size*100
  }

  // функция для добавления листенеров
  addControll() {
    const circle = this.circle
    const mooveHandler = e => this.mooveHandler(e)

    // Для мышки
    circle.addEventListener('mousedown', e => {
      e.preventDefault()

      if (this.orientation === 'vertical') {
        this.tmpCursor = e.clientY
        this.tmpOffser = circle.offsetTop
      } else {
        this.tmpCursor = e.clientX
        this.tmpOffser = circle.offsetLeft
      }

      window.addEventListener('mousemove', mooveHandler)
      window.addEventListener('mouseup', e => {
        window.removeEventListener('mousemove', mooveHandler)
      })  
    })
    
    // Для сенсорных устройств
    circle.addEventListener('touchstart', e=> {
      e.clientX = e.touches[0].clientX
      e.clientY = e.touches[0].clientY

      if (this.orientation === 'vertical') {
        this.tmpCursor = e.clientY
        this.tmpOffser = circle.offsetTop
      } else {
        this.tmpCursor = e.clientX
        this.tmpOffser = circle.offsetLeft
      }
    })

    circle.addEventListener('touchmove', e => {
      e.preventDefault()
      e.clientX = e.touches[0].clientX
      e.clientY = e.touches[0].clientY
      mooveHandler(e)
    })
  }
}

export default OvalController