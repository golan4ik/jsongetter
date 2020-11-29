import React from "react";
import PropTypes from "prop-types";
import "./InputBox.css";

function InputBox({ url, disable, onChange, onApply }) {
  return (
    <div className="input-box-wrapper">
      <div className="input-box-content">
        <input
          disabled={disable}
          type="text"
          placeholder="Enter url to get JSON"
          value={url}
          onChange={(e) => onChange(e.target.value)}
        />
        <button disabled={disable} onClick={() => onApply()}>
          Apply
        </button>
      </div>
    </div>
  );
}

InputBox.propTypes = {
  onApply: PropTypes.func,
  onChange: PropTypes.func,
  url: PropTypes.string,
};

export default InputBox;
