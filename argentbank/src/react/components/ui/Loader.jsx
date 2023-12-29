import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Loader = ({ timeout, loadingText }) => {
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => setOpacity(0), timeout - 500);
    const hideTimer = setTimeout(() => setVisible(false), timeout);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(hideTimer);
    };
  }, [timeout]);

  if (!visible) {
    return null;
  }

  return (
    <div className="loader-container" style={{ opacity }}>
      <div className="loader"></div>
      <span className="loader-text">{loadingText}</span>
    </div>
  );
};

Loader.propTypes = {
  timeout: PropTypes.number,
  loadingText: PropTypes.string,
};

Loader.defaultProps = {
  timeout: 5000,
  loadingText: "Loading...",
};

export default Loader;
