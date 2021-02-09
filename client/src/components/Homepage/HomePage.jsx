import axios from "axios";
import React, { useEffect, useState } from "react";
import "./homepgae.styles.scss";

const HomePage = () => {
  const [dogData, setDogData] = useState("");
  const fetchRandomDogImage = async () => {
    const { data } = await axios.get("https://dog.ceo/api/breeds/image/random");
    setDogData(data.message);
  };

  useEffect(() => {
    fetchRandomDogImage();
  }, []);

  return (
    <div className="d-flex flex-column align-items-center">
      <img
        className="dog-image img-fluid rounded mx-auto d-block"
        src={dogData}
        alt="dogimage"
      />
      <p className="lead mt-3">
        <strong>Hello there</strong>
      </p>
    </div>
  );
};

export default HomePage;
