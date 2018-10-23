import React, { Component } from 'react';
import UDFCompatibleDatafeedBase from './bundle.js';
import './App.css';
// this.widget.chart() && this.widget.chart().setResolution(e)
let widget = null

class App extends Component {
  state = {
    interval: {
      Realtime: "1R",
      M1: "1",
      M3: "3",
      M5: "5",
      M15: "15",
      M30: "30",
      H1: "60",
      H4: "240",
      H6: "360",
      D1: "1D",
      INDICATORS: "indicators"
    },
    activeCycle: '1'
  }

  componentDidMount () {
    window.TradingView.onready(() => {
      widget = new window.TradingView.widget({
        fullscreen: true,
  			symbol: 'BTC/USDT',
        timezone: "Asia/Shanghai", // 时区api参考https://b.aitrade.ga/books/tradingview/book/Symbology.html#timezone
  			interval: "1", // 1
  			container_id: "tv_chart_container",
  			datafeed: new UDFCompatibleDatafeedBase("https://demo_feed.tradingview.com"),
  			library_path: "/charting_library/",
  			locale: "zh",
        //drawings_access: { type: 'black', tools: [ { name: "Regression Trend" } ] },
        disabled_features: [
					//用户本地存储
					"use_localstorage_for_settings",
					//左边工具栏
					"header_saveload",
					// 顶部工具栏
					"control_bar",
					//周围边框
					"border_around_the_chart",
					//底部时间栏目
					"timeframes_toolbar",
					//k线与销量分开
					"volume_force_overlay",
					//图表右键菜单
					// "pane_context_menu",
					//搜索
					"header_symbol_search",
					"symbol_search_hot_key",
					//左右箭头
					"header_undo_redo",
					//compare
					"header_compare",
					//图表类型
					"header_chart_type",
					//照相机
					"header_screenshot",
					"header_resolutions",
					// "header_settings",
					"header_indicators"
				], //禁用功能
        enabled_features: [
          "dont_show_boolean_study_arguments",
					"move_logo_to_main_pane",
					"hide_last_na_study_output",
					"legend_context_menu",
        ],//开启功能
        theme:"Dark", //背景颜色
        toolbar_bg: '#222831', //工具栏颜色
        header_resolutions: true,
        loading_screen: {
					backgroundColor: '#162431',
					foregroundColor: '#162431'
				}, //加载时的背景颜色
        custom_css_url: "chart.css",
  			// preset: "mobile",
        studies_overrides: {
          "volume.volume.color.0": "#ff5353",
          "volume.volume.color.1": "#00b07c",
          "volume.volume.transparency": "53",
          "volume.show ma": true,
          "volume.volume ma.plottype": "line"
        },
        overrides: {
          // "volumePaneSize": "tiny",
					// 网格
					'paneProperties.vertGridProperties.style': 2,
					'paneProperties.horzGridProperties.color': '#162431',
					'paneProperties.vertGridProperties.color': '#162431',
					//隐藏图例
					"paneProperties.legendProperties.showLegend": false,
					"scalesProperties.showLeftScale": false,

        },
        type: "bitcoin"
      })

      widget && widget.onChartReady && widget.onChartReady(() => {
				widget.chart().createStudy('MACD', false, false, [14, 30, "close", 9]); //MACD
        widget.chart().createStudy('Moving Average', false, false, [7], null, {'Plot.linewidth': 2, 'Plot.color': '#2ba7d6'})
        widget.chart().createStudy('Moving Average', false, false, [30], null, {'Plot.linewidth': 2, 'Plot.color': '#de9f66'})
      })
    })
  }

  changeInterval (cycle) {
    if (cycle === '1R') {
      widget.setSymbol('ETH/USDT', 1, () => {
        console.log('切换产品成功了???')
      })
    } else if (cycle === 'indicators') {
      // 打开指标面板
      widget.chart().executeActionById('insertIndicator')
    } else {
      widget.chart().setResolution(cycle)
      this.setState({ activeCycle: cycle })
    }
  }

  render () {
    const { interval, activeCycle } = this.state
    return (
      <div className="App">
        <div className="interval">
          {Object.keys(interval).map(item => (
            <div
              key={item}
              onClick={this.changeInterval.bind(this, interval[item])}
              className={activeCycle === interval[item] ? 'active' : ''}
            >
              {item}
            </div>
          ))}
        </div>
        <div id="tv_chart_container"></div>
      </div>
    );
  }
}

export default App;
