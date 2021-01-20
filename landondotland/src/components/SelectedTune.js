import React from 'react';

const SelectedTune = (props) => {
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

  return <div>
    u selected {props.Name}
  </div>
}

export default SelectedTune;