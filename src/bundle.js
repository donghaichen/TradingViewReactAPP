import socket from './socket.js';
import Event from './event.js'
let historyTime = 0 // 历史数据 第一条数据的 时间撮  往前加载历史数据需要 这个时间撮
let lastResolution = null // 上一次的 K线周期
let lastSymbol = null

export default class UDFCompatibleDatafeedBase {
  onReady (callback) {
    callback(this._configuration)
  }



 getSendSymbolName (symbolName) {
   return symbolName
 }

  resolveSymbol (symbolName, onResolve, onError) {
    onResolve({
      "name": symbolName,
      "timezone": "Asia/Shanghai",
      "pricescale": Math.pow(10, Event.getQueryVariable('precision_price')),
      "minmov": 1,
      "minmov2": 0,
      "volume_precision": Event.getQueryVariable('precision_amout'),
      "ticker": symbolName,
      "exchange":"",
      "description": "",
      "session": "24x7",
      "type": "bitcoin",
      "has_intraday": true,
      "intraday_multipliers": ['1', '3', '5', '15', '30', '60','120', '240', '360', '1D'],
      "has_weekly_and_monthly": false,
      "has_no_volume": false,
      "regular_session": "24x7"
    })
  }

  getApiTime (resolution) {
    switch (resolution) {
      case '1':
        return 'M1'
      case '5':
        return 'M5'
      case '15':
        return 'M15'
      case '30':
        return 'M30'
      case '60':
        return 'H1'
      case '120':
        return 'H2'
      case '240':
        return 'H4'
      case '360':
        return 'H6'
      case '1D':
        return 'D1'
      default:
        return 'M1'
    }
  }

  getBars (symbolInfo, resolution, rangeStartDate, rangeEndDate, onResult, onError) {
      let history = true
      if (!historyTime || (resolution !== lastResolution) || lastSymbol !== symbolInfo.name) {
        // 如果更换了k线周期  或者 第一次请求 历史数据 请求历史数据的时间撮 轨道现在
        history = false
        lastSymbol = symbolInfo.name
        historyTime = window.parseInt((Date.now() / 1000))
      }
      socket.openSocket({
        args: [`candle.${this.getApiTime(resolution)}.${this.getSendSymbolName(symbolInfo.name)}`, 1441, historyTime],
        cmd: 'req',
        id: socket.uuid
      }, `candle.${this.getApiTime(resolution)}.${this.getSendSymbolName(symbolInfo.name)}`, history)
      Event.off('data')
      var storage = window.localStorage
      if (resolution === 'D')
      {
          resolution = 5
      }
      storage['resolution'] = resolution

      Event.on('data', data => {
        if (data.data && Array.isArray(data.data)) {
          lastResolution = resolution
          let meta = {noData: false}
          const bars = []
          if (data.data.length) {
            historyTime = data.data[0].id - 1
            for (let i = 0; i < data.data.length; i += 1) {
              bars.push({
                time: data.data[i].id * 1000,
                close: data.data[i].close,
                open: data.data[i].open,
                high: data.data[i].high,
                low: data.data[i].low,
                volume: data.data[i].count
              })
            }
          } else {
            meta = {noData: true}
          }
          onResult(bars, meta)
        }
      })
  }

  subscribeBars (symbolInfo, resolution, onTick, listenerGuid, onResetCacheNeededCallback) {
    Event.off('realTime')
    Event.on('realTime', data => {
      if (Object.prototype.toString.call(data) === '[object Object]' && data.hasOwnProperty('open')) {
        onTick({
          time: data.id * 1000,
          close: data.close,
          open: data.open,
          high: data.high,
          low: data.low,
          volume: data.count
        })
      }
    })
  }

  unsubscribeBars (listenerGuid) {
    // listenerGuid === BTC/USTD_60
  }
}

