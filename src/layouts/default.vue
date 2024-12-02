<script setup lang="ts">
import { Calendar } from '@/components/ui/calendar';
import { useCalendarStore } from '@/store/calendarStore';
import {
  type DateValue,
  getLocalTimeZone,
  parseDate,
  today,
} from '@internationalized/date';
import { type Ref, ref } from 'vue';

const onClickDate = async (v: DateValue | undefined) => {
  if (v) {
    const d = v.toString();
    setDate(d);
    await navigateTo(`/${d.split('-').join('/')}`);
  }
};

const { date, dateStr, setDate } = useCalendarStore();

const value = ref(date) as Ref<DateValue>;
// console.log(today(getLocalTimeZone()));
// console.log(value.value);
</script>

<template>
  <div class="container">
    <div class="py-8">
      <div class="flex items-center justify-center">
        <Calendar
          v-model="value"
          :weekday-format="'short'"
          class="rounded-md border"
          :min-value="parseDate('2024-11-10')"
          :max-value="today(getLocalTimeZone())"
          @update:model-value="onClickDate"
        />
      </div>

      <div class="mt-8">
        <h1 class="text-center">
          liked on: {{ value.toString().split('-').join('/') }}
        </h1>
        <NuxtPage />
      </div>
    </div>
  </div>
</template>
