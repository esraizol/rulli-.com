export const analyticsConfig = {
  googleAnalytics: {
    enabled: false,
    measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '',
  },
  metaPixel: {
    enabled: false,
    pixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '',
  },
  tiktokPixel: {
    enabled: false,
    pixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID ?? '',
  },
  pinterestTag: {
    enabled: false,
    tagId: process.env.NEXT_PUBLIC_PINTEREST_TAG_ID ?? '',
  },
} as const;
