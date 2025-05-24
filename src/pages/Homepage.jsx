import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Form, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

const API_KEY = "96bfb0dfe48d197674b9ada73c1df14d";

const Homepage = () => {
  // DetailsByName
  /* const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (city.trim()) {
      navigate(`/details/${city.trim()}`);
    } else {
      alert("Please enter a city name.");
    }
  }; */

  // DetailsByCoords
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      alert("Please enter a city name.");
      return;
    }

    try {
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city.trim()}&limit=1&appid=${API_KEY}`;
      const resp = await fetch(geoUrl);
      if (!resp.ok) throw new Error("Failed to fetch coordinates.");

      const data = await resp.json();
      if (data.length === 0) {
        alert("City not found.");
        return;
      }

      const { lat, lon } = data[0];
      navigate(`/details/${lat},${lon}`);
    } catch (err) {
      console.error("Error fetching coordinates:", err);
      alert("Error finding city. Please try again.");
    }
  };

  // Geolocation function onClick to getCurrentPosition() for DetailsByName
  /*  const handleGeoLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const reverseGeocodingUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
            const resp = await fetch(reverseGeocodingUrl);

            if (!resp.ok) {
              throw new Error("Failed to fetch.");
            }

            const data = await resp.json();

            if (data && data.length > 0 && data[0].name) {
              const cityNameFromGeo = data[0].name;
              navigate(`/details/${cityNameFromGeo.trim()}`);
            } else {
              alert("Could not determine city name from your location. Please try searching manually.");
            }
          } catch (error) {
            console.log("Error during reverse geocoding.", error);
            alert("An error occurred while trying to find your location. Please search for a city manually.");
          }
        },
        (error) => {
          console.log("Geolocation error:", error);
          alert("Unable to retrieve your location. Please allow location access or search manually.");
        }
      );
    }
  }; */

  // Geolocation function onClick to getCurrentPosition() for DetailsByCoords
  const handleGeoLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          navigate(`/details/${latitude},${longitude}`);
        },
        (error) => {
          console.log("Geolocation error:", error);
          alert("Unable to retrieve your location. Please allow location access or search manually.");
        }
      );
    }
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
              <OverlayTrigger placement="top" overlay={<Tooltip id="geo-tooltip">Click here to use your current location</Tooltip>}>
                <Button
                  variant="secondary"
                  className="geo-btn"
                  onClick={handleGeoLocationClick} // geo-btn function onClick
                  aria-label="Geolocation"
                >
                  <i className="bi bi-geo-alt"></i>
                </Button>
              </OverlayTrigger>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};
export default Homepage;
