import "./App.css";
import { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Header from "./components/Header";
import Country from "./components/Country";
import CountryDetails from "./components/CountryDetails";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const countriesInputRef = useRef();
  const regionRef = useRef();

  const switchMode = () => {
    setDarkMode((prevState) => !prevState);
  };

  useEffect(() => {
    setLoading(true);
    fetch("https://restcountries.com/v2/all")
      .then((res) => res.json())
      .then((countries) => {
        setCountries(countries);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  const searchCountries = () => {
    const inputValue = countriesInputRef.current.value;

    if (inputValue.trim()) {
      // const fetchSearchData = async () => {
      //   const response = await fetch(
      //     `https://restcountries.com/v2/name/${inputValue}`
      //   );
      //   const data = response.json();

      //   setCountries(data);
      // };

      // try {
      //   fetchSearchData();
      // } catch (error) {
      //   console.log(error);
      // }

      fetch(`https://restcountries.com/v2/name/${inputValue}`)
        .then((res) => res.json())
        .then((countries) => {
          setCountries(countries);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      fetch("https://restcountries.com/v2/all")
        .then((res) => res.json())
        .then((countries) => {
          setCountries(countries);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className={`app ${darkMode ? "darkMode" : ""}`}>
      <Header onClick={switchMode} darkMode={darkMode} />

      <Routes>
        <Route
          path="/"
          element={
            <div className="app_body">
              <div className="inputs">
                <div className={`search_input ${darkMode ? "darkMode" : ""}`}>
                  <SearchIcon />
                  <input
                    type="text"
                    placeholder="Search for a country"
                    ref={countriesInputRef}
                    onChange={searchCountries}
                  />
                </div>
                <div className={`select_region ${darkMode ? "darkMode" : ""}`}>
                  <select ref={regionRef}>
                    <option value="">All</option>
                    <option value="">Africa</option>
                    <option value="">America</option>
                    <option value="">Asia</option>
                    <option value="">Europe</option>
                    <option value="">Oceania</option>
                  </select>
                </div>
              </div>

              <div className="countries">
                {countries.map((country) => {
                  return (
                    <Country
                      darkMode={darkMode}
                      key={country.alpha3Code}
                      code={country.alpha3Code}
                      name={country.name}
                      capital={country.capital}
                      population={country.population}
                      region={country.region}
                      flag={country.flag}
                    />
                  );
                })}
              </div>
            </div>
          }
        />

        <Route
          path="country-details"
          element={<CountryDetails darkMode={darkMode} />}
        />
      </Routes>
    </div>
  );
}

export default App;
