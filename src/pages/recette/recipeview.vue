<template>
  <!-- workaround when computed recipe is not calculated-->
  <div v-if="recipe.metaData">
    <h1>{{ title }}</h1>

    <div v-for="ing in ingredients" :key="ing.ingredient" class="grid grid-cols-2">
      <div class="capitalize">{{ ing.ingredient }}</div>
      <div>{{ ing.qty }}</div>
    </div>

    <div class="text-start">
      <vuemarkdownit :source="recipe.process"></vuemarkdownit>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import vuemarkdownit from "../../components/vuemarkdownit.vue";
import metaData from "./methods.ts";

export interface Props {
  title: string;
  recipeDetails: string;
  msg?: string;
  labels?: string[];
}
const recipeMetaData = ref({
  title: "test",
  link: "testlink",
  ingredients: [{ ingredient: "1st ing", qty: "12" }],
});
const dummyRecipe = `
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
`;
const props = defineProps({
  title: { type: String, default: "test title" },
  recipeDetails: { type: String, default: () => dummyRecipe },
});

const recipe = computed(() => {
  const defaultRes = {
    metaData: {
      title: "string",
      link: "string",
      ingredients: [{ ingredient: "string", qty: "string" }],
    },
    process: "",
  };
  if (props.recipeDetails)
    return {
      metaData: metaData.extractMetaData(props.recipeDetails),
      process: metaData.extractProcess(props.recipeDetails),
    };
  else return defaultRes;
});

const ingredients = computed(() => {
  const defaultRes = [{ ingredient: "string", qty: "string" }];
  if (props.recipeDetails) {
    return metaData.extractMetaData(props.recipeDetails).ingredients;
  } else return defaultRes;
});
</script>

<style scoped></style>
