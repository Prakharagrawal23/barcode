import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import BarcodeGenerator from "./components/BarcodeGenerator";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Sidebar />} />
          <Route path="/barcode" element={<BarcodeGenerator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
