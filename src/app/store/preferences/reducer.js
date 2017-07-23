// @flow

import type { Preferences } from 'common/types';
import store from 'store/dist/store.modern';

import { SET_PREFERENCES } from './actions';
import * as keys from './keys';

function getKey<D: any>(key: string, defaultVal: D): ?D {
  try {
    const result = store.get(key);
    return result === undefined ? defaultVal : result;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

const initialState: Preferences = Object.keys(keys).reduce(
  (res, key) =>
    Object.assign(res, {
      [key]: getKey(keys[key], res[key]),
    }),
  {
    livePreviewEnabled: true,
    prettifyOnSaveEnabled: false,
    lintEnabled: false,
    instantPreviewEnabled: false,
    fontSize: 14,
    fontFamily: '',
    clearConsoleEnabled: false,
  },
);

export default (state: Preferences = initialState, action): Preferences => {
  switch (action.type) {
    case SET_PREFERENCES:
      return {
        ...state,
        ...action.preferences,
      };
    default: {
      return state;
    }
  }
};
