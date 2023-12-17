<script setup>
const props = defineProps({
  hotkey: {
    type: String,
    required: false
  },
  desc: String
});

const hotkeyList = props.hotkey.split(' ');
</script>

<template>
  <div class="hotkey-item">
    <div class="desc" :class="{ 'title': !hotkey }">
      {{ desc }}
    </div>
    <div class="hotkeys" v-if="hotkey">
      <kbd v-for="key of hotkeyList">{{ key }}</kbd>
    </div>
    <div class="hr" v-else></div>
  </div>
</template>

<style scoped lang="scss">
@import '../styles/mixins.scss';

.hotkey-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 .25rem;
  border-radius: .25rem;
  height: 1.4rem;

  &:nth-child(odd) {
    background: rgba($color: black, $alpha: .025);
  }
}

.desc {
  &.title {
    font-size: .55rem;
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
  margin-left: .25rem;
}

kbd {
  font-size: .6rem;
  border: solid lightgray;
  border-width: 1px .1rem .15rem;
  border-radius: .2rem;
  padding: 0 .2rem;
  letter-spacing: -.025rem;
  color: #666;
  margin-left: .15rem;
}
</style>