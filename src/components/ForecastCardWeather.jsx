import { Card } from "react-bootstrap";

const ForecastCardWeather = ({ day }) => {
  const dateStr = new Date(day.dt_txt).toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short"
  });

  return (
    <Card className="text-center weather-card">
      <Card.Body>
        <Card.Subtitle>
          <strong>{dateStr}</strong>
        </Card.Subtitle>
        {day.weather && day.weather.length > 0 && (
          <img
            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt={day.weather[0].description}
            style={{ width: "70px", height: "70px" }}
          />
        )}
        <p className="mb-1 mt-1 fs-4">{Math.round(day.main.temp)}°C</p>
        <p className="small text-capitalize mb-0">{day.weather && day.weather.length > 0 ? day.weather[0].description : ""}</p>
      </Card.Body>
    </Card>
  );
};

export default ForecastCardWeather;
