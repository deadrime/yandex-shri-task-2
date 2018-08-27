class CircleController {
  constructor({ min = 10, max = 30, current = 24, parent = document } = {}) {
    this.parent = parent
    this.min = min
    this.max = max
    this.triangle = this.parent.querySelector(`.triangle-wrapper`)
    this.temperature = this.parent.querySelector('.temperature')
    const percentage = current / Math.abs(this.max) * 100 - this.min//* 100
    this.fillCircle(percentage)
    this.setTemperature(current)
    this.addControll()
  }

  // функция для поиска ближайшего к курсору элемента через вычисления расстояния от курсора до элементов
  findClosest(e) {
    let distances = [];
    const mouseX = parseInt(e.clientX)
    const mouseY = parseInt(e.clientY)

    const graduationsParent = this.parent.querySelector(`.graduations`)
    const graduations = Array.from(graduationsParent.childNodes);

    const graduationsCoords = graduations.map(link => {
      let rect = link.getBoundingClientRect();
      return [rect.x, rect.y]
    })

    graduationsCoords.forEach(([x, y]) => {
      let distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2)
      distances.push(parseInt(distance));
    });

    let closestLinkIndex = distances.indexOf(Math.min(...distances))
    return closestLinkIndex
  }

  fillCircle(percentage) {
    const start = 1 + 14
    const to = Number(116 / 100 * percentage) + 14

    this.triangle.style.transform = `rotate(${2.5 * (to - 2) + 4}deg)`

    for (let i = start; i <= to; i++) {
      const node = this.parent.querySelector(`.graduation:nth-child(${i})`)
      if (!node) continue
      node.style.background = '#F5A623'
    }
  }

  setTemperature(t) {
    this.temperature.innerHTML = t > 0 ? `+${t}` : t === 0 ? t : `-${t}`
  }

  paintCircle(e) {
    e.preventDefault()
    const index = this.findClosest(e)
    this.triangle.style.transform = `rotate(${2.5 * (index - 1) + 4}deg)`
    const start = 14 + 1 // 14 - так как у нас пакман, а не круг
    const end = 144 - 14 + 1

    const percentage = (index - 14) / (144 - 28 - 1)
    const number = Math.round(Math.abs(this.max - this.min) * percentage) + this.min
    this.setTemperature(number)
    for (let i = start; i <= end; i++) {
      const node = this.parent.querySelector(`.graduation:nth-child(${i})`)
      if (i <= index || index === end - 2) node.style.background = '#F5A623'
      else node.style.background = '#000'
    }
  }

  addControll() {
    const parent = this.parent.querySelector(`.circle_controller .inner`)

    const paintHandler = e => this.paintCircle(e)
    // Запрет выделения текста
    parent.addEventListener('selectstart', e => e.preventDefault())

    // Событие на клие
    parent.addEventListener('click', paintHandler)

    // Событие на перемещение мыши
    parent.addEventListener('mousedown', e => {
      e.preventDefault()
      parent.addEventListener('mousemove', paintHandler)
    })

    parent.addEventListener('mouseup', e => { // TODO, убрать и это событие тоже
      parent.removeEventListener('mousemove', paintHandler)
    })

    // Для сенсорных устройств
    parent.addEventListener('touchmove', e => {
      e.clientX = e.touches[0].clientX
      e.clientY = e.touches[0].clientY
      paintHandler(e)
    })
  }
}

export default CircleController