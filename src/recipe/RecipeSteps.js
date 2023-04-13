import './RecipeSteps.scss';

export function RecipeSteps(props) {
  let maxOrder = Math.max(...props.recipeSteps.map(it => it.order)) + 1

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

function RecipeStep(props) {
  return props.editMode
    ? <RecipeStepEditMode {...props} />
    : <RecipeStepViewMode recipeStep={props.recipeStep} />
}

function RecipeStepEditMode(props) {
  const recipeStep = props.recipeStep
  return (
    <li>
      {recipeStep.order}. <textarea name="text" defaultValue={recipeStep.text} onChange={props.updateFieldChanged(recipeStep.order)} />
      <button type="button" onClick={() => props.removeRecipeStep(recipeStep.order)}>x</button>
    </li>
  )
}

function RecipeStepViewMode({ recipeStep }) {
  return (
    <li>{recipeStep.order}. {recipeStep.text}</li>
  )
}

const emptyRecipeStep = order => {
  return {text: "", order: order}
}
