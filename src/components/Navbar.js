import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [weather, setWeather] = useState(null);

  const handleOpen = () => {
    setOpen(!open);
  };

  const getWeather = async (signal) => {
    axios
      .get(
        'https://45g3yob2rb6l4jnrlnwcbcsiju0qemxk.lambda-url.ap-southeast-1.on.aws/',
        signal
      )
      .then((res) => {
        const weatherData = res.data;
        console.log(weatherData);
        setWeather(weatherData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    const abortCont = new AbortController();
    getWeather({ signal: abortCont.signal });

    return () => abortCont.abort();
  }, []);

  if (!weather) return null;

  return (
    <nav className="navbar">
      <h1>My Contacts</h1>
      <div className="links">
        <button onClick={handleOpen}>Weather Forecast</button>
        {open ? (
          <div className="menu">
            {weather.map((period) => (
              <div className="period" key={period.time}>
                {period.time.split('T')[1].substring(0, 5)} {period.forecast}
              </div>
            ))}
          </div>
        ) : null}
        <Link to="/">Home</Link>
        <Link to="/create">New Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
