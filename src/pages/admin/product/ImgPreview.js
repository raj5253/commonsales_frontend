import React from "react";
import { useState } from "react";

const ImgPreview = ({ file }) => {
  const [preview, setPreview] = useState({});
  console.log(file);

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreview(reader.result); //blob
      }
    };
  }
  return (
    <div>
      <img src={preview} style={{ width: "150px" }} alt="" />
    </div>
  );
};

export default ImgPreview;

// now this is something called core of react
