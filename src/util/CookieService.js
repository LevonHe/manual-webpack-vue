const CookieService = {
  getCookie(key) {
    const data = document.cookie;
    let startIndex = data.indexOf(key + '=');
    if (startIndex > -1) {
      startIndex = startIndex + key.length + 1;
      let endIndex = data.indexOf(';', startIndex);
      endIndex = endIndex < 0 ? data.length : endIndex;
      return decodeURIComponent(data.substring(startIndex, endIndex));
    } else {
      return '';
    }
  },
  setCookie(key, value, time) {
    const times = time;
    const cur = new Date();
    cur.setTime(cur.getTime() + times * 24 * 3600 * 1000);
    document.cookie =
      key + '=' + encodeURIComponent(value) + ';expires=' + (times ? cur.toUTCString() : '') + ';path=/';
  },
  delCookie(key) {
    const data = this.getCookie(key);
    if (!data) {
      return;
    }
    const exp = new Date();
    exp.setTime(exp.getTime() - 1);
    document.cookie = key + '=' + encodeURIComponent(data) + ';expires=' + exp.toUTCString();
    document.cookie = key + '=' + encodeURIComponent(data) + ';expires=' + exp.toUTCString() + ';path=/';
    document.cookie = key + '=' + encodeURIComponent(data) + ';expires=' + exp.toUTCString() + ';path=/index';
  },
};

export default CookieService;
