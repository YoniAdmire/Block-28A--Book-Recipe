import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function RecipeDetail({ token }) {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  useEffect(() => {
    fetch(`https://fsa-recipe.up.railway.app/api/recipes/${id}`)
      .then(res => res.json())
      .then(setRecipe);
  }, [id]);

  const fav = () => fetch("https://fsa-recipe.up.railway.app/api/favorites", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      mealId: recipe.idMeal, name: recipe.strMeal,
      imageUrl: recipe.strMealThumb, strArea: recipe.strArea
    })
  });

  if (!recipe) return <p>Loading...</p>;

  return (
    <div>
      <h2>{recipe.strMeal}</h2>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} width="300" />
      <p>{recipe.strInstructions}</p>
      <ul>{recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}</ul>
      {token && <button onClick={fav}>Favorite</button>}
    </div>
  );
}