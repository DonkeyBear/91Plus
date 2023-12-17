import ChordSheetElement from './ChordSheetElement';
import ChordSheetDocument from './ChordSheetDocument';
import { StoreHandler } from './StoreHandler';

/** 若樂譜頁面為電腦版，跳轉至行動版 */
export function redirect() {
  const currentUrl = window.location.href;
  if (/\/song\//.test(currentUrl)) {
    const sheetId = currentUrl.match(/(?<=\/)\d+(?=\.)/)[0];
    const newUrl = `https://www.91pu.com.tw/m/tone.shtml?id=${sheetId}`;
    window.location.replace(newUrl);
  }
}

/** 引入 Google Analytics */
export function injectGtag() {
  const newScript = document.createElement('script');
  newScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-JF4S3HZY31';
  newScript.async = true;
  document.head.appendChild(newScript);
  newScript.onload = () => {
    // 此區塊由 Google Analytics 生成
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-JF4S3HZY31');
  };
}

/**
 * @typedef {object} Params
 * @prop {number} transpose
 * @prop {boolean} darkMode
 */
/**
 * 從 URL 取得參數
 * @returns {Params}
 */
export function getQueryParams() {
  const url = new URL(window.location.href);
  const params = {
    transpose: +url.searchParams.get('transpose'),
    darkMode: !!url.searchParams.get('darkmode'),
  };
  return params;
}

/** 將網頁標題替換為自訂格式 */
export function changeTitle() {
  const newTitle = $('#mtitle').text().trim();
  document.title = `${newTitle} | 91+`;
}

/** 發送請求至 API，雲端備份樂譜 */
export function archiveChordSheet() {
  const sheet = document.getElementById('tone_z');
  const chordSheetDocument = new ChordSheetDocument();
  try {
    const chordSheetElement = new ChordSheetElement(sheet);
    chordSheetElement.formatUnderlines();

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
    };
    chordSheetElement.unformatUnderlines();

    fetch('https://91-plus-plus-api.fly.dev/archive', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formBody),
    })
      .then((response) => {
        console.log('[91 Plus] 雲端樂譜備份成功：', response);
      })
      .catch((error) => {
        console.error('[91 Plus] 雲端樂譜備份失敗：', error);
      });
  } catch {
    console.warn('[91 Plus] 樂譜解析失敗，無法備份');
    fetch(
      `https://91-plus-plus-api.fly.dev/report?id=${chordSheetDocument.getId()}`
    );
  }
}

/** 初始化 MutationObserver */
export function initMutationObserver() {
  return new MutationObserver((records, observer) => {
    // 經過檢查，91 譜的動態讀取都會在一次 Mutation 裡完成
    // #tone_z 在動態讀取前就已經存在於 DOM 結構，並且不包含任何子元素
    // 所以將 #tone_z 的子元素數量作為動態讀取是否完成的依據
    // 如果已全數完成，則觸發 body 上的 mutation.done 事件
    const isMutationDone = !!document.querySelector('#tone_z').childElementCount;
    if (!isMutationDone) { return }
    $('body').trigger('mutation.done');
    observer.disconnect();
  }).observe(document.body, { childList: true, subtree: true });
}

/**
 * 當動態讀取完畢時執行 Callback
 * @param {Function} callback 
 */
export function onDomReady(callback) {
  $('body').on('mutation.done', callback);
}

export function handleEvents() {
  $('html').on('keydown', (event) => {
    const excludedTags = ['input'];
    const tagName = event.target.tagName.toLowerCase();
    if (excludedTags.includes(tagName)) { return }
    StoreHandler.handleKeydown(event.key);
  })
}

/**
 * 切換和弦譜旁顯示的和弦類型（91 譜原生）
 * @param {'guitar'|'ukulele'} instrument 
 */
export function switchInstrument(instrument) {
  switch (instrument) {
    case 'guitar': {
      $('.schord').trigger('click');
      break;
    }
    case 'ukulele': {
      $('.ukschord').trigger('click');
      break;
    }
    default: {
      $('.nsChord').trigger('click');
      break;
    }
  }
}