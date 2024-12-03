import { parseDate, type DateValue } from '@internationalized/date';

export const useCalendarStore = defineStore('calendar', () => {
  const route = useRoute();

  const getDefaultDate = (path: string) => {
    if (path === '/') return undefined;

    const match = path.match(/\/(\d{4})\/(\d{2})\/(\d{2})/);
    if (match) {
      const [_, year, month, day] = match;
      return `${year}-${month}-${day}`;
    }
    return undefined;
  };

  // 文字列として保存
  const dateStr = ref<string | undefined>(getDefaultDate(route.path));

  // URLからの日付解析を行うaction
  const parseUrlDate = (url: string) => {
    const match = url.match(/\/(\d{4})\/(\d{2})\/(\d{2})/);
    if (match) {
      const [_, year, month, day] = match;
      setDate(`${year}-${month}-${day}`);
    }
  };

  // getter - DateValueオブジェクトを返す
  const date = computed((): DateValue | undefined => {
    return dateStr.value ? parseDate(dateStr.value) : undefined;
  });

  // setter - 文字列として保存
  const setDate = (d: string) => {
    dateStr.value = d;
    // console.log(`set: ${d}`);
  };

  return {
    date, // DateValueオブジェクトを返すcomputed
    dateStr, // 内部的に保持する文字列
    setDate,
    parseUrlDate,
  };
});
