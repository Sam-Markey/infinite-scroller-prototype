<template>
  <div class="content-container">
    <div class="profile-header">
      <img :src="props.contentDetail['profile-icon']" alt=" profile icon" />
      <div class="name-details">
        <span> {{ contentDetail["profile-name"] }}</span>
        @{{ contentDetail["profile-username"] }}
      </div>
    </div>
    <p>{{ contentDetail["text-content"] }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Content } from "@/models/content.interface";
import type { PropType } from "vue";

const props = defineProps({
  contentDetail: { required: true, type: Object as PropType<Content> },
});
</script>
<style lang="scss">
.content-container {
  width: 60vw;
  display: flex;
  flex-direction: column;
  min-height: 500px;
  background: lightgray;
  gap: 30px;
  margin: 2rem;

  padding: 1rem;
  border-radius: 2rem;

  img {
    width: 60px;
    object-fit: cover;
    height: 60px;
    border-radius: 100%;
  }
  .profile-header {
    display: flex;
  }

  .name-details {
    display: flex;
    flex-direction: column;
    gap: 10px;

    span {
      color: rgb(18, 156, 57);
      font-weight: bold;
    }
  }
  p {
    font-size: 2rem;
  }
}
</style>
