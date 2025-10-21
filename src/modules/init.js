import { useStore } from '../store'
import { StoreHandler } from './StoreHandler'
import {
  archiveChordSheet,
  changeTitle,
  injectGtag,
  onSheetDomReady,
  redirect,
} from './utils'

export default function init() {
  redirect()
  injectGtag()
  const storeHandler = new StoreHandler().start()
  storeHandler.initKeyBindings()

  // 頁面動態讀取完成時觸發
  onSheetDomReady(() => {
    changeTitle()
    storeHandler.initState()
    const store = useStore()
    if (store.agreeToArchiveSheet) {
      archiveChordSheet()
    }
  })
}
