import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Alert, Button } from "react-bootstrap";
import CurrentCardWeather from "../components/CurrentCardWeather";
import ForecastCardWeather from "../components/ForecastCardWather";

const API_KEY = "96bfb0dfe48d197674b9ada73c1df14d";

const DetailsByCoords = () => {
  const { coords } = useParams();
  const [lat, lon] = coords.split(",");
  // State
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // FETCH CURRENT WEATHER
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=en`;
        const weatherResp = await fetch(weatherUrl);
        if (!weatherResp.ok) throw new Error("Error fetching current weather");
        const weatherData = await weatherResp.json();
        setCurrentWeather(weatherData);

        // FETCH 5 DAYS
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=en`;
        const forecastResp = await fetch(forecastUrl);
        if (!forecastResp.ok) {
          const errorData = await forecastResp.json();
          throw new Error(errorData.message || "Error retrieving forecasts");
        }
        // Filter only data from 12:00
        const forecastData = await forecastResp.json();
        const dailyForecast = forecastData.list.filter((item) => item.dt_txt.includes("12:00:00"));
        setForecast(dailyForecast.slice(0, 5)); // First 5 days
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, [lat, lon]);

  // --- Loading ---
  if (isLoading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status" variant="primary" />
        <p className="mt-2 app-subtitle">Loading weather data...</p>
      </Container>
    );
  }

  // --- Error ---
  if (error) {
    return (
      <Container className="text-center py-5">
        <Alert variant="danger">
          <h4>Oops! An error occurred.</h4>
          <p>{error}</p>
          <Button as={Link} to="/" variant="primary">
            Go back to Homepage
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="pt-5">
      <Row className="mb-3">
        <Col>
          <Button as={Link} to="/" variant="outline-light">
            ← New Search
          </Button>
        </Col>
      </Row>

      {currentWeather && (
        <Row className="d-flex justify-content-center">
          <Col xs={12} s={6} md={8} lg={6}>
            <CurrentCardWeather weather={currentWeather} />
          </Col>
        </Row>
      )}
      {forecast.length > 0 && (
        <>
          <h3 className="text-center mb-3 forecast-title fw-semibold mt-3">Next Days</h3>
          <Row xs={1} sm={2} md={3} lg={5} className="g-3">
            {forecast.map((day, index) => (
              <Col key={index}>
                <ForecastCardWeather day={day} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default DetailsByCoords;
