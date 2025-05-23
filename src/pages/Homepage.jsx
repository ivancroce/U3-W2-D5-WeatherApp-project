import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Form, Button } from "react-bootstrap";

const Homepage = () => {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (city.trim()) {
      navigate(`/details/${city.trim()}`);
    } else {
      alert("Please enter a city name.");
    }
  };

  // Geolocation function onClick
  const handleGeoLocationClick = () => {
    alert("Could not determine city name from your location.");
    // TODO: getCurrentPosition()
  };

  return (
    <Row className="justify-content-center align-items-center min-vh-100 text-center">
      <Col md={8} lg={6} xl={5}>
        <h1 className="app-title mb-3 fw-semibold">Pick Location</h1>
        <p className="app-subtitle mb-4">Find the area or city that you want to know the detailed weather info at this time</p>
        <Form onSubmit={handleSubmit}>
          <Row className="g-2">
            <Col>
              {/* Search input */}
              <div className="search-input-container">
                <i className="bi bi-search search-icon"></i>
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className="search-input-custom"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  aria-label="Search city"
                />
              </div>
            </Col>
            {/* geo-btn */}
            <Col xs="auto">
              <Button
                variant="secondary"
                className="geo-btn"
                onClick={handleGeoLocationClick} // geo-btn function onClick
                aria-label="Geolocation"
              >
                <i className="bi bi-geo-alt"></i>
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};
export default Homepage;
