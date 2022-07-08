// This file contains variables for different themes

import { DefaultTheme } from "styled-components";

const commonTheme = {
  fontxs: "0.75em",
  fontsm: "0.875em",
  fontmd: "1em", // 1em = 16px
  fontlg: "1.25em",
  fontxl: "2em",
  fontxxl: "3em",
  font2xl: "3em",
  fontxxxl: "4em",
  font3xl: "4em",
  carouselColor: "#EEEDDE",
  mintCardColor: "#808080",
  fontButton: "0.875em",
  navHeight: "5rem",
  gray1: "#949494",
  gray2: "#BEBEBE",
  gray3: "#EBECF0",
  primary: "#00ffeb",
  selection: "#00ffeaaf",

  ["--chakra-colors-purple-100"]: "#E9D8FD",
  ["--chakra-colors-purple-200"]: "#D6BCFA",
  ["--chakra-colors-purple-300"]: "#B794F4",
  ["--chakra-colors-purple-400"]: "#9F7AEA",
  ["--chakra-colors-purple-500"]: "#805AD5",
  ["--chakra-colors-purple-600"]: "#6B46C1",
  ["--chakra-colors-purple-700"]: "#553C9A",
  ["--chakra-colors-purple-800"]: "#44337A",
  ["--chakra-colors-purple-900"]: "#322659",

  ["--chakra-colors-teal-50"]: "#E6FFFA",
  ["--chakra-colors-teal-100"]: "#B2F5EA",
  ["--chakra-colors-teal-200"]: "#81E6D9",
  ["--chakra-colors-teal-300"]: "#4FD1C5",
  ["--chakra-colors-teal-400"]: "#38B2AC",
  ["--chakra-colors-teal-500"]: "#319795",
  ["--chakra-colors-teal-600"]: "#2C7A7B",
  ["--chakra-colors-teal-700"]: "#285E61",
  ["--chakra-colors-teal-800"]: "#234E52",
  ["--chakra-colors-teal-900"]: "#1D4044",
};

export const light: DefaultTheme = {
  body: "#fff",
  text: "black", // black shade
  bodyRgba: "255, 255, 255",
  textRgba: "32,32,32",
  highlight: "lightblue",
  ...commonTheme,
};

export const dark: DefaultTheme = {
  body: "#202020",
  text: "#fff", // black shade
  bodyRgba: "32,32,32",
  textRgba: "255, 255, 255",
  ...commonTheme,
};

const customMediaQuery = (maxWidth: number): string =>
  `@media (max-width: ${maxWidth}px)`;
const mobileMediaQuery = (minWidth: number, maxWidth: number): string =>
  `@media (min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`;

export const media = {
  custom: customMediaQuery,
  1440: customMediaQuery(1440),
  1200: customMediaQuery(1200),
  768: customMediaQuery(768),
  mobile: mobileMediaQuery(320, 600),
};
