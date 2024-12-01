export const getTweetIdFromUrl = (url: string): string | null => {
  try {
    // URLから最後の数字部分を抽出
    const match = url.match(/\/(\d+)$/);
    return match ? match[1] : null;
  } catch (error) {
    console.error('Error extracting status code:', error);
    return null;
  }
};
