<script setup>
import { ChordBox } from 'vexchords'
import { nextTick, onMounted, ref, useTemplateRef } from 'vue'
import { convertChordName, getChordShapes } from '../modules/utils'

const props = defineProps({
  chord: String,
})

const chordRef = useTemplateRef('chord')
const chordShapes = getChordShapes()
const isChordExist = ref(true)

onMounted(() => {
  const formattedChordKey = convertChordName(props.chord)
  const chordShape = chordShapes[formattedChordKey]
  if (!chordShape) {
    return isChordExist.value = false
  }

  const chordObject = {
    ...chordShape,
    // position: chordShape.position,
    // positionText: chordShape.position_text,
    barres: chordShape.bars?.map((barre) => {
      return {
        ...barre,
        fromString: barre.from_string,
        toString: barre.to_string,
      }
    }),
    chord: chordShape.chord.map(([stringNum, fretNum]) => {
      const raw = [stringNum, fretNum]
      if (Number.isNaN(+fretNum)) {
        return raw
      }
      let newFretNum = fretNum
      newFretNum += chordShape.position || 0
      newFretNum -= chordShape.position_text || 0
      return [stringNum, newFretNum]
    }),
  }
  nextTick(() => {
    const width = chordRef.value.clientWidth
    const chordBoxSelector = `.chord-chart[chord-name="${props.chord}"]`
    const chordBox = new ChordBox(chordBoxSelector, {
      width,
      height: width * 1.25,
      circleRadius: 5,
      numStrings: 6,
      numFrets: 5,
      showTuning: false,
      defaultColor: '#444',
      bgColor: 'transparent',
    })
    chordBox.draw(chordObject)
  })
})
</script>

<template>
  <div v-if="isChordExist" class="chord-container">
    <div class="chord-name">
      {{ props.chord }}
    </div>
    <div ref="chord" class="chord-chart" :chord-name="props.chord" />
  </div>
</template>

<style scoped lang="scss">
.chord-container {
  .chord-name {
    font-size: 0.5rem;
    font-weight: 900;
    color: #666;
    text-align: center;
  }

  .chord-chart {
    margin: -0.6rem 0 -0.25rem;
  }
}
</style>
