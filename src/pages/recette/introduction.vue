<template>
  <div class="container px-2">
    <h1 class="ml-10 debug">Carnet de recettes</h1>

    <p class="text-justify mt-2">
      Ici vous êtes bien loin d'une ambition d'avoir un recueil exhaustif de recettes, de
      trop nombreux livres et sites web existent pour vouloir les concurrencer. L'objectif
      principal est d'avoir à portée de main, dans ma cuisine, les recettes que nous
      apprécions.
    </p>

    <p class="mt-10">
      Pour retourner sur le site pricincipal, cela se passe
      <a href="https://maldestor95.github.io/">ici</a>
    </p>

    <div class="flex flex-row justify-center mt-8">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Copyright.svg"
        class="h-6"
        alt=""
      />
      <span class="ml-6"> Maldestor95 -- 2023 </span>
    </div>
  </div>
  <section class="container pt-10">
    <button @click="showRecipeListLink=!showRecipeListLink">check recipeListLink</button>
    <recipeListCheck v-if="showRecipeListLink"></recipeListCheck>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import recipeListCheck from './recipelinkscheck.vue';
const showRecipeListLink=ref(false)

</script>

