import { watch } from 'vue';
import { useStore } from '../store';
import ChordSheetElement from './ChordSheetElement';
import { getQueryParams } from './utils';

/** 在 Vue 實例之外，只有這個 Class 會直接跟 Store 打交道，包括監聽與賦值 */
export class StoreHandler {
  // 命 `#store` 為私有屬性，在建立實例時再賦值，避免衝突
  #store;

  constructor() {
    this.#store = useStore();
  }

  initState() {
    // 儲存初始 Capo 和調號
    const capoSelected = $('.capo .select').eq(0).text().trim();
    const originalCapo = +capoSelected.split(/\s*\/\s*/)[0]; // CAPO
    const originalKey = capoSelected.split(/\s*\/\s*/)[1]; // 調
    this.#store.originalCapo = originalCapo;
    this.#store.originalKey = originalKey;

    // 依照 URL 參數進行移調
    const params = getQueryParams();
    if (params.transpose) { this.#store.transpose = params.transpose }
  }

  start() {
    this.#watchTranspose();
    return this;
  }

  /** 當 `#store.transpose` 變動時，將譜面上的和弦進行移調 */
  #watchTranspose() {
    watch(() => {
      return this.#store.transpose;
    }, (newValue, oldValue) => {
      ChordSheetElement.transposeSheet(newValue - oldValue);
    });
  }
}