import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [gameTitle, setGameTitle] = useState("");
  const [searchGames, setSearchGames] = useState([]);
  const [gameDeals, setGameDeals] = useState([]);

  const searchGame = () => {
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=3`)
      .then((response) => response.json())
      .then((data) => {
        setSearchGames(data);
      });
  };

  useEffect(() => {
    fetch(
      `https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15&pageSize=3`
    )
      .then((response) => response.json())
      .then((data) => {
        setGameDeals(data);
      });
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-y-2">
        <h1>search for a game</h1>
        <input type="text" onChange={(e) => setGameTitle(e.target.value)} />
        <button onClick={searchGame}>search game</button>

        <div>
          {searchGames.map((game, key) => (
            <div key={key}>{game.external}</div>
          ))}
        </div>
      </div>
      <div>
        <h1>latest deals</h1>

        <div>
          {gameDeals.map((game, key) => (
            <div key={key}>{game.title}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
