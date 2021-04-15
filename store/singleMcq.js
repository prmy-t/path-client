import Cookie from "js-cookie";
import axios from "axios";
const defaultState = {
  oneMcq: {}
};

export const state = () => ({ ...defaultState });

export const mutations = {
  SET_ONEMCQ(state, oneMcq) {
    state.oneMcq = oneMcq;
  }
};

export const actions = {
  // methods
  reVerifyMcq({ commit }) {
    const oneMcq = Cookie.get("oneMcq");
    // console.log("from default" + oneMcq);
    axios.defaults.headers.common.Authorization = `Bearer ${oneMcq}`;

    if (oneMcq != null && oneMcq != "null") {
      commit("SET_ONEMCQ", JSON.parse(oneMcq));
    }
  }
};
