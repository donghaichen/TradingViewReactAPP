import './config';

const Event = {
  EVENT: {},
  emit (eventName, ...resp) {
    if (this.EVENT[eventName] && Object.prototype.toString.call(this.EVENT[eventName]) === "[object Array]") {
      for (let i = 0, fn; fn = this.EVENT[eventName][i++];) {
        fn(...resp)
      }
    }
  },
  on (name, fn) {
    if (this.EVENT[name] && Object.prototype.toString.call(this.EVENT[name]) === "[object Array]") {
      this.EVENT[name].push(fn)
    } else {
      this.EVENT[name] = [fn]
    }
  },
  off (name) {
    this.EVENT[name] = null
  },
  uuid(){
      var d = new Date().getTime();
      if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
          d += performance.now(); //use high-precision timer if available
      }
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      }).toUpperCase();
  },
    getQueryVariable(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
	console.clear()
    }

}

export default Event
