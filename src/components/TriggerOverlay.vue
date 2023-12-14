<template>
  <div id="trigger-overlay"></div>
</template>

<style scoped lang="scss">
@import '../styles/variables.scss';
@import '../styles/mixins.scss';

#trigger-overlay {
  @include overlay;
  z-index: $z-trigger;
}
</style>