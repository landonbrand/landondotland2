import React, { useState, useEffect } from 'react';
const csv=require("csvtojson");

const Tunes = () => {
  const [data, setData] = useState({});
  useEffect(async () => {
    // const url = 'https://spreadsheets.google.com/feeds/list/1x8TCnkhj_kPGAPj9X_yI5W26jiENdwRts0Q5mx6YpLw/1/public/basic?alt=json';
    // const res = await fetch(url);
    // console.log('res', res);
    // const json = await res.json();
    // console.log('json', json);
    // const feed = json.feed.entry;
    // console.log('feed', feed);

    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTr3NDsDqW3o_sgBxcz_0ox8By_2X4DsxZFP4YTB6L1fsi2Z0gdVjX7d1-QoUysTlGTPVFVwLd5bC1h/pub?output=tsv';
    const res = await fetch(url);
    console.log('res', res);
    const tsv = await res.text();
    const parsed = await csv({
      delimiter: '\t',
    })
      .fromString(tsv);
    console.log('parsed', parsed);


    // const parsedFeed = feed.map(x => x.content.$t);
    // console.log('parsedFeed', parsedFeed);
  });
  return <div>
    <h1>Tunes</h1>
    <p>Some of my favorite tunes</p>
    {/* {data.toString()} */}
  </div>
}
export default Tunes;