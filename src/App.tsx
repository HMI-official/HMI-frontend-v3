import Navigation from "./components/Navigation";
import About from "./components/sections/About";
import Home from "./components/sections/Home";
import Roadmap from "./components/sections/Roadmap";
import Team from "./components/sections/Team";
import Footer from "./components/Footer";
import Showcase from "./components/sections/Showcase";
import Faq from "./components/sections/Faq";
import ScrollToTop from "./components/ScrollToTop";
import Minting from "./routes/minting";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./routes/admin-dashboard";
import HomeV2 from "./components/sections/Home.v2";
import AboutV2 from "./components/sections/About.v2";
import RoadmapV2 from "./components/sections/Roadmap.v2";
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <main>
            <Navigation />
            <HomeV2 />
            <AboutV2 />
            <RoadmapV2 />
            <Showcase />
            <Team />
            <Faq />
            <Footer />
            <ScrollToTop />
          </main>
        }
      />
      <Route path="/mint" element={<Minting />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
