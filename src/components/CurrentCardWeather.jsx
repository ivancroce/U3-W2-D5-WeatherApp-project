import { Card, Row, Col } from "react-bootstrap";

const CurrentCardWeather = ({ weather, isHomepage = false }) => {
  return (
    <Card className={`text-center weather-card current-weather-card py-3 w-100 h-100`}>
      <Card.Body className="d-flex flex-column h-100">
        <div>
          <Card.Title as="h2" className={`mb-0 ${isHomepage ? "fs-3" : ""}`}>
            {isHomepage ? `${weather.name}, ${weather.sys.country}` : `Current weather in ${weather.name}, ${weather.sys.country}`}
          </Card.Title>
        </div>
        <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            style={{ width: "100px", height: "100px" }}
          />
          <Card.Text className="display-4 my-1">{Math.round(weather.main.temp)}°C</Card.Text>
          <p className="lead text-capitalize mb-2">{weather.weather[0].description}</p>
        </div>

        <div className={`${isHomepage ? "flex-grow-1 d-flex flex-column justify-content-center align-items-center" : ""}`}>
          <Row className="mt-3">
            <Col>
              <strong>Humidity:</strong>
              <p>{weather.main.humidity}%</p>
            </Col>
            <Col>
              <strong>Wind:</strong>
              <p>{Math.round(weather.wind.speed * 3.6)} km/h</p>
            </Col>
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CurrentCardWeather;
