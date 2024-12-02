export const useTweetId = () => {
  const getTweetIdFromUrl = (url: string): string | null => {
    try {
      // URLから最後の数字部分を抽出
      const match = url.match(/\/(\d+)$/);
      return match ? match[1] : null;
    } catch (error) {
      console.error('Error extracting status code:', error);
      return null;
    }
  };

  // 必要に応じて、関連する他の関数も追加
  const isValidTweetId = (id: string): boolean => {
    return /^\d+$/.test(id);
  };

  return {
    getTweetIdFromUrl,
    isValidTweetId,
  };
};
