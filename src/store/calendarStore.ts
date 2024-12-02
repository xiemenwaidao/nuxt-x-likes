import {
  getLocalTimeZone,
  parseDate,
  today,
  type DateValue,
} from '@internationalized/date';

export const useCalendarStore = defineStore('calendar', () => {
  // 文字列として保存
  const dateStr = ref(today(getLocalTimeZone()).toString());

  // getter - DateValueオブジェクトを返す
  const date = computed((): DateValue => {
    return parseDate(dateStr.value);
  });

  // setter - 文字列として保存
  const setDate = (d: string) => {
    dateStr.value = d;
    console.log(`set: ${d}`);
  };

  return {
    date, // DateValueオブジェクトを返すcomputed
    dateStr, // 内部的に保持する文字列
    setDate,
  };
});
