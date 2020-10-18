import React from 'react';
import './App.css';

function Favorites() {
  const [favoritesList, setFavoritesList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getfavorites")
    .then((response) => {
      setFavoritesList(response.data);
    }); 
  }, []);  

  return (
    <div>
      <h1>Favorites</h1>
      {favoritesList.map((val) => {
        return (
        <p>
          movieid: {val.movieid}
        </p>
        );
      })}
    
    </div>
  );
}

export default Favorites;
