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
  }
}
