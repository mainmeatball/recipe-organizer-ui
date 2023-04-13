import { Link } from 'react-router-dom';
import './Recipes.scss';

export function Recipes({ recipes }) {
  const recipeList = recipes.map(recipe => 
    <RecipeGlobalView 
      key={recipe.id.toString()} 
      recipe={recipe}
    />
  )
  return (
    <div className='recipe-list'>
      {recipeList}
    </div>
  )
}

function RecipeGlobalView({ recipe }) {
  return (
    <Link to={recipeLink(recipe.id)} className='link'>
      <div className='recipe-global-view'>
        <ul key={recipe.id} className='nobull'>
          <div>
            <li>Id: {recipe.id}</li>
            <li>Name: {recipe.name}</li>
            <li>Descripton: {recipe.description}</li>
            <li>Type: {recipe.recipeType}</li>
          </div>
        </ul>
      </div>
    </Link>
  )
}

function recipeLink(id) {
  return `/recipe?id=${id}`
}