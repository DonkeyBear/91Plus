import { GM_getValue, GM_setValue } from '$';

export default class MonkeyStorage {
  /**
   * @param {String} key
   * @returns {String|null}
   */
  static getItem(key) {
    if (GM_getValue) {
      return GM_getValue(key, null);
    } else {
      return localStorage.getItem(key);
    }
  }

  /**
   * @param {String} key
   * @param {String} value
   * @returns {void}
   */
  static setItem(key, value) {
    if (GM_setValue) {
      GM_setValue(key, value);
    } else {
      localStorage.setItem(key, value);
    }
  }
}