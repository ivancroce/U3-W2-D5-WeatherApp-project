import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./App.css";
import Homepage from "./pages/Homepage";
import Details from "./pages/Details";

function App() {
  return (
    <BrowserRouter>
      <>
        <Container fluid>
          <Routes>
            <Route path="/" element={<Homepage />} />
            {/* path with cityName */}
            {/*  <Route path="/details/:cityName" element={<Details />} /> */}
            {/* patch with lat and long */}
            <Route path="/details/:coords" element={<Details />} />
          </Routes>
        </Container>
      </>
    </BrowserRouter>
  );
}

export default App;
