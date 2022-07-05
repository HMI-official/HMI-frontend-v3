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
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <main>
            <Navigation />
            <Home />
            <About />
            <Roadmap />
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
