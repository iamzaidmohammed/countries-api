import "./App.css";
import { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Header from "./components/Header";
import Country from "./components/Country";
import CountryDetails from "./components/CountryDetails";
import NotFound from "./components/NotFound";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const countriesInputRef = useRef();
  const regionRef = useRef();
  const navigate = useNavigate();
  const notFound = countries.status || countries.message;

  const switchMode = () => {
    setDarkMode((prevState) => !prevState);
  };

  useEffect(() => {
    setLoading(true);
    fetch("https://restcountries.com/v2/all")
      .then((res) => res.json())
      .then((countries) => {
        setAllCountries(countries);
        setFiltered(countries);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="load">
        <p className="loading">Loading...</p>;
      </div>
    );
  }

  const searchCountries = (e) => {
    const inputValue = e.target.value.toLowerCase();
    if (allCountries.length > 0) {
      const filteredItems = allCountries.filter((item) =>
        item.name.toLowerCase().includes(inputValue)
      );
      setFiltered(filteredItems);
    }
  };

  const filterCountries = (e) => {
    const selectValue = e.target.value.toLowerCase();
    console.log(selectValue);
    if (allCountries) {
      const filteredItems = allCountries.filter((item) =>
        item.region.toLowerCase().includes(selectValue)
      );
      setFiltered(filteredItems);
    }
  };

  const showDetails = (code) => {
    navigate(`/${code}`);
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
                    onChange={(e) => searchCountries(e)}
                  />
                </div>
                <div className={`select_region ${darkMode ? "darkMode" : ""}`}>
                  <select ref={regionRef} onChange={filterCountries}>
                    <option>All</option>
                    <option>Africa</option>
                    <option>Americas</option>
                    <option>Asia</option>
                    <option>Europe</option>
                    <option>Oceania</option>
                  </select>
                </div>
              </div>

              <div className="countries">
                {!notFound ? (
                  filtered.map((country) => {
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
                        showDetails={showDetails}
                      />
                    );
                  })
                ) : (
                  <NotFound />
                )}
              </div>
            </div>
          }
        />

        <Route
          path="/:countryCode"
          element={
            <CountryDetails
              darkMode={darkMode}
              countries={allCountries}
              refetch={fetch("https://restcountries.com/v2/all")
                .then((res) => res.json())
                .then((countries) => {
                  setCountries(countries);
                })
                .catch((error) => {
                  console.log(error);
                })}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
