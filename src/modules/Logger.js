import { StoreHandler } from './StoreHandler'

/* eslint-disable no-console */
export default class Logger {
  static #storeHandler = null

  static init() {
    this.#storeHandler = new StoreHandler()
  }

  static log(...args) {
    console.log('[91 Plus]', ...args)
    if (!this.#storeHandler) {
      this.init()
    }
    this.#storeHandler.addLog('log', ...args)
  }

  static warn(...args) {
    console.warn('[91 Plus]', ...args)
    if (!this.#storeHandler) {
      this.init()
    }
    this.#storeHandler.addLog('warn', ...args)
  }

  static error(...args) {
    console.error('[91 Plus]', ...args)
    if (!this.#storeHandler) {
      this.init()
    }
    this.#storeHandler.addLog('error', ...args)
  }
}
