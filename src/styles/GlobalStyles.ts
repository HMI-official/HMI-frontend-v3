import { createGlobalStyle } from "styled-components";
import "@fontsource/akaya-telivigala";
import "@fontsource/sora";

const GlobalStyles = createGlobalStyle`

${
  "" /* 
*{
    outline: 1px solid red !important;
} */
}

/* html.wf-loading * { */
     /* opacity: 0; */
 /* } */

*,*::before,*::after{
    margin: 0;
    padding: 0;
}
html{
  scroll-behavior: smooth;
  transition: scroll 3s ease-in-out !important;
  /* transition: scroll 0.3s cubic-bezier(0.0, 0.0, 0.58, 1.0); */
  scroll-snap-type: y proximity ;
}

@keyframes pageFadeIn {
  from { opacity:0; }
  to { opacity:1; }
}

body {
  opacity:1;
  animation:pageFadeIn ease-in 1;
  /* animation-fill-mode:forwards; */
  animation-duration:0.3s;
  /* animation-delay: 0.1s */
}

body{
    font-family: 'Saira', sans-serif;
    overflow-x: hidden;
    background-color: ${(props) => props.theme.text};
    color: ${(props) => props.theme.body};
}

h1,h2,h3,h4,h5,h6{
    margin: 0;
    padding: 0;
}
a{
    color: inherit;
    text-decoration:none;
}

  @font-face {
    font-display: block;
    font-family: "NotoSans";
    font-weight: normal;
    font-style: normal;
    src: url("/fonts/NotoSansKR-Regular.otf") format("truetype");
  }


  @font-face {
    font-display: block;
    font-family: "NotoSans Thin";
    font-weight: normal;
    font-style: normal;
    src: url("/fonts/NotoSansKR-Thin.otf") format("truetype");
  }

  @font-face {
    font-display: block;
    font-family:"Montserrat";
    font-weight: 100;
    font-style: normal;
    src: url("/fonts/Montserrat-Thin.ttf") format("truetype");
  }

  @font-face {
    font-display: block;
    font-family:"Montserrat";
    font-weight: 200;
    font-style: normal;
    src: url("/fonts/Montserrat-ExtraLight.ttf") format("truetype");
  }

  @font-face {
    font-display: block;
    font-family:"Montserrat";
    font-weight: 300;
    font-style: normal;
    src: url("/fonts/Montserrat-Light.ttf") format("truetype");
  }
    
  @font-face {
    font-display: block;
    font-family:"Montserrat";
    font-weight: 400;
    font-style: normal;
    src: url("/fonts/Montserrat-Regular.ttf") format("truetype");
  }

  @font-face {
    font-display: block;
    font-family:"Montserrat";
    font-weight: 500;
    font-style: normal;
    src: url("/fonts/Montserrat-Medium.ttf") format("truetype");
  }

  @font-face {
    font-display: block;
    font-family:"Montserrat";
    font-weight: 600;
    font-style: normal;
    src: url("/fonts/Montserrat-SemiBold.ttf") format("truetype");
  }

  @font-face {
    font-display: block;
    font-family:"Montserrat";
    font-weight: 700;
    font-style: normal;
    src: url("/fonts/Montserrat-Bold.ttf") format("truetype");
  }

  @font-face {
    font-display: block;
    font-family:"Montserrat";
    font-weight: 800;
    font-style: normal;
    src: url("/fonts/Montserrat-ExtraBold.ttf") format("truetype");
  }

  @font-face {
    font-display: block;
    font-family:"Montserrat";
    font-weight: 900;
    font-style: normal;
    src: url("/fonts/Montserrat-Black.ttf") format("truetype");
  }

   
/* Thin 100
ExtraLight 200
Light 300
Regular 400
Medium 500
SemiBold 600
Bold 700
ExtraBold 800
Black 900 */
  

  :root {
 
  --clr-light: #f0e9e9;
  --clr-purple: #9b5de5;
  --clr-pink: #f15bb5;
  --clr-yellow: #fee440;
  --clr-blue: #00bbf9;
  --clr-green: #00f5d4;
  --clr-selection-bg: #cb3d92;
  --clr-selection-text: #f4f0f0;
  --clr-background: #06070a;

  --color-light: white;
  --color-dark: #212121;
  --color-signal: #fab700;

  --color-background: var(--color-light);
  --color-text: var(--color-dark);
  --color-accent: var(--color-signal);

  --size-bezel: 0.5rem;
  --size-radius: 4px;

 
  }
  ::selection {
  background:${({ theme }) => theme.selection};
  /* background: var(--clr-selection-bg); */
  color: white;
  /* color: var(--clr-selection-text); */
  }
`;

export default GlobalStyles;
