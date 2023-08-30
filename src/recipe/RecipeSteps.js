import './RecipeSteps.scss';
import RecipeStep from './RecipeStep.js';


export function RecipeSteps(props) {
  let maxOrder = props.recipeSteps.length > 0 ? Math.max(...props.recipeSteps.map(it => it.order)) + 1 : 1

  const createRecipeStep = () => {
    const newRecipeStep = emptyRecipeStep(maxOrder++)
    props.setRecipeSteps([...props.recipeSteps, newRecipeStep])
  }

  const removeRecipeStep = orderToRemove => {
    const leftRecipeSteps = props.recipeSteps
      .filter(recipeStep => recipeStep.order !== orderToRemove)
      .map((recipeStep, i) => ({...recipeStep, order: i + 1}))
    props.setRecipeSteps(leftRecipeSteps)
  }

  const updateFieldChanged = order => e => {
    const newRecipeSteps = props.recipeSteps.map(recipeStep => {
      if (recipeStep.order !== order) {
        return recipeStep
      }
      const newRecipeStep = {...recipeStep, [e.target.name]: e.target.value}
      return newRecipeStep
    })
    props.setRecipeSteps(newRecipeSteps)
  }

  const recipeSteps = props.recipeSteps?.map(recipeStep => 
    <RecipeStep
      key={recipeStep.order?.toString()} 
      recipeStep={recipeStep}
      editMode={props.editMode}
      setRecipeSteps={props.setRecipeSteps}
      removeRecipeStep={removeRecipeStep}
      updateFieldChanged={order => updateFieldChanged(order)}
    />
  )
  return (
    <RecipeStepsDetails 
      recipeSteps={recipeSteps}
      editMode={props.editMode}
      setRecipeSteps={props.setRecipeSteps}
      createRecipeStep={createRecipeStep}
    />
  )
}

function RecipeStepsDetails(props) {
  return props.editMode
    ? <RecipeStepsEditMode {...props} />
    : <RecipeStepsViewMode recipeSteps={props.recipeSteps} />
}

function RecipeStepsEditMode(props) {
  return (
    <div>
      <RecipeStepsViewMode recipeSteps={props.recipeSteps} />
      <button type="button" onClick={props.createRecipeStep}>
        New recipe step
      </button>
    </div>
  )
}

function RecipeStepsViewMode({ recipeSteps }) {
  return (
    <ul className="nobull">
      {recipeSteps}
    </ul>
  )
}

const emptyRecipeStep = order => {
  return {text: "", order: order}
}
