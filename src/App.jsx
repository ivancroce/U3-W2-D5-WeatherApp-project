import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./App.css";
import Homepage from "./pages/Homepage";
import DetailsByName from "./pages/DetailsByName";
import DetailsByCoords from "./pages/DetailsByCoords";

function App() {
  return (
    <BrowserRouter>
      <>
        <Container fluid>
          <Routes>
            <Route path="/" element={<Homepage />} />
            {/* path with cityName */}
            {/* <Route path="/details/:cityName" element={<DetailsByName />} /> */}
            {/* path with lat and lon */}
            <Route path="/details/:coords" element={<DetailsByCoords />} />
          </Routes>
        </Container>
      </>
    </BrowserRouter>
  );
}

export default App;
