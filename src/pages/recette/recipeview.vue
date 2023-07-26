<template>
  <div v-if="recipe.title != 'nodisplay'">
    <h1>{{ recipe.title }}</h1>

    <div v-for="ing in recipe.ingredients" :key="ing.ingredient" class="grid grid-cols-2">
      <div class="capitalize">{{ ing.ingredient }}</div>
      <div>{{ ing.qty }}</div>
    </div>

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
    // console.log(newElt);
    recipe.value.process = metaData.extractProcess(newElt);
    recipe.value.ingredients = metaData.extractMetaData(newElt).ingredients;
    recipe.value.title = metaData.extractMetaData(newElt).title;
  }
);

/*const recipeComputed = computed(() => {
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
});*/
</script>

<style scoped></style>
