<template>
  <div
    v-if="!error"
    @:scroll="loadMoreContent"
    class="scroll-container"
    ref="scrollContainer"
  >
    <div class="content-scroller-container" v-if="content.length">
      <ContentComponent
        v-for="(detail, index) in content"
        :key="index"
        :contentDetail="detail"
      />
      <SpinnerLoadContent v-if="loadingInMorePost" />
    </div>
    <SpinnerLoadContent v-else />
  </div>
  <div v-else>An error occured</div>
</template>

<script setup lang="ts">
import { ref, type Ref, watch } from "vue";
import ContentComponent from "./ContentComponent.vue";
import SpinnerLoadContent from "./Loaders/SpinnerLoadContent.vue";
import { fetchData } from "../composables/fetchData";
import type { Content } from "@/models/content.interface";

const scrollContainer: Ref<HTMLElement | null> = ref(null);
const indexOfContent: Ref<number> = ref(1);
const content: Ref<Content[]> = ref([]);
const { reload, data, error } = fetchData();
const loadingInMorePost: Ref<boolean> = ref(false);

reload("http://127.0.0.1:5173/content" + indexOfContent.value + ".json");

watch(data, () => {
  if (data.value && scrollContainer.value) {
    data.value.forEach((contentPost) => {
      content.value.push(contentPost);
    });
    loadingInMorePost.value = false;
  }
});
// eslint-disable-next-line no-undef
const posts: Ref<null | NodeListOf<HTMLHeadingElement>> = ref(null);

function observePosts() {
  posts.value = document.querySelectorAll(".content-container");
  if (posts.value) {
    posts.value.forEach((post) => {
      const observePost = new IntersectionObserver((posts) => {
        posts.forEach((post) => {
          post.target.classList.toggle("hide", !post.isIntersecting);
        });
      });
      observePost.observe(post);
    });
  }
}

function loadMoreContent() {
  if (content.value.length < 120) {
    if (scrollContainer.value) {
      const scrollPercentage: number =
        (scrollContainer.value.scrollTop /
          (scrollContainer.value.scrollHeight -
            scrollContainer.value.clientHeight)) *
        100;
      // observePosts();
      if (
        scrollPercentage >= 99 &&
        indexOfContent.value < 7 &&
        loadingInMorePost.value === false
      ) {
        loadingInMorePost.value = true;

        reload(
          "http://127.0.0.1:5173/content" + indexOfContent.value++ + ".json"
        );

        scrollContainer.value.style.maxHeight +=
          scrollContainer.value.clientHeight;
        if (indexOfContent.value === 7) {
          indexOfContent.value = 1;
        }
        console.log(content.value.length, indexOfContent.value);
        const isContentMessagesFull: boolean = content.value.length > 50;
        if (isContentMessagesFull) {
          if (indexOfContent.value === 7) {
            indexOfContent.value = 1;
          }
          content.value.splice(0, content.value.length - 50);
        }
      }
    }
  }
}
</script>

<style lang="scss">
.scroll-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: scroll;
  gap: 50px;
  h2 {
    background-color: lightblue;
    padding: 2rem;
    height: 1200px;
    width: 80%;

    &:first-child,
    &:last-child {
      margin: 1rem 0;
    }
    &:nth-child(even) {
      background-color: lightcoral;
    }
  }
  .hide {
    visibility: hidden;
  }
}

.filler {
  height: 500px;
  width: 100%;
}
.content-scroller-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
