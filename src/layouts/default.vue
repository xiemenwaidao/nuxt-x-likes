<script setup lang="ts">
import { Calendar } from '@/components/ui/calendar';
import { useCalendarStore } from '@/store/calendarStore';
import { type DateValue } from '@internationalized/date';
import type { CalendarRootProps } from 'radix-vue';
import { type Ref, ref } from 'vue';

const onClickDate = async (v: DateValue | undefined) => {
  if (v) {
    const d = v.toString();
    setDate(d);
    await navigateTo(`/${d.split('-').join('/')}`);
  } else {
    await navigateTo('/');
  }
};

// 型定義
interface ContentDocument {
  _path?: string;
  // 他の必要なプロパティがあれば追加
}

const { data: allDates } = await useAsyncData('all-dates', async () => {
  const articles = (await queryContent()
    .where({ _extension: 'json' })
    .find()) as ContentDocument[];

  // パスの存在チェックを追加
  const dates = articles
    .filter((article): article is ContentDocument & { _path: string } => {
      return typeof article._path === 'string';
    })
    .map((article) => {
      const pathParts = article._path.split('/');
      // 配列の長さチェックを追加
      if (pathParts.length < 5) {
        return null;
      }
      return {
        year: pathParts[2],
        month: pathParts[3],
        day: pathParts[4],
      };
    })
    .filter((date): date is NonNullable<typeof date> => date !== null)
    .sort((a, b) => {
      const dateA = `${a.year}${a.month}${a.day}`;
      const dateB = `${b.year}${b.month}${b.day}`;
      return dateB.localeCompare(dateA);
    });

  return dates;
});

// console.log(allDates.value);

const isDateDisabled: CalendarRootProps['isDateDisabled'] = (
  date: DateValue,
) => {
  return !allDates.value?.some(({ year, month, day }) => {
    return (
      date.year === Number(year) &&
      date.month === Number(month) &&
      date.day === Number(day)
    );
  });
};

const route = useRoute();
const isTopPage = computed(() => route.path === '/');

const { date, setDate } = useCalendarStore();

const dateRef = ref(date ?? undefined) as Ref<DateValue | undefined>;
</script>

<template>
  <div class="container">
    <div
      class="py-8 calendar-wrapper"
      :class="{ 'h-svh grid place-items-center': isTopPage }"
    >
      <div>
        <div class="flex items-center justify-center">
          <Calendar
            v-model="dateRef"
            :weekday-format="'short'"
            class="rounded-md border"
            @update:model-value="onClickDate"
            :is-date-disabled="isDateDisabled"
          />
        </div>

        <div class="mt-8">
          <h1 class="text-center">
            liked on: {{ dateRef?.toString().split('-').join('/') ?? '???' }}
          </h1>
          <NuxtPage />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* view transition api */
.calendar-wrapper {
  view-transition-name: calendar-wrapper;
}
</style>
