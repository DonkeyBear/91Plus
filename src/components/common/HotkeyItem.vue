<script setup>
const props = defineProps({
  hotkey: {
    type: String,
    required: false,
  },
  desc: String,
})

const hotkeyList = props.hotkey.split(' ')
</script>

<template>
  <div class="hotkey-item">
    <div class="desc" :class="{ title: !hotkey }">
      {{ desc }}
    </div>
    <div v-if="hotkey" class="hotkeys">
      <kbd v-for="key of hotkeyList" :key="`${key}_${hotkey}_${desc}`">{{ key }}</kbd>
    </div>
    <div v-else class="hr" />
  </div>
</template>

<style scoped lang="scss">
.hotkey-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.25rem;
  border-radius: 0.25rem;
  height: 1.4rem;

  &:nth-child(odd) {
    background: rgba($color: black, $alpha: 0.025);
  }
}

.desc {
  &.title {
    font-size: 0.55rem;
    color: #999;
  }
}

.hotkeys {
  display: flex;
}

.hr {
  display: flex;
  flex-grow: 1;
  border-top: 1px solid lightgray;
  margin-left: 0.25rem;
}

kbd {
  font-size: 0.6rem;
  border: solid lightgray;
  border-width: 1px 0.1rem 0.15rem;
  border-radius: 0.2rem;
  padding: 0 0.2rem;
  letter-spacing: -0.025rem;
  color: #666;
  margin-left: 0.15rem;
}
</style>
