import { defineStore } from 'pinia'
import { parse, stringify } from 'zipson'
import Chord from './modules/Chord'
import MonkeyStorage from './modules/MonkeyStorage'

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
        chord: false,
        font: false,
        settings: false,
        menu: false,
        // 選單內功能
        hotkey: false,
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
      originalKey: '',
      /** `font-size` 的變化值 */
      fontSizeDelta: 0,
      /** 在 `StoreHandler` 裡賦值，單位為 px */
      originalFontSize: 0,
      /** 在 `StoreHandler` 裡賦值，單位為 px */
      originalLineHeight: 0,
    }
  },
  persist: {
    key: 'plus91-preferences',
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
    debug: true,
  },
  getters: {
    currentCapo() {
      return this.originalCapo + this.transpose
    },
    currentKey() {
      return new Chord(this.originalKey).transpose(-this.transpose).toFormattedString()
    },
  },
  actions: {
    toggleToolbars() {
      if (this.isToolbarsShow) {
        // 關閉 Toolbars 時，把所有的 Modal 跟 Popup 一起關掉
        this.closePopups()
      }
      else {
        // 開啟 Toolbars 時，將移調 Popup 一同打開
        this.isPopupShow.sheet = true
      }
      this.isToolbarsShow = !this.isToolbarsShow
    },
    closePopups() {
      for (const popup in this.isPopupShow) {
        this.isPopupShow[popup] = false
      }
    },
    /** @param {'sheet'|'chord'|'font'|'settings'|'menu'|'hotkey'} name */
    togglePopup(name) {
      for (const popup in this.isPopupShow) {
        if (popup === name) {
          this.isPopupShow[popup] = !this.isPopupShow[popup]
        }
        else {
          this.isPopupShow[popup] = false
        }
      }
    },
    plusTranspose(numberToPlus) {
      let newTranspose = this.transpose + numberToPlus
      const newCapo = this.originalCapo + newTranspose
      if (newCapo === 12 || newCapo === -12) {
        newTranspose = -this.originalCapo
      }
      this.transpose = newTranspose
    },
  },
})
