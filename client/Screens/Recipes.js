import React from "react";
import { StyleSheet } from "react-native";

import RecipeHeader from "../components/RecipeHeader";
import Layout from "../components/Layout";
import RecipeList from "../components/RecipeList";

export default function Recipes() {
  return (
    <>
      <RecipeHeader />
      <Layout />
      <RecipeList />
    </>
  );
}

const styles = StyleSheet.create({});
