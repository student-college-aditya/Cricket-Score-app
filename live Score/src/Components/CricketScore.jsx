import React, { useEffect, useState } from "react";
import circle from "./circle.jpg";

const CricketScore = () => {
  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState("");
  const [search, setSearch] = useState("");

  const getData = async (searchQuery = "") => {
    try {
      const url = searchQuery
        ? `https://api.cricapi.com/v1/cricScore?apikey=0328c2e4-976d-4f98-a46c-16b370991bbc&search=${searchQuery}`
        : "https://api.cricapi.com/v1/cricScore?apikey=0328c2e4-976d-4f98-a46c-16b370991bbc";
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
      setData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData(search);
  }, [search]);

  const handleInput = (e) => {
    setInputData(e.target.value);
  };

  const handleBtn = () => {
    setSearch(inputData);
  };

  return (
    <div className="main-container">
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search Match, series"
          value={inputData}
          onChange={handleInput}
        />
        <button onClick={handleBtn}>Search</button>
      </div>
      <div className="heading">
        <img src={circle} alt="Logo" />
        <p>Live Cricket Score App</p>
      </div>

      <div className="container">
        {data.length > 0 ? (
          data.map((curVal, index) => {
            if (curVal.status !== "Match not started") {
              return (
                <div className="card" key={index}>
                  <h3>{curVal.series}</h3>
                  <h3>{curVal.matchType}</h3>
                  <div className="img">
                    <div>
                      <img src={curVal.t1img} alt={curVal.t1} />
                      <p>{curVal.t1}</p>
                      <p>{curVal.t1s}</p>
                    </div>
                    <div>
                      <img src={curVal.t2img} alt={curVal.t2} />
                      <p>{curVal.t2}</p>
                      <p>{curVal.t2s}</p>
                    </div>
                  </div>
                  <p className="status">Status : {curVal.status}</p>
                </div>
              );
            }
            return null;
          })
        ) : (
          <p>Data Not Found!</p>
        )}
      </div>
    </div>
  );
};

export default CricketScore;
