// soundcloud-open-in-app-bookmarklet
var a = window.location.href.replace(/(https?:\/\/)?.*?soundcloud.com(.*)/, 'https://soundcloud-open-in-app.herokuapp.com$2');
if (a) {
  window.location = a;
}
