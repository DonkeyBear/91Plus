<script setup>
import hotkeyData from '@/assets/hotkeys.json'
import HotkeyItem from '@/components/common/HotkeyItem.vue'
import PopupBase from '@/components/common/PopupBase.vue'
import { useStore } from '@/store'

const store = useStore()
</script>

<template>
  <PopupBase id="plus91-hotkey-popup" v-model="store.isPopupShow.hotkey">
    <div class="hotkey-popup-container">
      <section class="left-part">
        <HotkeyItem
          v-for="(item, index) of hotkeyData.hotkeysLeft"
          :key="`${item.hotkey}_${item.desc}_${index}`"
          :hotkey="item.hotkey"
          :desc="item.desc"
        />
      </section>
      <section class="right-part">
        <HotkeyItem
          v-for="(item, index) of hotkeyData.hotkeysRight"
          :key="`${item.hotkey}_${item.desc}_${index}`"
          :hotkey="item.hotkey"
          :desc="item.desc"
        />
      </section>
    </div>
  </PopupBase>
</template>

<style scoped lang="scss">
#plus91-hotkey-popup {
  .hotkey-popup-container {
    display: flex;
    color: #444;
  }

  section {
    $border: 1px solid lightgray;
    $padding-x: 0.5rem;
    flex-grow: 1;
    width: 50%;
    margin: -0.1rem 0;

    &.left-part {
      border-right: $border;
      margin-left: -$padding-x;
      padding-right: $padding-x;
    }

    &.right-part {
      padding-left: $padding-x;
      margin-right: -$padding-x;
    }
  }

  kbd {
    font-size: 0.65rem;
    border: solid lightgray;
    border-width: 1px 0.1rem 0.15rem;
    border-radius: 0.2rem;
    padding: 0 0.2rem;
    letter-spacing: -0.025rem;
    color: #666;
  }
}
</style>
