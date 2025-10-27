<script setup>
import ChordPopup from '@/components/ChordPopup.vue'
import ToolbarIcon from '@/components/common/ToolbarIcon.vue'
import FontSizePopup from '@/components/FontSizePopup.vue'
import HotkeyPopup from '@/components/HotkeyPopup.vue'
import MenuPopup from '@/components/MenuPopup.vue'
import SettingsPopup from '@/components/SettingsPopup.vue'
import SheetPopup from '@/components/SheetPopup.vue'
import { useStore } from '@/store'

const props = defineProps({
  active: Boolean,
})

const store = useStore()
</script>

<template>
  <Transition name="slide">
    <div v-show="props.active" id="plus91-footer">
      <div class="footer-container">
        <ToolbarIcon
          icon="music-note-beamed"
          text="譜面"
          stroke=".05rem"
          :active="store.isPopupShow.sheet"
          @click="store.togglePopup('sheet')"
        />
        <ToolbarIcon
          icon="table"
          text="和弦"
          :active="store.isPopupShow.chord"
          @click="store.togglePopup('chord')"
        />
        <ToolbarIcon
          icon="type"
          text="字型"
          stroke=".05rem"
          :active="store.isPopupShow.font"
          @click="store.togglePopup('font')"
        />
        <ToolbarIcon
          icon="gear-wide-connected"
          text="設定"
          :active="store.isPopupShow.settings"
          @click="store.togglePopup('settings')"
        />
        <ToolbarIcon
          icon="list"
          text="其他"
          stroke=".05rem"
          :active="store.isPopupShow.menu"
          @click="store.togglePopup('menu')"
        />
        <!-- Popups -->
        <SheetPopup />
        <ChordPopup />
        <FontSizePopup />
        <SettingsPopup />
        <MenuPopup />
        <HotkeyPopup />
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
@use '@/styles/mixins.scss';
@use '@/styles/transitions.scss';

@include transitions.slide(down);

#plus91-footer {
  @include mixins.toolbar;
  bottom: 0;
}

.footer-container {
  @include mixins.toolbar-container;

  @include mixins.breakpoint-large {
    border-radius: 1rem 1rem 0 0;
  }

  padding-bottom: 0.75rem;
  border-top: 1px solid var(--toolbar-border-color);
}
</style>
