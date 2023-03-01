/**
 * Created by jiachenpan on 16/11/18.
 */

import XeUtils from 'xe-utils'

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  }
  return (
    d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
  )
}

// 格式化时间
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

// 格式化时间
export function timestampToTime(timestamp) {
// 时间戳为10位需*1000，时间戳为13位不需乘1000
// var date = new Date(timestamp * 1000);
  var date = new Date(timestamp)
  var Y = date.getFullYear() + '-'
  var M =
(date.getMonth() + 1 < 10
  ? '0' + (date.getMonth() + 1)
  : date.getMonth() + 1) + '-'
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  var h = date.getHours() + ':'
  var m = date.getMinutes() + ':'
  var s = date.getSeconds()
  return Y + M + D + h + m + s
// console.log(timestampToTime(1670145353)); //2022-12-04 17:15:53
}

// 时间戳转时间
export function setStringDate(time) {
  if (time === undefined || time === '') {
    return ''
  }
  const date = new Date(time)
  const y = date.getFullYear()
  const m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const d = date.getDate()
  const H = date.getHours()
  const M = date.getMinutes()
  const S = date.getSeconds()
  return `${y}-${m}-${d} ${H}:${M}:${S}`
}

// 拼接时间字符串
export function splicingDate(time) {
  if (time === undefined || time === null || time.length !== 14) {
    return ''
  }
  return time.substring(0, 4) + '-' +
    time.substring(4, 6) + '-' +
    time.substring(6, 8) + ' ' +
    time.substring(8, 10) + ':' +
    time.substring(10, 12) + ':' +
    time.substring(12, 14)
}

function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  }
  return pluralize(~~(between / 86400), ' day')
}

/* 数字 格式化*/

export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */

export function getByteLen(val) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/gi) != null) {
      len += 1
    } else {
      len += 0.5
    }
  }
  return Math.floor(len)
}

export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

export function param(json) {
  if (!json) return ''
  return cleanArray(Object.keys(json).map((key) => {
    if (json[key] === undefined) return ''
    return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
  })).join('&')
}

export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' +
      decodeURIComponent(search)
      	.replace(/"/g, '\\"')
      	.replace(/&/g, '","')
      	.replace(/=/g, '":"') +
      '"}')
}

export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach((property) => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export const pickerOptions = [
  {
    text: '今天',
    onClick(picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(start.getTime())
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近一周',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }
]

export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  }
  return new Date(new Date().toDateString())
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 */

export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */

export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */

export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 深层数据的集合进行有机合并
 * @param objs 需要合并的 对象集合 （后面的覆盖前面的参数）
 * @returns {{}}
 */

export const objDeepMerge = (...objs) => {
  const res = {}
  const combine = (opt) => {
    for (const prop in opt) {
      // eslint-disable-next-line
      if (opt.hasOwnProperty(prop)) {
        if (Object.prototype.toString.call(opt[prop]) === '[object Object]') {
          res[prop] = objDeepMerge(res[prop], opt[prop])
        } else {
          res[prop] = opt[prop]
        }
      }
    }
  }
  objs.map((opts) => {
    combine(opts)
  })
  return res
}

// 数值千分位分隔符、小数点
export function commafyFn(val, options = {}) {
  let num = parseFloat(val)
  num = isNaN(num) ? 0 : num
  return XeUtils.commafy(num, {
    digits: String.prototype.includes.call(num, '.') ? 2 : 0,
    ...options
  })
}

// 保留两位小数
export function keepTwoDecimal(num) {
  let result = parseFloat(num)
  if (isNaN(result)) { return 0 }
  result = Math.round(result * 100) / 100
  return result
}

// 下载文件和导出excel的方法
export function exportExcel(data, name) {
  if (!data) {
    return
  }
  const url = window.URL.createObjectURL(new Blob([ data ]))
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', name)

  document.body.appendChild(link)
  link.click()
  window.URL.revokeObjectURL(url)
}
