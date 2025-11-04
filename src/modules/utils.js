import { unsafeWindow } from '$'
import ChordSheetDocument from './ChordSheetDocument'
import ChordSheetElement from './ChordSheetElement'

/** 若樂譜頁面為電腦版，跳轉至行動版 */
export function redirect() {
  const currentUrl = window.location.href
  if (/\/song\//.test(currentUrl)) {
    const sheetId = currentUrl.match(/(?<=\/)\d+(?=\.)/)[0]
    const newUrl = `https://www.91pu.com.tw/m/tone.shtml?id=${sheetId}`
    window.location.replace(newUrl)
  }
}

/**
 * @typedef {object} Params
 * @property {number} transpose 移調值（-11 ~ 11）
 * @property {boolean} darkMode 是否啟用深色模式
 */
/**
 * 從 URL 取得參數
 * @returns {Params} 參數物件
 */
export function getQueryParams() {
  const url = new URL(window.location.href)
  const params = {
    transpose: +url.searchParams.get('transpose'),
    darkMode: !!url.searchParams.get('darkmode'),
  }
  return params
}

/** 將網頁標題替換為自訂格式 */
export function changeTitle() {
  const newTitle = $('#mtitle').text().trim()
  document.title = `${newTitle} | 91+`
}

/** 發送請求至 API，雲端備份樂譜 */
export function archiveChordSheet() {
  const sheet = document.getElementById('tone_z')
  const chordSheetDocument = new ChordSheetDocument()
  try {
    const chordSheetElement = new ChordSheetElement(sheet)
    chordSheetElement.formatUnderlines()

    const formBody = {
      id: chordSheetDocument.getId(),
      title: chordSheetDocument.getTitle(),
      key: chordSheetDocument.getKey(),
      play: chordSheetDocument.getPlay(),
      capo: chordSheetDocument.getCapo(),
      singer: chordSheetDocument.getSinger(),
      composer: chordSheetDocument.getComposer(),
      lyricist: chordSheetDocument.getLyricist(),
      bpm: chordSheetDocument.getBpm(),
      sheet_text: chordSheetDocument.getSheetText(),
    }
    chordSheetElement.unformatUnderlines()

    fetch('https://91-plus-plus-api.fly.dev/archive', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formBody),
    })
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log('[91 Plus] 雲端樂譜備份成功：', response)
      })
      .catch((error) => {
        console.error('[91 Plus] 雲端樂譜備份失敗：', error)
      })
  }
  catch {
    console.warn('[91 Plus] 樂譜解析失敗，無法備份')
    fetch(
      `https://91-plus-plus-api.fly.dev/report?id=${chordSheetDocument.getId()}`,
    )
  }
}

/**
 * 監聽樂譜內容的 DOM 變化，當動態讀取完成時觸發 Callback
 * @param {Function} callback
 * @returns {MutationObserver} 監聽器實例
 */
export function onSheetDomReady(callback) {
  return new MutationObserver((_records, observer) => {
    // 經過檢查，91 譜的動態讀取都會在一次 Mutation 裡完成
    // #tone_z 在動態讀取前就已經存在於 DOM 結構，並且不包含任何子元素
    // 所以將 #tone_z 的子元素數量作為動態讀取是否完成的依據
    const isMutationDone = !!document.querySelector('#tone_z').childElementCount
    if (isMutationDone) {
      observer.disconnect()
      callback()
    }
  }).observe(document.body, { childList: true, subtree: true })
}

/**
 * 切換和弦譜旁顯示的和弦類型（91 譜原生）
 * @param {'guitar'|'ukulele'} instrument
 */
export function switchInstrument(instrument) {
  switch (instrument) {
    case 'guitar': {
      $('.schord').trigger('click')
      break
    }
    case 'ukulele': {
      $('.ukschord').trigger('click')
      break
    }
    default: {
      $('.nsChord').trigger('click')
      break
    }
  }
}

/**
 * 取得 91 譜的和弦圖相關資料
 * @returns {object} 和弦圖資料
 */
export function getChordShapes() {
  const thisWindow = unsafeWindow ?? window
  const chordShapes = thisWindow?.chord_shapes ?? {}
  return chordShapes
}

/**
 * 取得當前譜面上所有用到的和弦名稱
 * @returns {string[]} 和弦名稱陣列
 */
export function getChordList() {
  const chordList = []
  $('#tone_z .tf').each(function () {
    const chordName = $(this).text().trim()
    if (chordName) {
      chordList.push(chordName)
    }
  })
  return [...new Set(chordList)]
}

/**
 * 將和弦名稱轉換為 `getChordShapes()` 的鍵值格式
 * @param {string} chordName
 * @returns {string} 轉換後的和弦名稱
 */
export function convertChordName(chordName) {
  const root = chordName.match(/^[A-G]#?/)[0]
  const rest = chordName.replace(/^[A-G]#?/, '')
  return `${rest} ${root}`
}
