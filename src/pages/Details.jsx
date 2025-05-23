import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Alert, Button } from "react-bootstrap";

const API_KEY = "96bfb0dfe48d197674b9ada73c1df14d";

const DetailsPage = () => {
  const { cityName } = useParams(); // Gets the city name from the URL

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayCityName, setDisplayCityName] = useState(cityName);

  useEffect(() => {
    if (!cityName) return;

    const fetchLocationAndWeather = async () => {
      setIsLoading(true);
      setError(null);
      setCurrentWeather(null);
      setForecast([]);
      setDisplayCityName(cityName);

      try {
        // --- Geocoding ---
        const geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
        const geocodingResponse = await fetch(geocodingUrl);
        if (!geocodingResponse.ok) {
          throw new Error(`Geocoding error for ${cityName}`);
        }
        const geocodingData = await geocodingResponse.json();

        if (!geocodingData || geocodingData.length === 0) {
          throw new Error(`No coordinates found for ${cityName}. Check the city name.`);
        }

        const { lat, lon, name: resolvedCityName, country } = geocodingData[0]; // to get the first one
        setDisplayCityName(`${resolvedCityName}, ${country}`); // update with the name and country

        // --- Weather ---
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=en`;
        const weatherResponse = await fetch(weatherUrl);
        if (!weatherResponse.ok) {
          const errorData = await weatherResponse.json();
          throw new Error(errorData.message || "Error retrieving current weather");
        }
        const weatherData = await weatherResponse.json();
        setCurrentWeather(weatherData);

        // --- 5 days ---
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=en`;
        const forecastResponse = await fetch(forecastUrl);
        if (!forecastResponse.ok) {
          const errorData = await forecastResponse.json();
          throw new Error(errorData.message || "Error retrieving forecasts");
        }
        const forecastData = await forecastResponse.json();
        setForecast(processForecastData(forecastData.list));
      } catch (err) {
        console.log("Error in Fetch:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocationAndWeather();
  }, [cityName]); // Ricarica se il cityName dall'URL cambia

  const processForecastData = (forecastList) => {
    // (Stessa logica di prima, o migliorata se vuoi)
    const dailyData = [];
    const seenDates = new Set();
    for (const item of forecastList) {
      const date = item.dt_txt.split(" ")[0];
      if (!seenDates.has(date) && dailyData.length < 5) {
        seenDates.add(date);
        dailyData.push(item);
      }
    }
    return dailyData;
  };

  // --- Loading ---
  if (isLoading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status" variant="primary" />
        <p className="mt-2 app-subtitle">Loading weather data for {displayCityName}...</p>
      </Container>
    );
  }

  if (error) {
    return (
      // to fix style
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
        <Card className="mb-4 weather-card current-weather-card">
          <Card.Body className="text-center">
            <Card.Title as="h2">Current weather in {displayCityName}</Card.Title>
            {currentWeather.weather && currentWeather.weather.length > 0 && (
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
                alt={currentWeather.weather[0].description}
                style={{ width: "100px", height: "100px" }}
              />
            )}
            <Card.Text className="display-4 my-1">{Math.round(currentWeather.main.temp)}°C</Card.Text>
            <p className="lead text-capitalize mb-2">
              {currentWeather.weather && currentWeather.weather.length > 0 ? currentWeather.weather[0].description : ""}
            </p>
            <Row className="mt-3">
              <Col>
                <strong>Humidity:</strong> {currentWeather.main.humidity}%
              </Col>
              <Col>
                {/* TODO: fix the wind */}
                <strong>Wind:</strong> {Math.round(currentWeather.wind.speed)} km/h
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}

      {forecast.length > 0 && (
        <>
          <h3 className="text-center mb-3 forecast-title fw-semibold">Next Days</h3>
          <Row xs={1} sm={2} md={3} lg={5} className="g-3">
            {forecast.map((day, index) => (
              <Col key={index}>
                <Card className="text-center weather-card">
                  <Card.Body>
                    <Card.Subtitle>
                      <strong>{new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })}</strong>
                    </Card.Subtitle>
                    {day.weather && day.weather.length > 0 && (
                      <img
                        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                        alt={day.weather[0].description}
                        style={{ width: "70px", height: "70px" }}
                      />
                    )}
                    <p className="mb-1 mt-1 fs-4">{Math.round(day.main.temp)}°C</p>
                    <p className="small text-capitalize">{day.weather && day.weather.length > 0 ? day.weather[0].description : ""}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default DetailsPage;
