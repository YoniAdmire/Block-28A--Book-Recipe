import { useEffect, useState } from 'react';

export default function Favorites({ token }) {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    fetch("https://fsa-recipe.up.railway.app/api/favorites", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.json()).then(data => setFavorites(data.data));
  }, [token]);

  const remove = async (id) => {
    await fetch(`https://fsa-recipe.up.railway.app/api/favorites/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    setFavorites(favorites.filter(f => f.id !== id));
  };

  return (
    <div>
      <h2>Favorites</h2>
      <div>
        {favorites.map(f => (
          <div key={f.id}>
            <h3>{f.name}</h3>
            <img src={f.imageUrl} alt={f.name} width="200" />
            <p>{f.strArea}</p>
            <button onClick={() => remove(f.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
