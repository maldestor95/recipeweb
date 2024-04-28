<template>
  <div v-if="recipe.title != 'nodisplay'" class="lg:rounded-xl lg:mt-6 lg:shadow-2xl">
    <div class="flex ">
      <div class="basis-2/12"></div>
      <h2 class="basis-10/12">{{ recipe.title }}</h2>
    </div>

    <div class="h-10"></div>
    
    <div class="container  flex flex-row mx-auto">

      <div class="basis-10/12">

        <ul v-for="ing in recipe.ingredients" :key="ing.ingredient">
          <li class="grid grid-cols-2">
            <div class="capitalize text-left">{{ ing.ingredient }}</div>
            <div class="text-left">{{ ing.qty }}</div>
          </li>
        </ul>
      </div>
      <div class="basis-1/12 relative"> 

        <toast text="Copied To Clipboard" :show-toast="showToast" @update:show-toast="showToast=false" timeout-in-seconds="2">
          <button @click="copyToClipboard(); showToast=true">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
            </svg>
          </button>
        </toast>
      </div>
    </div>
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
import toast from "../../components/toast.vue"


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
const showToast= ref(false)
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

const copyToClipboard= ()=>{
  const ingredientsForRecipe=recipe.value.ingredients.map(k=>{return `${k.ingredient}\t${k.qty}`}).join('\n')
 navigator.clipboard.writeText(ingredientsForRecipe)
}
</script>

