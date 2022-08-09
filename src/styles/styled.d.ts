import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    body: string;
    text: string; // black shade

    bodyRgba: string;
    textRgba: string;

    carouselColor: string;
    mintCardColor: string;
    fontxs: string;
    fontsm: string;
    fontmd: string; // 1em = 16px
    fontlg: string;
    fontxl: string;
    fontxxl: string;
    font2xl: string;
    fontxxxl: string;
    font3xl: string;

    fontButton: string;

    navHeight: string;

    highlight?: string;

    gray1: string;
    gray2: string;
    gray3: string;

    ["--chakra-colors-purple-100"]: string;
    ["--chakra-colors-purple-200"]: string;
    ["--chakra-colors-purple-300"]: string;
    ["--chakra-colors-purple-400"]: string;
    ["--chakra-colors-purple-500"]: string;
    ["--chakra-colors-purple-600"]: string;
    ["--chakra-colors-purple-700"]: string;
    ["--chakra-colors-purple-800"]: string;
    ["--chakra-colors-purple-900"]: string;

    ["--chakra-colors-teal-50"]: string;
    ["--chakra-colors-teal-100"]: string;
    ["--chakra-colors-teal-200"]: string;
    ["--chakra-colors-teal-300"]: string;
    ["--chakra-colors-teal-400"]: string;
    ["--chakra-colors-teal-500"]: string;
    ["--chakra-colors-teal-600"]: string;
    ["--chakra-colors-teal-700"]: string;
    ["--chakra-colors-teal-800"]: string;
    ["--chakra-colors-teal-900"]: string;
    primary: string;
    selection: string;
    gradientBg: string;

    colors: {
      whiteAlpha50: string;
      whiteAlpha100: string;
      whiteAlpha200: string;
      whiteAlpha300: string;
      whiteAlpha400: string;
      whiteAlpha500: string;
      whiteAlpha600: string;
      whiteAlpha700: string;
      whiteAlpha800: string;
      whiteAlpha900: string;
      blackAlpha50: string;
      blackAlpha100: string;
      blackAlpha200: string;
      blackAlpha300: string;
      blackAlpha400: string;
      blackAlpha500: string;
      blackAlpha600: string;
      blackAlpha700: string;
      blackAlpha800: string;
      blackAlpha900: string;
      gray50: string;
      gray100: string;
      gray200: string;
      gray300: string;
      gray400: string;
      gray500: string;
      gray600: string;
      gray700: string;
      gray800: string;
      gray900: string;

      teal50: string;
      teal100: string;
      teal200: string;
      teal300: string;
      teal400: string;
      teal500: string;
      teal600: string;
      teal700: string;
      teal800: string;
      teal900: string;
      blue50: string;
      blue100: string;
      blue200: string;
      blue300: string;
      blue400: string;
      blue500: string;
      blue600: string;
      blue700: string;
      blue800: string;
      blue900: string;
      cyan50: string;
      cyan100: string;
      cyan200: string;
      cyan300: string;
      cyan400: string;
      cyan500: string;
      cyan600: string;
      cyan700: string;
      cyan800: string;
      cyan900: string;
      purple50: string;
      purple100: string;
      purple200: string;
      purple300: string;
      purple400: string;
      purple500: string;
      purple600: string;
      purple700: string;
      purple800: string;
      purple900: string;

      twitter50: string;
      twitter100: string;
      twitter200: string;
      twitter300: string;
      twitter400: string;
      twitter500: string;
      twitter600: string;
      twitter700: string;
      twitter800: string;
      twitter900: string;
      telegram50: string;
      telegram100: string;
      telegram200: string;
      telegram300: string;
      telegram400: string;
      telegram500: string;
      telegram600: string;
      telegram700: string;
      telegram800: string;
      telegram900: string;
    };

    fonts: {
      saira: string;
    };
  }
}
