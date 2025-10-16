import { GM_getValue, GM_setValue } from '$'

export default class MonkeyStorage {
  /** @returns {'Greasemonkey'|'LocalStorage'} 使用的儲存類型 */
  static getStorageType() {
    if (GM_getValue && GM_setValue) {
      return 'Greasemonkey'
    }
    else {
      return 'LocalStorage'
    }
  }

  /**
   * @param {string} key
   * @returns {string | null} 儲存的值，若無則回傳 null
   */
  static getItem(key) {
    const storageType = this.getStorageType()
    switch (storageType) {
      case 'Greasemonkey':
        return GM_getValue(key, null)
      case 'LocalStorage':
        return localStorage.getItem(key)
      default:
        return null
    }
  }

  /**
   * @param {string} key
   * @param {string} value
   * @returns {void}
   */
  static setItem(key, value) {
    const storageType = this.getStorageType()
    switch (storageType) {
      case 'Greasemonkey':
        GM_setValue(key, value)
        break
      case 'LocalStorage':
        localStorage.setItem(key, value)
        break
      default:
        break
    }
  }
}
