import React, { useState, useEffect } from 'react';
import Block from '../components/Block';
const csv=require("csvtojson");

const Tunes = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(async () => {
    const localTunes = window.localStorage.getItem('tunes');
    if (localTunes) {
      setData(JSON.parse(localTunes));
      setIsLoading(false);
    }
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTr3NDsDqW3o_sgBxcz_0ox8By_2X4DsxZFP4YTB6L1fsi2Z0gdVjX7d1-QoUysTlGTPVFVwLd5bC1h/pub?output=tsv';
    const res = await fetch(url);
    console.log('res', res);
    const tsv = await res.text();
    const parsed = await csv({
      delimiter: '\t',
    })
      .fromString(tsv);

    setData(parsed);
    window.localStorage.setItem('tunes', JSON.stringify(parsed));
    setIsLoading(false);
  }, []);

  const displayData = data.map(x => Block(x));
  return <div>
    <h1>Tunes</h1>
    <div className="block-section">
      {isLoading && <p>Let me go find my favorite tunes for you :)</p>}
      {displayData}
    </div>
  </div>
}
export default Tunes;