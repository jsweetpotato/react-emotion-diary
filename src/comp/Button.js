import React from "react";

const Button = ({ text, type, onClick }) => {
  const btnType = ["positive", "negative"].includes(type) ? type : "default";

  return (
    <button className={`btn btn_${btnType}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default React.memo(Button);
