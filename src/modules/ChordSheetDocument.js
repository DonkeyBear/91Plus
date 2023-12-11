/** 用於取得樂譜相關資訊 */
export default class ChordSheetDocument {
  constructor () {
    this.el = {
      mtitle: document.getElementById('mtitle'),
      tkinfo: document.querySelector('.tkinfo'),
      capoSelect: document.querySelector('.capo .select'),
      tinfo: document.querySelector('.tinfo'),
      tone_z: document.getElementById('tone_z')
    };
  }

  getId () {
    const urlParams = new URLSearchParams(window.location.search);
    return Number(urlParams.get('id'));
  }

  getTitle () {
    return this.el.mtitle.innerText.trim();
  }

  getKey () {
    const match = this.el.tkinfo?.innerText.match(/(?<=原調：)\w*/);
    return match ? match[0].trim() : '';
  }

  getPlay () {
    const match = this.el.capoSelect?.innerText.split(/\s*\/\s*/);
    return match ? match[1].trim() : '';
  }

  getCapo () {
    const match = this.el.capoSelect?.innerText.split(/\s*\/\s*/);
    return match ? Number(match[0]) : 0;
  }

  getSinger () {
    const match = this.el.tinfo?.innerText.match(/(?<=演唱：).*(?=\n|$)/);
    return match ? match[0].trim() : '';
  }

  getComposer () {
    const match = this.el.tinfo?.innerText.match(/(?<=曲：).*?(?=詞：|$)/);
    return match ? match[0].trim() : '';
  }

  getLyricist () {
    const match = this.el.tinfo?.innerText.match(/(?<=詞：).*?(?=曲：|$)/);
    return match ? match[0].trim() : '';
  }

  getBpm () {
    const match = this.el.tkinfo?.innerText.match(/\d+/);
    return match ? Number(match[0]) : 0;
  }

  getSheetText () {
    const formattedChordSheet = this.el.tone_z.innerText
      .replaceAll(/\s+?\n/g, '\n')
      .replaceAll('\n\n', '\n')
      .trim()
      .replaceAll(/\s+/g, (match) => { return `{%${match.length}%}` });
    return formattedChordSheet;
  }
}
