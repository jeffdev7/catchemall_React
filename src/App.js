import React, { useState, useEffect } from "react";
import List from "./List";
import axios from "axios";
import Pages from "./Pages";
import './App.css';

function App() {
  
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPage] = useState();
  const [prevPageUrl, setPrevPage] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setLoading(false);
        setNextPage(res.data.next);
        setPrevPage(res.data.previous);
        setPokemon(res.data.results.map((p) => p.name));
      });

    return () => cancel();
  }, [currentPageUrl]);

  function goNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }
  function goPrevPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  if (loading) return "Loading...";

  return (
    <>
    <div className="title">
    <h1>Catch 'em all</h1>
    <img src="https://th.bing.com/th/id/R.c2f24f90df598ac78745c980e4120b3c?rik=F83hllt26gNaBQ&riu=http%3a%2f%2fpngimg.com%2fuploads%2fpokeball%2fpokeball_PNG21.png&ehk=z2WiNK5V45zCw775fVDCmcVcc3ybnGFIfpYgj7V69WE%3d&risl=&pid=ImgRaw&r=0" width="100" height="100"/>
    </div>
      <List pokemon={pokemon} />
      <Pages goNextPage={goNextPage ? goNextPage : null} 
      goNextPage={goPrevPage ? goPrevPage : null} />
    </>
  );
}

export default App;
