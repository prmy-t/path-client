import Cookie from "js-cookie";
import axios from "axios";
const defaultState = {
  currentMode: "reading"
};

export const state = () => ({ ...defaultState });

export const mutations = {
  SET_CURRENTMODE(state, currentMode) {
    state.currentMode = currentMode;
  }
};

export const actions = {
  // methods
  reVerify({ commit }) {
    const currentMode = Cookie.get("currentMode");

    axios.defaults.headers.common.Authorization = `Bearer ${currentMode}`;

    if (
      currentMode != null &&
      currentMode != "null" &&
      currentMode === "reading"
    ) {
      commit("SET_CURRENTMODE", "reading");
    }
    if (
      currentMode != null &&
      currentMode != "null" &&
      currentMode === "quiz"
    ) {
      commit("SET_CURRENTMODE", "quiz");
    }
  }
};
