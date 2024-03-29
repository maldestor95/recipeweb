<template>
  <div v-if="recipe.title != 'nodisplay'" class="lg:rounded-xl lg:mt-6 lg:shadow-2xl">
    <div class="flex ">
      <div class="basis-3/12"></div>
      <h2>{{ recipe.title }}</h2>
    </div>

    <div class="h-10"></div>
    
    <ul v-for="ing in recipe.ingredients" :key="ing.ingredient">
      <li class="grid grid-cols-2">
        <div class="capitalize text-left">{{ ing.ingredient }}</div>
        <div class="text-left">{{ ing.qty }}</div>
      </li>
    </ul>

    <div class="h-10"></div>

    <div class="text-start">
      <vuemarkdownit :source="recipe.process"></vuemarkdownit>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import vuemarkdownit from "../../components/vuemarkdownit.vue";
import metaData from "./methods.ts";

export interface Props {
  title: string;
  recipeDetails: string;
  msg?: string;
  labels?: string[];
}
const dummyRecipe = `
---
title: Gauffres
link:  gauffres.md

ingredients:
- ingredient: Farine
  qty: 500g
- ingredient: Beurre
  qty: 200g
...
# Steps dummy recipe
Fondre le beurre
Mélanger et laisser monter
`;
const props = defineProps({
  title: { type: String, default: "test title" },
  recipeDetails: { type: String, default: () => dummyRecipe },
});

const recipe = ref({
  title: "nodisplay",
  link: "string",
  ingredients: [{ ingredient: "string", qty: "string" }],
  process: "process",
});

onMounted(() => {
  recipe.value.process = metaData.extractProcess(props.recipeDetails);
});

watch(
  () => props.recipeDetails,
  (newElt) => {
    recipe.value.process = metaData.extractProcess(newElt);
    recipe.value.ingredients = metaData.extractMetaData(newElt).ingredients;
    recipe.value.title = metaData.extractMetaData(newElt).title;
  }
);
</script>

