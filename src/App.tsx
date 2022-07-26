import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Faq from "./components/sections/Faq";
import ScrollToTop from "./components/ScrollToTop";
import Minting from "./routes/minting";
import AdminDashboard from "./routes/admin-dashboard";
import HomeV2 from "./components/sections/Home.v2";
import AboutV2 from "./components/sections/About.v2";
import RoadmapV2 from "./components/sections/Roadmap.v2";
import ShowcaseV2 from "./components/sections/Showcase.v2";
import Benefit from "./components/sections/Benefit";
import TeamV2 from "./components/sections/Team.v2";
import Story from "./components/sections/Story";
import AccordionDemo from "./components/AccordionDemo";
import Galaxy from "./components/bgImg/Galaxy";
import styled from "styled-components";
import FooterV2 from "./components/sections/Footer.v2";
import Join from "./components/sections/Join";
import ReactGA from "react-ga";
import Counter from "./components/sections/Counter";
import Vimeo from "./components/sections/Vimeo";

const TRACKING_ID = process.env.REACT_APP_ANALYTICS_ID!;
ReactGA.initialize(TRACKING_ID);
ReactGA.pageview(window.location.pathname + window.location.search);
// const TRACKING_ID = process.env.REACT_APP_ANALYTICS_ID!; // OUR_TRACKING_ID
// ReactGA.initialize(TRACKING_ID);
// import "./styles/fonts.css";

function App() {
  useEffect(() => {
    AOS.init({
      once: false,
      delay: 50,
      duration: 1000,
      easing: "ease",
      mirror: true,
    });

    setTimeout(() => {
      AOS.refresh();
    }, 1500);
  }, []);
  // <Router>
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Main>
            <Galaxy />
            <Navigation />
            <HomeV2 />
            <Counter />
            <AboutV2 />
            <RoadmapV2 />
            <ShowcaseV2 />
            <Benefit />
            <TeamV2 />
            <Vimeo />
            {/* <Story /> */}
            {/* <AccordionDemo /> */}
            <Faq />
            <Join />
            <FooterV2 />
            {/* <Footer /> */}
            <ScrollToTop />
          </Main>
        }
      />
      <Route path="/mint" element={<Minting />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;

const Main = styled.main``;
