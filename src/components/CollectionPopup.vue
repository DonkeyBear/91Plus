<script setup>
import { useStore } from '../store';
import BootstrapIcon from './BootstrapIcon.vue';
import MenuPopup from './MenuPopup.vue';

const store = useStore();
</script>

<template>
  <MenuPopup
    name="collection"
    title="收藏的譜"
  >
    <div class="collection-list">
      <p
        v-if="store.collectedSheets.length === 0"
        class="empty-hint"
      >
        沒有收藏任何東西
      </p>
      <div
        v-for="sheet in store.collectedSheets"
        :key="sheet.id"
        class="collection-item"
      >
        <a
          :href="sheet.url"
          class="collection-link"
          target="_blank"
        >
          <div class="collection-title">
            {{ sheet.title }}
          </div>
          <div class="collection-artist">
            {{ sheet.artist }}
          </div>
        </a>
        <button
          class="collection-remove-button"
          @click="store.toggleCollected(sheet.id)"
        >
          <BootstrapIcon icon="trash" />
        </button>
      </div>
    </div>
  </MenuPopup>
</template>

<style scoped lang="scss">
@import '../styles/variables.scss';

.empty-hint {
  margin: 1rem;
  text-align: center;
  color: $secondary-text-color;
  font-size: .8rem;
}

.collection-list {
  padding: .5rem;
}

.collection-item {
  display: flex;
  align-items: center;
  padding: .5rem;
  border-radius: .5rem;
  transition: background-color .2s;

  &:hover {
    background-color: $hover-color;
  }
}

.collection-link {
  flex-grow: 1;
  text-decoration: none;
  color: inherit;
}

.collection-title {
  font-weight: bold;
}

.collection-artist {
  font-size: .8rem;
  color: $secondary-text-color;
}

.collection-remove-button {
  border: 0;
  background: 0;
  cursor: pointer;
  color: $secondary-text-color;
  padding: .5rem;
  border-radius: 50%;
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: $danger-color;
    background-color: $hover-color;
  }
}
</style>
