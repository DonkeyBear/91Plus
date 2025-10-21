import { onKeyStroke, useActiveElement } from '@vueuse/core'
import { watch } from 'vue'
import { useStore } from '../store'
import ChordSheetElement from './ChordSheetElement'
import { getQueryParams } from './utils'

/** 在 Vue 實例之外，只有這個 Class 會直接跟 Store 打交道，包括監聽與賦值 */
export class StoreHandler {
  // 命 `#store` 為私有屬性，在建立實例時再賦值，避免衝突
  #store

  constructor() {
    this.#store = useStore()
  }

  /** 從 DOM 取得 Store 所需的初始化狀態 */
  initStateFromDom() {
    // 儲存初始 Capo 和調號
    const capoSelected = $('.capo .select').eq(0).text().trim()
    const originalCapo = +capoSelected.split(/\s*\/\s*/)[0] // CAPO
    const originalKey = capoSelected.split(/\s*\/\s*/)[1] // 調
    this.#store.originalCapo = originalCapo
    this.#store.originalKey = originalKey

    // 儲存初始字型大小和行高，單位為 px
    const fontSize = +$('#tone_z').css('font-size').match(/^\d+/)[0]
    const lineHeight = +$('#tone_z > p').css('line-height').match(/^\d+/)[0]
    this.#store.originalFontSize = fontSize
    this.#store.originalLineHeight = lineHeight

    // 依照 URL 參數進行移調
    const params = getQueryParams()
    if (params.transpose) {
      this.#store.transpose = params.transpose
    }
  }

  /** 初始化監聽器 */
  initWatchers() {
    this.#watchTranspose()
    this.#watchFontSize()
  }

  /** 當 `#store.transpose` 變動時，將譜面上的和弦進行移調 */
  #watchTranspose() {
    watch(() => this.#store.transpose, (newValue, oldValue) => {
      ChordSheetElement.transposeSheet((newValue - oldValue) % 12)
    })
  }

  #watchFontSize() {
    watch(() => this.#store.fontSizeDelta, (newValue) => {
      const oFontSize = this.#store.originalFontSize
      const oLineHeight = this.#store.originalLineHeight
      $('#tone_z').css('font-size', `${oFontSize + newValue}px`)
      $('#tone_z > p').css('line-height', `${oLineHeight + newValue}px`)
    })
  }

  initKeyBindings() {
    const activeElement = useActiveElement()

    function isInputFocused() {
      return activeElement.value?.tagName === 'INPUT' || activeElement.value?.tagName === 'TEXTAREA'
    }

    /**
     * @param {Function} func
     * @returns {Function} 只在輸入框未被聚焦時才執行的函式
     */
    function whenInputNotFocused(func) {
      return () => {
        if (!isInputFocused()) {
          func()
        }
      }
    }

    onKeyStroke(' ', whenInputNotFocused(() => {
      this.#store.toggleToolbars()
    }))
    onKeyStroke('/', whenInputNotFocused(() => {
      if (!this.#store.isToolbarsShow) {
        this.#store.toggleToolbars()
        this.#store.closePopups()
      }
      setTimeout(() => {
        $('#plus91-header input')?.get(0)?.focus()
      })
    }))
    onKeyStroke('Escape', whenInputNotFocused(() => {
      if (this.#store.isToolbarsShow) {
        this.#store.toggleToolbars()
      }
    }))
    onKeyStroke('ArrowLeft', whenInputNotFocused(() => {
      if (this.#store.isPopupShow.sheet) {
        this.#store.plusTranspose(-1)
      }
    }))
    onKeyStroke('ArrowRight', whenInputNotFocused(() => {
      if (this.#store.isPopupShow.sheet) {
        this.#store.plusTranspose(1)
      }
    }))
    onKeyStroke('ArrowDown', whenInputNotFocused(() => {
      if (this.#store.isPopupShow.sheet) {
        this.#store.transpose = 0
      }
    }))
  }
}
