import { useState, useEffect } from 'react';
import './HomePage.scss';
import { Recipes } from './Recipes';

export default function HomePage() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    fetch('http://localhost:9090/recipes')
        .then(response => response.json())
        .then(recipes => {
          const sortedRecipes = recipes
            .sort((a, b) => parseInt(a.id) - parseInt(b.id))
            .map((it, i) => ({...it, index: i}))
          setRecipes(sortedRecipes)
        })
  }, [])

  return (
    <div className="home-page">
      <h1>РЕЦЕПТЫ</h1>
      <Recipes 
        recipes={recipes} 
        setRecipes={setRecipes}/>
    </div>
  );
}
