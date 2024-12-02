<!--
  Based on: Slidev Tweet Component
  Original: https://github.com/slidevjs/slidev/blob/main/packages/client/builtin/Tweet.vue
  Copyright (c) 2021-PRESENT Anthony Fu <https://github.com/antfu>
  License: MIT License
-->

<script setup lang="ts">
const props = defineProps<{
  id: string | number;
}>();

const tweet = ref<HTMLElement | null>();

const loaded = ref(false);
const tweetNotFound = ref(false);

async function create(retries = 10) {
  // @ts-expect-error global
  if (!window.twttr?.widgets?.createTweet) {
    if (retries <= 0) {
      console.error(`Failed to load Twitter widget after ${retries} retries.`);
      loaded.value = true;
      tweetNotFound.value = true;
      return;
    }
    setTimeout(() => create(retries - 1), 1000);
    return;
  }

  try {
    // @ts-expect-error global
    const element = await window.twttr.widgets.createTweet(
      props.id.toString(),
      tweet.value,
      {
        theme: 'dark',
        // conversation: props.conversation || 'none',
        // cards: props.cards,
        dnt: true,
      },
    );

    // console.log(element);

    loaded.value = true;
    if (element === undefined) {
      loaded.value = true;
      tweetNotFound.value = true;
    }
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  create();
});
</script>

<template>
  <div ref="tweet" :data-tweet-id="id">
    <!-- <div v-if="!loaded">...loading</div>
    <div v-if="tweetNotFound">tweet not found</div> -->
  </div>
</template>

<style>
/*  */
</style>
