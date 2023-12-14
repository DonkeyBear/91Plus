import { useStore } from '../store';
import { StoreHandler } from './StoreHandler';
import {
  redirect,
  injectGtag,
  initMutationObserver,
  changeTitle,
  onDomReady,
  archiveChordSheet
} from './utils';

export default function init() {
  redirect();
  injectGtag();
  initMutationObserver();
  const storeHandler = new StoreHandler().start();

  // 頁面動態讀取完成時觸發
  onDomReady(() => {
    changeTitle();
    storeHandler.initState();
    const store = useStore();
    if (store.agreeToArchiveSheet) {
      archiveChordSheet();
    }
  });
}