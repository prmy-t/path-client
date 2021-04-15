import Vue from "vue";
import Cookie from "js-cookie";

Vue.prototype.$setCookie = (key, value) => {
  Cookie.set(key, value);
};

Vue.prototype.$getCookie = key => {
  return Cookie.get(key);
};

Vue.prototype.$removeCookie = key => {
  return Cookie.remove(key);
};
