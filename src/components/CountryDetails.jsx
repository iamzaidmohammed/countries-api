import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

const CountryDetails = ({ darkMode, countries }) => {
  const params = useParams();
  const [country, setCountry] = useState([]);
  const navigate = useNavigate();

  let name;
  let flagImg;
  let nativeName;
  let population;
  let region;
  let subregion;
  let capital;
  let topLevelDomain;
  let currencies = [];
  let languages = [];
  let borders = [];

  countries.forEach((country) => {
    if (country.alpha3Code === params.countryCode) {
      name = country.name;
      flagImg = country.flag;
      nativeName = country.nativeName;
      population = country.population;
      region = country.region;
      subregion = country.subregion;
      capital = country.capital;
      topLevelDomain = country.topLevelDomain;

      country.currencies?.forEach((currency) => {
        currencies.push(currency.name);
      });

      country.languages?.forEach((language) => {
        languages.push(language.name);
      });

      country.borders?.forEach((border) => {
        borders.push(border);
      });
    }
  });

  const goBack = () => {
    navigate(`/`);
  };

  return (
    <div className="country_details">
      <button onClick={goBack} className={`back ${darkMode ? "darkMode" : ""}`}>
        <ArrowBackIcon />
        <p>Go Back</p>
      </button>

      <div className="country_details_body">
        <div className="img_container">
          <img src={flagImg} alt="" />
        </div>

        <div className="info">
          <h2>{name}</h2>
          <div className="info_container">
            <div className="left_info">
              <p>
                Native Name:{" "}
                <span className={`values ${darkMode ? "darkMode" : ""}`}>
                  {nativeName}
                </span>
              </p>
              <p>
                Population:{" "}
                <span className={`values ${darkMode ? "darkMode" : ""}`}>
                  {population}
                </span>
              </p>
              <p>
                Region:{" "}
                <span className={`values ${darkMode ? "darkMode" : ""}`}>
                  {region}
                </span>
              </p>
              <p>
                Sub region:{" "}
                <span className={`values ${darkMode ? "darkMode" : ""}`}>
                  {subregion}
                </span>
              </p>
              <p>
                Capital:{" "}
                <span className={`values ${darkMode ? "darkMode" : ""}`}>
                  {capital}
                </span>
              </p>
            </div>
            <div className="right_info">
              <p>
                Top-level Domain:{" "}
                <span className={`values ${darkMode ? "darkMode" : ""}`}>
                  {topLevelDomain}
                </span>
              </p>
              <p>
                Currency:
                {currencies.map((currency) => {
                  if (currencies.indexOf(currency) !== currencies.length - 1) {
                    return (
                      <span
                        key={currency}
                        className={`values ${darkMode ? "darkMode" : ""}`}
                      >
                        {" "}
                        {currency}
                      </span>
                    );
                  } else {
                    return (
                      <span
                        key={currency}
                        className={`values ${darkMode ? "darkMode" : ""}`}
                      >
                        {" "}
                        {currency}
                      </span>
                    );
                  }
                })}
              </p>
              <p>
                Language:
                <span className={`values ${darkMode ? "darkMode" : ""}`}>
                  {languages.map((language) => {
                    if (languages.indexOf(language) !== languages.length - 1) {
                      return (
                        <span
                          key={language}
                          className={`values ${darkMode ? "darkMode" : ""}`}
                        >
                          {" "}
                          {language},
                        </span>
                      );
                    } else {
                      return (
                        <span
                          key={language}
                          className={`values ${darkMode ? "darkMode" : ""}`}
                        >
                          {" "}
                          {language}
                        </span>
                      );
                    }
                  })}
                </span>
              </p>
            </div>
          </div>
          Border Countries:
          {borders.length ? (
            borders.map((border) => {
              return (
                <div
                  key={border}
                  onClick={() => {
                    fetch("https://restcountries.com/v2/all")
                      .then((res) => res.json())
                      .then((country) => {
                        setCountry(country);
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                    navigate(`/${border}`);
                  }}
                  className={`border_country ${darkMode ? "darkMode" : ""}`}
                >
                  {border}
                </div>
              );
            })
          ) : (
            <div className={`border_country ${darkMode ? "darkMode" : ""}`}>
              <p>No borders...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
