import { defineStore } from 'pinia';
import Chord from './modules/Chord';
import MonkeyStorage from './modules/MonkeyStorage';
import { parse, stringify } from 'zipson';

export const useStore = defineStore('store', {
  state() {
    return {
      // ####################
      // 元件相關狀態
      // ####################
      isDarkMode: false,
      isToolbarsShow: false,
      isPopupShow: {
        sheet: false,
        settings: false,
        menu: false
      },
      // ####################
      // 偏好設定相關狀態
      // ####################
      agreeToArchiveSheet: true,
      // ####################
      // 譜面相關狀態
      // ####################
      transpose: 0,
      /** 在 `StoreHandler` 裡賦值 */
      originalCapo: 0,
      /** 在 `StoreHandler` 裡賦值，HTML 格式 */
      originalKey: ''
    }
  },
  persist: {
    key: 'preferences',
    storage: MonkeyStorage,
    deserialize: parse,
    serialize: stringify,
    paths: ['isDarkMode', 'agreeToArchiveSheet'],
    beforeRestore() {
      console.log('[91 Plus] 讀取偏好設置中')
    },
    afterRestore() {
      console.log('[91 Plus] 偏好設置讀取完畢')
    },
    debug: true
  },
  getters: {
    currentCapo() {
      return this.originalCapo + this.transpose;
    },
    currentKey() {
      return new Chord(this.originalKey).transpose(-this.transpose).toFormattedString();
    }
  },
  actions: {
    toggleToolbars() {
      if (this.isToolbarsShow) {
        // 關閉 Toolbars 時，把所有的 Modal 跟 Popup 一起關掉
        this.closePopups();
      }
      this.isToolbarsShow = !this.isToolbarsShow;
    },
    closePopups() {
      for (const popup in this.isPopupShow) {
        this.isPopupShow[popup] = false;
      }
    },
    /** @param {'sheet'|'settings'|'menu'} name */
    openPopup(name) {
      for (const popup in this.isPopupShow) {
        if (popup === name) {
          this.isPopupShow[popup] = !this.isPopupShow[popup];
        } else {
          this.isPopupShow[popup] = false;
        }
      }
    },
    plusTranspose(numberToPlus) {
      let newTranspose = this.transpose + numberToPlus;
      const newCapo = this.originalCapo + newTranspose;
      if (newCapo === 12 || newCapo === -12) {
        newTranspose = -this.originalCapo;
      }
      this.transpose = newTranspose;
    }
  }
})