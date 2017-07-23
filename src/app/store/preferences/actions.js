import store from 'store/dist/store.modern';

export const SET_PREFERENCES = 'SET_PREFERENCES';

const setOption = (key, val) => {
  try {
    store.set(key, val);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export default {
  setPreference: (preferences: Object) => (dispatch: Function) => {
    Object.keys(preferences).forEach(key => setOption(key, preferences[key]));

    dispatch({
      type: SET_PREFERENCES,
      preferences,
    });
  },
};
