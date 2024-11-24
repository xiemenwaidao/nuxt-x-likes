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
    if (retries <= 0)
      return console.error('Failed to load Twitter widget after 10 retries.');
    setTimeout(() => create(retries - 1), 1000);
    return;
  }
  // @ts-expect-error global
  const element = await window.twttr.widgets.createTweet(
    props.id.toString(),
    tweet.value,
    {
      theme: 'dark',
      // conversation: props.conversation || 'none',
      // cards: props.cards,
    },
  );
  loaded.value = true;
  if (element === undefined) tweetNotFound.value = true;
}

onMounted(() => {
  create();
});
</script>

<template>
  <div ref="tweet">
    <div v-if="!loaded">...loading</div>
    <div v-if="tweetNotFound">tweetNotFound</div>
  </div>
</template>

<style>
/*  */
</style>
