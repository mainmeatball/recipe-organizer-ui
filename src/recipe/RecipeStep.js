import './RecipeStep.scss';
import Image from '../components/Image.js';
import { useState, useEffect } from 'react';

export default function RecipeStep(props) {
  const [recipeStepImage, setRecipeStepImage] = useState(null)

  const handleFileChange = e => {
    if (e.target.files) {
      setRecipeStepImage(e.target.files[0]);
    }
  };

  return props.editMode
    ? <RecipeStepEditMode
        {...props}
        handleFileChange={handleFileChange}
      />
    : <RecipeStepViewMode 
        recipeStep={props.recipeStep}
        recipeStepImage={recipeStepImage}
      />
}

function RecipeStepEditMode(props) {
  const recipeStep = props.recipeStep
  return (
    <li className='recipe-step'>
      <h3 className='recipe-step-number'>Шаг {recipeStep.order}.</h3>
      <input type="file" onChange={props.handleFileChange}/>
      <textarea name="text" defaultValue={recipeStep.text} onChange={props.updateFieldChanged(recipeStep.order)} />
      <button type="button" onClick={() => props.removeRecipeStep(recipeStep.order)}>x</button>
    </li>
  )
}

function RecipeStepViewMode(props) {
  const recipeStep = props.recipeStep
  return (
    <li className='recipe-step'>
      <h3 className='recipe-step-number'>Шаг {recipeStep.order}.</h3>
      <Image imageId={recipeStep.imageId}/>
      <p className='recipe-step-text'>{recipeStep.text}</p>
    </li>
  )
}