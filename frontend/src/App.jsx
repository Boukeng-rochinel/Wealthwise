// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // For Bootstrap JS
import Home from "./components/Home";
import SearchPage from "./components/SearchPage";
import VideoRendering from "./VideoRendering";
import PaymentForm from "./PaymentForm";

export default function App() {
  console.log("✅ App is rendering!");
  return (
    <>
      <PaymentForm />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </Router>
    </>
  );
}
