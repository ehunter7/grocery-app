import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";

import RecipeHeader from "../components/RecipeHeader";
import Layout from "../components/Layout";
import RecipeList from "../components/RecipeList";
import RecipeGrid from "../components/RecipeGrid";

export default function Recipes() {
  const [recipeList, setRecipeList] = useState([]);

  const recipes = [
    {
      name: "Dirty Rice",
      image: "blue",
      star: false,
    },
    {
      name: "Fried Rice",
      image: "yellow",
      star: false,
    },
    {
      name: "buff wings",
      star: false,
      image: "red",
    },
    {
      name: "noods",
      image: "white",
      star: false,
    },
    {
      name: "Pizza tika",
      image: "green",
      star: false,
    },
    {
      name: "chika peas",
      image: "orange",
      star: false,
    },
    {
      name: "Dirty Rice",
      image: "blue",
      star: false,
    },
    {
      name: "Fried Rice",
      image: "yellow",
      star: false,
    },
    {
      name: "buff wings",
      star: false,
      image: "red",
    },
    {
      name: "noods",
      image: "white",
      star: false,
    },
    {
      name: "Pizza tika",
      image: "green",
      star: false,
    },
    {
      name: "chika peas",
      image: "orange",
      star: false,
    },
    {
      name: "noods",
      image: "white",
      star: false,
    },
    {
      name: "Pizza tika",
      image: "green",
      star: false,
    },
    {
      name: "chika peas",
      image: "orange",
      star: false,
    },
    {
      name: "Dirty Rice",
      image: "blue",
      star: false,
    },
    {
      name: "Fried Rice",
      image: "yellow",
      star: false,
    },
    {
      name: "buff wings",
      star: false,
      image: "red",
    },
    {
      name: "noods",
      image: "white",
      star: false,
    },
    {
      name: "Pizza tika",
      image: "green",
      star: false,
    },
    {
      name: "chika peas",
      image: "orange",
      star: false,
    },
  ];

  //on mount get data and save it in state.
  //TODO: Look into using useMemo to get and save data
  useEffect(() => {
    setRecipeList(recipes);
  }, []);

  //Sets datas starred attribute to true or false
  function starRecipe(item) {
    //TODO: star is deselected when another star is pressed
    const updateRecipes = recipes.map((recipe) => {
      if (item.name === recipe.name) {
        return { ...recipe, star: !recipe.star };
      }
      return recipe;
    });
    setRecipeList(updateRecipes);
  }

  return (
    <>
      <RecipeHeader />
      <Layout />
      {/* <RecipeList starRecipe={starRecipe} recipeList={recipeList} /> */}
      <RecipeGrid recipeList={recipeList} />
    </>
  );
}

const styles = StyleSheet.create({});
