import RecipeSelect from '../util/RecipeSelect';
import './Ingredients.scss';

export function Ingredients(props) {
  let lastIndex = Math.max(...props.ingredients.map(it => it.index)) + 1
  const editMode = props.editMode
  const setIngredients = props.setIngredients
  const ingredients = props.ingredients

  const createIngredient = () => {
    const newIngredient = emptyIngredient(lastIndex++)
    setIngredients([...ingredients, newIngredient])
  }

  const removeIngredient = indexToRemove => {
    const newIngredients = ingredients.filter(ingredient => ingredient.index !== indexToRemove)
    setIngredients(newIngredients)
  }

  // const updateFieldChanged = index => (value, action) => {
  const updateFieldChanged = index => e => {
    const newIngredientList = ingredients.map(ingredient => {
      if (ingredient.index !== index) {
        return ingredient
      }
      // const newIngredient = {...ingredient, [action.name]: value}
      const newIngredient = {...ingredient, [e.target.name]: e.target.value}
      return newIngredient
    })
    setIngredients(newIngredientList)
  }

  const ingredientList = ingredients.map(ingredient =>
    <Ingredient 
        key={ingredient.index.toString()}
        index={ingredient.index}
        ingredient={ingredient} 
        editMode={editMode}
        removeIngredient={removeIngredient}
        handleOnChange={updateFieldChanged}
    />
  )
  return (
    <IngredientsDetails 
      ingredients={ingredientList}
      editMode={editMode}
      createIngredient={createIngredient}
    />
  )
}

function IngredientsDetails(props) {
  return props.editMode 
    ? <IngredientsEditMode {...props} /> 
    : <IngredientsViewMode {...props} />
}

function IngredientsEditMode(props) {
  return (
    <div>
      <IngredientsViewMode ingredients={props.ingredients} />
      <button type="button" onClick={props.createIngredient}>
        New Ingredient
      </button>
    </div>
  )
}

function IngredientsViewMode({ ingredients }) {
  return (
    <ul className="nobull">
      {ingredients}
    </ul>
  )
}

function Ingredient(props) {
  return props.editMode
    ? <IngredientEditMode {...props} /> 
    : <IngredientViewMode {...props} />
}

function IngredientEditMode(props) {
  const index = props.index
  const ingredient = props.ingredient
  const removeIngredient = props.removeIngredient
  const handleOnChange = props.handleOnChange

  return (
    <li>
      <input name="name" defaultValue={ingredient.name} onChange={handleOnChange(index)} />
      =
      <input name="quantity" type="number" defaultValue={ingredient.quantity} onChange={handleOnChange(index)} />
      <RecipeSelect 
        name="unitOfMeasure"
        value={ingredient.unitOfMeasure}
        onChange={handleOnChange(index)}
        enumOptions={UnitOfMeasure}
      />
      <button type="button" onClick={() => removeIngredient(ingredient.index)}>x</button>
    </li>
  )
}

function IngredientViewMode(props) {
  const ingredient = props.ingredient
  const unitOfMeasure = UnitOfMeasure[ingredient.unitOfMeasure]
  return (
    <li>{ingredient.name} = {ingredient.quantity} {unitOfMeasure}</li>
  )
}

const UnitOfMeasure = {
  GRAM: "г.",
  MILLILITER: "мл.",
  CUP: "стакан",
  TABLESPOON: "ст.л.",
  TEASPOON: "ч.л.",
  PIECE: "шт.",
}

const emptyIngredient = index => {
  return {name: "", unitOfMeasure: 'GRAM', quantity: 0.00, index: index}
}