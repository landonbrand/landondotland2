import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const csv=require("csvtojson");

const Tune = (props) => {
  let { id } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [thisTune, setThisTune] = useState(false);

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

    console.log('id is', id);
    const justThisTuneArr = parsed.filter(x => x.Name === id);
    const justThisTune = justThisTuneArr[0];
    setThisTune(justThisTune);
    console.log('justThisTune', justThisTune);

    setIsLoading(false);
  }, []);

  return <div className="outermost">
    {thisTune &&
      <div>
        <img src={thisTune.Image} />
        <h1>{thisTune.Name}</h1>
        <h2>{thisTune.Artist}</h2>
        <p className="summary">{thisTune.Summary}</p>
        <div className="paradiv" dangerouslySetInnerHTML={{__html: thisTune.Content}}></div>
        {thisTune.Favorites &&
          <p>
            Favorite Songs: {thisTune.Favorites}
          </p>
        }
      </div>
    }
  </div>
}
export default Tune;