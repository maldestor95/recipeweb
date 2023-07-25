<template>
  <div>
    <h1>{{ props.title }}</h1>
    <p class="pt-4 bg-yellow-100">{{ extractMetaData(recipeDetails) }}</p>
    <p class="pt-4 bg-yellow-100">{{ extractProcess(recipeDetails) }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import YAML from "yaml";

const props = defineProps({
  title: { type: String, required: true },
  recipeDetails: { type: String, required: true },
});

type metaData = {
  title: string;
  link: string;
  ingredients: { ingredient: string; qty: string }[];
};
function extractMetaData(recipe: string): metaData {
  const endYamlPosition = recipe.indexOf("...");
  return YAML.parse(recipe.substring(0, endYamlPosition + 3)) as metaData;
}
function extractProcess(recipe: string): string {
  const endYamlPosition = recipe.indexOf("...");
  return recipe.substring(endYamlPosition + 3);
}
const dummyRecipe = ref(`
---
title: Gauffres
link:  gauffres.md

ingredients:
- ingredient: Farine
  qty: 500g
- ingredient: Oeufs
  qty: 5
- ingredient: Sucre vanillé
  qty: 1 sachet
- ingredient: Lait
  qty: 650ml
- ingredient: Carré de levure
  qty: 1
- ingredient: Beurre
  qty: 200g
...
Préparer levure

Fondre le beurre

Mélanger et laisser monter
`);
</script>

<style scoped></style>

<script lang="ts"></script>
