import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Convert from "./pages/Convert";
import Footer from "./components/Footer";
import Community from "./pages/Community";
import CommunityDetail from "./pages/CommunityDetail";
import CommunityNew from "./pages/CommunityNew";
import CommunityEdit from "./pages/CommunityEdit"
import useAuth from "./hooks/useAuth";

function App() {
  useAuth();

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/convert" element={<Convert />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/:id" element={<CommunityDetail />} />
        <Route path="/community/new" element={<CommunityNew />} />
        <Route path="/community/edit/:id" element={<CommunityEdit />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
