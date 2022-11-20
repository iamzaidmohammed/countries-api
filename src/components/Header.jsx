import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useState } from "react";

const Header = ({ onClick, darkMode }) => {
  const [darkModeText, setDarkModeText] = useState(true);

  const switchText = () => setDarkModeText(!darkModeText);

  return (
    <div className={`header ${darkMode ? "darkMode" : ""}`}>
      <div className="header_container">
        <h3 className="logo">Where in the world?</h3>
        <div className="switch_mode" onClick={onClick}>
          <DarkModeIcon onClick={switchText} />
          <h3 onClick={switchText}>
            {darkModeText ? "Dark Mode" : "Light Mode"}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Header;
