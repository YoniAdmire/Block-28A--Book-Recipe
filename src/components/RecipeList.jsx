import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    fetch("https://fsa-recipe.up.railway.app/api/recipes")
      .then(res => res.json())
      .then(data => setRecipes(data.slice(0, 20)));
  }, []);

  return (
    <div className="recipe-wrapper">
      <h2>Recipes</h2>
      <div>
        {recipes.map(r => (
          <div key={r.idMeal}>
            <h3>{r.strMeal}</h3>
            <img src={r.strMealThumb} alt={r.strMeal} width="200" />
            <p>{r.strArea} | {r.strCategory}</p>
            <Link to={`/recipe/${r.idMeal}`}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
