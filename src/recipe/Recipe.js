import { Ingredients } from './Ingredients';
import { RecipeSteps } from './RecipeSteps';
import './Recipe.scss';
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import RecipeSelect from '../util/RecipeSelect';

export default function Recipe() {
  let [searchParams] = useSearchParams()

  const [recipe, setRecipe] = useState(null)
  const [ingredients, setIngredients] = useState([])
  const [recipeSteps, setRecipeSteps] = useState([])
  const [editMode, setEditMode] = useState(false)
  const initFields = recipe => {
    const ingredientsWithIndex = recipe.ingredients.map((it, i) => ({...it, index: i}))
    setIngredients(ingredientsWithIndex)
    setRecipeSteps(recipe.steps)
    setRecipe({...recipe, ingredients: ingredientsWithIndex})
  }

  useEffect(() => {
    const id = searchParams.get("id")
    fetch('http://localhost:8080/recipe?' + new URLSearchParams({id}))
        .then(response => response.json())
        .then(recipe => initFields(recipe))
  }, [searchParams])

  let navigate = useNavigate()
  const routeChange = () => { 
    let path = `..`
    navigate(path)
  }
  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  if (recipe == null) {
    return null
  }
  
  return (
    <div className='recipe'>
      <div className='buttons'>
        <button className='header-button' onClick={routeChange}>
          &lt;-
        </button>
        <button className='header-button' onClick={toggleEditMode}>
          Edit
        </button>
      </div>
      <RecipeDetails 
        recipe={recipe}
        setRecipe={setRecipe}
        editMode={editMode}
        toggleEditMode={toggleEditMode}
        ingredients={ingredients}
        setIngredients={setIngredients}
        recipeSteps={recipeSteps}
        setRecipeSteps={setRecipeSteps}
      />
    </div>
  )
}

function RecipeDetails(props) {
  return props.editMode 
    ? <RecipeEditMode {...props} /> 
    : <RecipeViewMode 
        recipe={props.recipe} 
        ingredients={props.ingredients} 
        recipeSteps={props.recipeSteps} 
      />
}

function RecipeEditMode(props) {
  const recipe = props.recipe

  const useSendPostToBackend = e => {
    e.preventDefault()

    const recipeToSend = {...recipe, ingredients: props.ingredients, steps: props.recipeSteps}
    props.setRecipe(recipeToSend)

    fetch('http://localhost:8080/recipes', {
      method: 'POST',
      body: JSON.stringify(recipeToSend),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(_ => props.toggleEditMode())
  }

  const updateRecipe = e => {
    props.setRecipe({...recipe, [e.target.name]: e.target.value})
  }

  return (
    <form onSubmit={useSendPostToBackend}>
      <ul className='nobull'>
        <div>
          <li>Id: {recipe.id}</li>
          <li>Название: <input name="name" defaultValue={recipe.name} onChange={updateRecipe} /></li>
          <li>Описание: <textarea name="description" defaultValue={recipe.description} onChange={updateRecipe} /></li>
          <li>Тип:
            <RecipeSelect 
              name="recipeType"
              value={recipe.recipeType}
              onChange={updateRecipe}
              enumOptions={RecipeType}
            />
          </li>
        </div>
        <div className='ingredient-list-frame'>
          <div>Ингредиенты</div>
          <div className='ingredient-list'>
            <li>
              <Ingredients 
                ingredients={props.ingredients} 
                editMode={true} 
                setIngredients={props.setIngredients}
              />
            </li>
          </div>
        </div>
        <div className='recipe-step-list-frame'>
        <div>Шаги</div>
          <div className='recipe-step-list'>
            <li>
              <RecipeSteps 
                recipeSteps={props.recipeSteps} 
                editMode={true} 
                setRecipeSteps={props.setRecipeSteps}
              />
            </li>
          </div>
        </div>
      </ul>
      <input type="submit"/>
    </form>
  )
}

function RecipeViewMode({ recipe, ingredients, recipeSteps }) {
  return (
    <ul className='nobull'>
      <div>
        <li>Id: {recipe.id}</li>
        <li>Название: {recipe.name}</li>
        <li>Описание: {recipe.description}</li>
        <li>Type: {RecipeType[recipe.recipeType]}</li>
      </div>
      <div className='ingredient-list-frame'>
        <div>Ингредиенты</div>
        <div className='ingredient-list'>
          <li>
            <Ingredients ingredients={ingredients} />
          </li>
        </div>
      </div>
      <div className='recipe-step-list-frame'>
      <div>Шаги</div>
        <div className='recipe-step-list'>
          <li>
            <RecipeSteps recipeSteps={recipeSteps} />
          </li>
        </div>
      </div>
    </ul>
  )
}

const RecipeType = {
  SOUP: "Суп",
  SALAD: "Салат",
  MAIN: "Горячее блюдо",
  BEVERAGE: "Напиток",
}