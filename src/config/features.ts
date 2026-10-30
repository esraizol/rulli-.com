export const features = {
  nativeCheckout: false,
  shoppingCart: false,
  paymentGateway: false,
  orderManagement: false,
  couponSystem: false,
  giftCards: false,
  aiStudio: false,
  aiStylist: false,
  virtualTryOn: false,
  outfitBuilder: false,
  digitalWardrobe: false,
  colorAnalysis: false,
  customerRewards: false,
  referralSystem: false,
  reviews: false,
  adminDashboard: false,
  authentication: true,
  wishlist: true,
  search: true,
  journal: true,
  newsletter: true,
  shopierIntegration: true,
  instagram: true,
  tiktok: true,
  pinterest: true,
  i18n: true,
} as const;

export type FeatureFlag = keyof typeof features;

export function isFeatureEnabled(feature: FeatureFlag): boolean {
  return features[feature];
}
