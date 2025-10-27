import { useStore } from '../store'
import { StoreHandler } from './StoreHandler'
import {
  archiveChordSheet,
  changeTitle,
  onSheetDomReady,
  redirect,
} from './utils'

export default function init() {
  redirect()
  const storeHandler = new StoreHandler()
  storeHandler.initWatchers()
  storeHandler.initKeyBindings()

  // 頁面動態讀取完成時觸發
  onSheetDomReady(() => {
    changeTitle()
    storeHandler.initStateFromDom()
    const store = useStore()
    if (store.agreeToArchiveSheet) {
      archiveChordSheet()
    }
  })
}
