import { Link } from 'react-router-dom';
import { RecipeType } from '../enums/RecipeType';
import './Recipes.scss';

export function Recipes({ recipes, setRecipes }) {
  let maxIndex = recipes.length > 0 ? Math.max(...recipes.map(it => it.index)) + 1 : 1

  const addNewRecipe = () => {
    const newRecipe = emptyRecipe(maxIndex++)
    fetch('http://localhost:8080/recipes', {
      method: 'POST',
      body: JSON.stringify(newRecipe),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => fetch('http://localhost:8080/recipes'))
    .then(response => response.json())
    .then(recipes => {
      const sortedRecipes = recipes
        .sort((a, b) => parseInt(a.id) - parseInt(b.id))
        .map((it, i) => ({...it, index: i}))
      setRecipes(sortedRecipes)
    })
  }
  const removeRecipe = id => {
    fetch('http://localhost:8080/recipe?' + new URLSearchParams({id}), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => fetch('http://localhost:8080/recipes'))
    .then(response => response.json())
    .then(recipes => {
      const sortedRecipes = recipes
        .sort((a, b) => parseInt(a.id) - parseInt(b.id))
        .map((it, i) => ({...it, index: i}))
      setRecipes(sortedRecipes)
    })
  }

  const recipeList = recipes.map(recipe => 
    <RecipeGlobalView 
      key={recipe.index.toString()} 
      recipe={recipe}
      removeRecipe={removeRecipe}
    />
  )

  return (
    <div>
      <div className='recipe-list'>
        {recipeList}
      </div>
      <button className='header-button' onClick={addNewRecipe}>
          +
      </button>
    </div>
  )
}

function RecipeGlobalView(props) {
  const recipe = props.recipe
  return (
    <div>
      <button className='header-button' onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) props.removeRecipe(recipe.id)}}>
                -
      </button>
      <Link to={recipeLink(recipe.id)} className='link'>
        <div className='recipe-global-view'>
          <ul key={recipe.id} className='nobull'>
            <div>
              <li>Id: {recipe.id}</li>
              <li>Name: {recipe.name}</li>
              <li>Descripton: {recipe.description}</li>
              <li>Type: {RecipeType[recipe.recipeType]}</li>
            </div>
          </ul>
        </div>
      </Link>
    </div>
  )
}

function recipeLink(id) {
  return `/recipe?id=${id}`
}

const emptyRecipe = index => {
  return {name: "Test", description: "Test", recipeType: "SOUP", index: index}
}