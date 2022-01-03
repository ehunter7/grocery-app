import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import RecipeHeader from "../components/RecipeHeader";
import Layout from "../components/Layout";
import RecipeList from "../components/RecipeList";
import RecipeGrid from "../components/RecipeGrid";
import RecipeCard from "./RecipeCard";
import SearchBar from "../components/SearchBar";
import AppTabs from "../components/AppTabs";

export default function Recipes({ navigation }) {
  const [recipeList, setRecipeList] = useState([]);
  const [layout, setLayout] = useState("grid");
  const [searchBar, setSearchBar] = useState(false);

  const recipes = [
    {
      name: "Dirty Rice",
      image: "blue",
      star: true,
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
      star: true,
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
    const updateRecipes = recipeList.map((recipe) => {
      if (item.name === recipe.name) {
        return { ...recipe, star: !recipe.star };
      }
      return recipe;
    });
    setRecipeList(updateRecipes);
  }

  function handleGetRecipe(data) {
    navigation.navigate("RecipeDetails", {
      recipe: { name: data.name, image: data.image },
    });
  }

  function handleLayout(name) {
    switch (name) {
      case "search":
        setSearchBar(true);
        break;
      case "star":
        //will filter by starred recipes
        handleFilter();
        break;
      default:
        setLayout(name);
        break;
    }
  }

  function handleFilter() {
    const filteredRecipes = recipeList.filter((item) => item.star === true);
    setRecipeList(filteredRecipes);
  }

  function handleSearch(input) {
    var searchRecipes;
    if (input !== "") {
      searchRecipes = recipes.filter((item) => {
        return (item.name.toLowerCase() + "").includes(input.toLowerCase());
      });
    } else {
      searchRecipes = recipes;
    }

    setRecipeList(searchRecipes);
  }

  return (
    <>
      <RecipeHeader />
      <View style={{ flex: 0.45 }}>
        {searchBar ? (
          <SearchBar handleSearch={handleSearch} />
        ) : (
          <Layout handleLayout={handleLayout} />
        )}
      </View>
      <View style={{ flexGrow: 3 }}>
        {layout !== "grid" ? (
          <RecipeList
            starRecipe={starRecipe}
            recipeList={recipeList}
            handleGetRecipe={handleGetRecipe}
          />
        ) : (
          <RecipeGrid
            recipeList={recipeList}
            handleGetRecipe={handleGetRecipe}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
