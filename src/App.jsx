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
            <Route path="/details/:cityName" element={<Details />} />
          </Routes>
        </Container>
      </>
    </BrowserRouter>
  );
}

export default App;
