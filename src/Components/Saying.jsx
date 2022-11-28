import React, { useEffect, useState } from "react";
import { IoIosCopy, IoLogoTwitter } from "react-icons/io";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import "./Sayings.scss";
const Saying = () => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scale, setScale] = useState(1.1);
  async function getData() {
    try {
      const res = await fetch(
        "https://node-api-tbxp.onrender.com/sayings"
      );
      if (!res.ok) {
        throw Error("ne mogu da fecujem");
      }
      const sayingData = await res.json();
      setData(sayingData);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  function tweet() {
    let tweetUrl = `https://twitter.com/intent/tweet?url=${
      data.saying + " - " + data.author
    }`;
    window.open(tweetUrl, "_blank");
  }
  function copy() {
    navigator.clipboard.writeText(data.saying + " - " + data.author);
  }

  return (
    <div className='container'>
      <div>
        <h1>Izreka dana</h1>
        <div className='quote-containr'>
          <div className='quote-area'>
            <i>
              <RiDoubleQuotesL />
            </i>
            <p className='quote'>{data.saying}</p>

            <i>
              <RiDoubleQuotesR />
            </i>
          </div>
          <div className='author'>
            {" "}
            <span>__</span> <span className='name'>{data.author}</span>{" "}
          </div>
        </div>
        <div className='buttons'>
          <ul>
            <li className='copy btn' onClick={copy}>
              <i>
                <IoIosCopy />
              </i>
            </li>
            <li className='tweet btn' onClick={tweet}>
              <i>
                <IoLogoTwitter />
              </i>
            </li>
          </ul>

          <button
            className={isLoading ? "btn loading" : "btn"}
            onClick={getData}
          >
            {isLoading ? "Loading" : "Nova Izreka"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Saying;
