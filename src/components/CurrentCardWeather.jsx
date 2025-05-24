import { Card, Row, Col } from "react-bootstrap";

const CurrentCardWeather = ({ weather }) => {
  return (
    <Card className="text-center weather-card current-weather-card py-3 ">
      <Card.Body>
        <Card.Title as="h2">
          Current weather in {weather.name}, {weather.sys.country}
        </Card.Title>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
          style={{ width: "100px", height: "100px" }}
        />
        <Card.Text className="display-4 my-1">{Math.round(weather.main.temp)}°C</Card.Text>
        <p className="lead text-capitalize mb-2">{weather.weather[0].description}</p>
        <Row className="mt-3">
          <Col>
            <strong>Humidity:</strong> {weather.main.humidity}%
          </Col>
          <Col>
            <strong>Wind:</strong> {Math.round(weather.wind.speed)} km/h
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CurrentCardWeather;
