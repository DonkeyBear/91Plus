import { useStore } from '../store'
import Logger from './Logger'
import MonkeyStorage from './MonkeyStorage'
import { StoreHandler } from './StoreHandler'
import {
  archiveChordSheet,
  changeTitle,
  handleEvents,
  initMutationObserver,
  injectGtag,
  onDomReady,
  redirect,
} from './utils'

export default function init() {
  Logger.log(MonkeyStorage.getStorageType())
  redirect()
  injectGtag()
  initMutationObserver()
  handleEvents()
  const storeHandler = new StoreHandler().start()

  // 頁面動態讀取完成時觸發
  onDomReady(() => {
    changeTitle()
    storeHandler.initState()
    const store = useStore()
    if (store.agreeToArchiveSheet) {
      archiveChordSheet()
    }
  })
}
