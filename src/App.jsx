import { useState } from "react";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer";

function App() {
  const [searchTerm, setSearchTerm] =
    useState("");

  return (
    <>
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={
          setSearchTerm
        }
      />

      <AppRoutes
        searchTerm={
          searchTerm
        }
      />
      <Footer />
    </>
  );
}

export default App;
