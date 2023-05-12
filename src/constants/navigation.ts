export const homeNavigation = [
  { name: "Shops", href: "/", current: false },
  { name: "Account", href: "/account", current: false },
];

export const pageNavigation = (landingPageId: string | number) => [
  { name: "Home", href: `/`, current: false },
  {
    name: "Payments",
    href: `/landing-page/${landingPageId}/payments`,
    current: false,
  },
  {
    name: "Editor",
    href: `/editor/${landingPageId}`,
    current: false,
  },
  // { name: "Products", href: `/shop/${landingPageId}/products`, current: false },
  // {
  //   name: "Shop Settings",
  //   href: `/shop/${landingPageId}/settings`,
  //   current: false,
  // },
  // { name: "Account", href: `/account`, current: false },
];
