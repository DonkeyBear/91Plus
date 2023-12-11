/** 用於操作和弦字串 */
export default class Chord {
  static sharps = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  static flats = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

  /** @param {string} chordString  */
  constructor (chordString) {
    this.chordString = chordString;
  }

  /**
   * @param {number} delta
   * @returns {Chord}
   */
  transpose (delta) {
    this.chordString = this.chordString.replaceAll(/[A-G][#b]?/g, (note) => {
      const isSharp = Chord.sharps.includes(note);
      const scale = isSharp ? Chord.sharps : Chord.flats;
      const noteIndex = scale.indexOf(note);
      const transposedIndex = (noteIndex + delta + 12) % 12;
      const transposedNote = scale[transposedIndex];
      return transposedNote;
    });
    return this;
  }

  /** @returns {Chord} */
  switchModifier () {
    this.chordString = this.chordString.replaceAll(/[A-G][#b]/g, (note) => {
      const scale = note.includes('#') ? Chord.sharps : Chord.flats;
      const newScale = note.includes('#') ? Chord.flats : Chord.sharps;
      const noteIndex = scale.indexOf(note);
      return newScale[noteIndex];
    });
    return this;
  }

  /** @returns {Chord} */
  useSharpModifier () {
    this.chordString = this.chordString.replaceAll(/[A-G]b/g, (note) => {
      const noteIndex = Chord.flats.indexOf(note);
      return Chord.sharps[noteIndex];
    });
    return this;
  }

  /** @returns {Chord} */
  useFlatModifier () {
    this.chordString = this.chordString.replaceAll(/[A-G]#/g, (note) => {
      const noteIndex = Chord.sharps.indexOf(note);
      return Chord.flats[noteIndex];
    });
    return this;
  }

  /** @returns {string} */
  toString () {
    return this.chordString;
  }

  /** @returns {string} */
  toFormattedString () {
    return this.chordString.replaceAll(/[#b]/g, /* html */`<sup>$&</sup>`); // eslint-disable-line quotes
  }
}