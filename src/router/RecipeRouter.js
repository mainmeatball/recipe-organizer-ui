import React from 'react';
import { useRoutes } from "react-router-dom"
import HomePage from '../recipes/HomePage';
import Recipe from '../recipe/Recipe'

const app = <HomePage />
export function RecipeRouter() {
  const routes = useRoutes(
    [
      {
        path: "/*",
        element: app
      },
      {
        path: "/home/*",
        element: app
      },
      {
        path: "/recipes/*",
        element: app
      },
      {
        path: "/recipe/*",
        element: <Recipe />
      }
    ]
  )
  return routes
}