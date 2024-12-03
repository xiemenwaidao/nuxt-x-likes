<script setup lang="ts">
import Tweet from '@/components/Tweet.vue';
import type { Like } from '@/types/x/like';
import type { RouteParamsGeneric } from 'vue-router';

interface DayJson {
  body: Like[];
}

function getParamsString(params: RouteParamsGeneric, key: string) {
  return Array.isArray(params[key]) ? params[key][0] : params[key];
}

// ルートパラメータから年を取得
const route = useRoute();
const year = getParamsString(route.params, 'year');
const month = getParamsString(route.params, 'month');
const day = getParamsString(route.params, 'day');

const path = `likes/${year}/${month}/${day}`;
// console.log('Trying to fetch:', path);

const { data } = await useAsyncData<DayJson>(
  `likes-${year}-${month}-${day}`,
  () => queryContent<DayJson>(path).findOne(),
);

const tweetList = data.value?.body ?? [];
</script>

<template>
  <div class="">
    <div class="w-full max-w-md mx-auto space-y-4 p-0">
      <template v-for="(tweetData, index) in tweetList">
        <!-- <Card class="p-0">
          <CardContent class="p-0"> -->
        <Tweet :id="tweetData.tweet_id!" />
        <!-- </CardContent>
        </Card> -->
      </template>

      <template v-if="!tweetList.length">
        <div class="text-center pt-5">no data (ง ˙ω˙)ว</div>
      </template>
    </div>
  </div>
</template>
