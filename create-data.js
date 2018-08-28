const shortId = require('shortid');
const fs = require('fs')

const data = {
  navigation: [
    {
      title: 'Сводка',
      href: '#',
      active: true
    },
    {
      title: 'Устройства',
      href: '#'
    },
    {
      title: 'Сценарии',
      href: '#'
    }
  ],
  mainCardDevices: [
    {
      id: shortId.generate(),
      name: 'Philips Cooler',
      status: 'Начнет охлаждать в 16:30',
      active: false,
      control: 'temperature',
      values: [
        {
          title: 'Вручную',
          value: 0,
        },
        {
          title: 'Дневной свет',
          value: 0,
        },
        {
          title: 'Вечерний свет',
          value: 0,
        },
      ]
    },
    {
      id: shortId.generate(), 
      name: 'Xiaomi Yeelight LED Smart Bulb',
      status: 'Включится в 17:00',
      active: true,
      control: 'light'
    },
    {
      id: shortId.generate(),
      name: 'Philips Cooler',
      status: 'Начнет охлаждать в 16:30',
      active: false,
      control: 'temperature'
    },
    {
      id: shortId.generate(),
      name: 'Xiaomi Yeelight LED Smart Bulb',
      status: 'Включится в 17:00',
      active: true,
      control: 'light'
    },
  ],
  mainCategories: [
    {
      title: 'Все',
      active: true
    },
    {
      title: 'Кухня',
    },
    {
      title: 'Зал',
    },
    {
      title: 'Лампочки',
    },
    {
      title: 'Камеры',
    },
  ],
  favDevices: [
    {
      id: shortId.generate(),
      name: 'Philips Cooler',
      status: 'Начнет охлаждать в 16:30',
      active: true,
      control: 'temperature'
    },
    {
      id: shortId.generate(),
      name: 'Xiaomi Warm Floor',
      status: 'Включится в 17:00',
      active: true,
      control: 'temperature_circle'
    },
    {
      id: shortId.generate(),
      name: 'Xiaomi Yeelight LED Smart Bulb',
      status: 'Включится в 17:00',
      active: false,
      control: 'light'
    },
    {
      id: shortId.generate(),
      name: 'Philips Cooler',
      status: 'Начнет охлаждать в 16:30',
      active: true,
      control: 'temperature'
    },
    {
      id: shortId.generate(),
      name: 'D-Link Omna 180 Cam',
      status: 'Включится в 17:00',
      active: false,
      control: 'light'
    },
    {
      id: shortId.generate(),
      name: 'Philips Cooler',
      status: 'Начнет охлаждать в 16:30',
      active: true,
      control: 'temperature'
    },
    {
      id: shortId.generate(),
      name: 'Elgato Eve Degree Connected',
      status: 'Включится в 17:00',
      active: false,
      control: 'light'
    },
    {
      id: shortId.generate(),
      name: 'LIFX Mini Day & Dusk A60 E27',
      status: 'Начнет охлаждать в 16:30',
      active: true,
      control: 'temperature'
    },
    {
      id: shortId.generate(),
      name: 'Philips Zhirui',
      status: 'Начнет охлаждать в 16:30',
      active: false,
      control: 'light'
    },
    {
      id: shortId.generate(),
      name: 'Xiaomi Mi Air Purifier 2S',
      status: 'Включится в 17:00',
      active: false,
      control: 'light'
    },
  ],
  scripts: [
    {
      id: shortId.generate(),
      name: 'Выключить весь свет в доме и во дворе',
      control: 'light',
      status: '',
      active: true
    },
    {
      id: shortId.generate(),
      name: 'Я ухожу',
      control: 'time',
      status: '',
      active: false
    },
    {
      id: shortId.generate(),
      name: 'Включить свет в коридоре',
      control: 'light',
      status: '',
      active: true
    },
    {
      id: shortId.generate(),
      name: 'Набрать горячую ванну',
      control: 'temperature',
      status: 'Начнётся в 18:00',
      active: true
    },
    {
      id: shortId.generate(),
      name: 'Сделать пол тёплым во всей квартире',
      control: 'temperature',
      status: '',
      active: true
    },
    {
      id: shortId.generate(),
      name: 'Включить свет в коридоре',
      control: 'light',
      status: '',
      active: true
    },
    {
      id: shortId.generate(),
      name: 'Набрать горячую ванну',
      control: 'temperature',
      status: 'Начнётся в 18:00',
      active: true
    },
    {
      id: shortId.generate(),
      name: 'Сделать пол тёплым во всей квартире',
      control: 'temperature',
      status: '',
      active: true
    },
    {
      id: shortId.generate(),
      name: 'Сделать пол тёплым во всей квартире',
      control: 'temperature',
      status: '',
      active: true
    },
    {
      id: shortId.generate(),
      name: 'Включить свет в коридоре',
      control: 'light',
      status: '',
      active: true
    },
    {
      id: shortId.generate(),
      name: 'Набрать горячую ванну',
      control: 'temperature',
      status: 'Начнётся в 18:00',
      active: true
    },
    {
      id: shortId.generate(),
      name: 'Сделать пол тёплым во всей квартире',
      control: 'temperature',
      status: '',
      active: true
    },
    {
      id: shortId.generate(),
      name: 'Сделать пол тёплым во всей квартире',
      control: 'temperature',
      status: '',
      active: true
    },
    {
      id: shortId.generate(),
      name: 'Включить свет в коридоре',
      control: 'light',
      status: '',
      active: true
    },
    {
      id: shortId.generate(),
      name: 'Набрать горячую ванну',
      control: 'temperature',
      status: 'Начнётся в 18:00',
      active: true
    },
    {
      id: shortId.generate(),
      name: 'Сделать пол тёплым во всей квартире',
      control: 'temperature',
      status: '',
      active: true
    },
  ],
  'footerNav': [
    {
      title: 'Помощь',
      href: '#'
    },
    {
      title: 'Обратная связь',
      href: '#'
    },
    {
      title: 'Разработчикам',
      href: '#'
    },
    {
      title: 'Условия использования',
      href: '#'
    }
  ],
}

fs.writeFile('src/data.json', JSON.stringify(data), function (err) {
  if (err) {
    console.log(err)
  }
})