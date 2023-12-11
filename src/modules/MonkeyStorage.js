import { GM_getValue, GM_setValue } from '$';

export default class MonkeyStorage {
  /**
   * @param {String} key 
   * @returns {String|null}
   */
  static getItem(key) {
    return GM_getValue(key, null);
  }

  /**
   * @param {String} key 
   * @param {String} value 
   * @returns {void}
   */
  static setItem(key, value) {
    GM_setValue(key, value);
  }
}