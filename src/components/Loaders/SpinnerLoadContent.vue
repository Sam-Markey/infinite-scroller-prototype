import type { PropType from 'vue';
<template>
  <div class="spinner"></div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.spinner {
  margin: auto;
  position: relative;
  margin: 0;
  padding: 0;
  border-radius: 50%;
  border: 0.5rem solid rgb(78, 78, 78);

  border-bottom-color: rgb(98, 209, 161);
  width: 4rem;
  height: 4rem;
  padding: 0;
  margin: 0;
  animation: rotateSpinner 1s infinite linear;
}

@keyframes rotateSpinner {
  100% {
    transform: rotate(360deg);
  }
}
</style>
