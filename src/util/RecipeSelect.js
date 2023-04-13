import React from 'react'
import './RecipeSelect.scss'


export default function RecipeSelect(props) {
  const options = Object.entries(props.enumOptions).map(([key, value]) => (<option key={key} value={key}>{value}</option>))
  return (
    <select
      name={props.name}
      onChange={props.onChange}
      value={props.value}
    >
      {options}
    </select>
  )
}