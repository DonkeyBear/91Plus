import Chord from './Chord'

/** 用於修改樂譜 */
export default class ChordSheetElement {
  /** @param {HTMLElement} chordSheetElement  */
  constructor(chordSheetElement) {
    this.chordSheetElement = chordSheetElement
  }

  /**
   * 將 Header 和譜上的和弦移調，並實質修改於 DOM
   * @param {number} delta 相對於當前調的移調值
   */
  static transposeSheet(delta) {
    // 修改譜上的和弦
    $('#tone_z .tf').each(function () {
      const chord = new Chord($(this).text())
      const newChordHTML = chord.transpose(-delta).toFormattedString()
      $(this).html(newChordHTML)
    })
  }

  /** @returns {ChordSheetElement} */
  formatUnderlines() {
    const underlineEl = this.chordSheetElement.querySelectorAll('u')
    const doubleUnderlineEl = this.chordSheetElement.querySelectorAll('abbr')
    underlineEl.forEach((el) => { el.innerText = `{_${el.innerText}_}` })
    doubleUnderlineEl.forEach((el) => { el.innerText = `{=${el.innerText}=}` })
    return this
  }

  /** @param {NodeList} nodeList */
  #unformat(nodeList) {
    nodeList.forEach((el) => {
      el.innerHTML = el.innerText
        .replaceAll(/\{_|\{=|=\}|_\}/g, '')
        .replaceAll(/[a-z0-9#/]+/gi, /* html */`<span class="tf">$&</span>`)
    })
  }

  /** @returns {ChordSheetElement} */
  unformatUnderlines() {
    const underlineEl = this.chordSheetElement.querySelectorAll('u')
    const doubleUnderlineEl = this.chordSheetElement.querySelectorAll('abbr')
    this.#unformat(underlineEl)
    this.#unformat(doubleUnderlineEl)
    return this
  }
}
