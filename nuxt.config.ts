import { generateDynamicRoutes } from './src/utils/tweet-helper';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxt/content',
    '@pinia/nuxt',
  ],
  srcDir: 'src/',

  // SSGモードを有効化
  // Astroのstaticモードに相当
  ssr: true,
  nitro: {
    prerender: {
      // すべての動的ルートを静的生成
      crawlLinks: true,
      routes: await generateDynamicRoutes(),
    },
  },

  // Nuxt Contentの設定
  // Astroの.md/.mdxのような設定に相当
  content: {
    // contentディレクトリのパスを指定（デフォルトは./content）
    dir: './content',
    // GitHub Flavored Markdownを有効化
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3,
      },
      anchorLinks: true,
    },
    // content/ディレクトリ内のファイルを監視
    watch: true,
  },

  // ビルド設定
  // hooks: {
  //   // ビルド前の処理をフック
  //   'build:before': async () => {
  //     // ここでJSONからMDファイルを生成
  //     const { processAndGenerateContent } = await import(
  //       './src/scripts/likes-processor.js'
  //     );
  //     await processAndGenerateContent();
  //   },
  // },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './src/components/ui',
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'ja',
        class: 'dark',
      },
      script: [
        {
          src: 'https://platform.twitter.com/widgets.js',
          async: true,
        },
      ],
    },
  },

  runtimeConfig: {
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,

    public: {
      awsRegion: process.env.AWS_REGION,
      awsBucketName: process.env.AWS_BUCKET_NAME,
    },
  },

  experimental: {
    viewTransition: true,
  },
});
