<template>
  <div class="container px-2">
    <h1 class="ml-10 ">Carnet de recettes</h1>

    <p class="text-justify mt-2">
      Ici vous êtes bien loin d'une ambition d'avoir un recueil exhaustif de recettes, de
      trop nombreux livres et sites web existent pour vouloir les concurrencer. L'objectif
      principal est d'avoir à portée de main, dans ma cuisine, les recettes que nous
      apprécions.
    </p>

    <p class="mt-10 flex">
      Pour retourner sur le site pricincipal, cela se passe
      <a href="https://maldestor95.github.io/">ici</a>
    </p>
    <p class="flex">
        Depuis une recette, Appuyer sur <keyIcons class="mx-1 pt-0.5"></keyIcons> lancera une nouvelle recherche
    </p>

  <section >
    <p>Le bouton     
    <button @click="showRecipeListLink=!showRecipeListLink" class="-mt-3 mx-2">check recipeListLink</button>
    lance la verifier l'indexation des recettes sur https://github.com/maldestor95/recipebook</p>
    
    <recipeListCheck v-if="showRecipeListLink"></recipeListCheck>
  </section>
    
    <div class="flex flex-row justify-center mt-40">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Copyright.svg"
        class="h-6"
        alt=""
      />
      <span class="ml-6"> Maldestor95 -- 2024 </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import recipeListCheck from './recipelinkscheck.vue';
import keyIcons from '../../components/keyIcons.vue';
const showRecipeListLink=ref(false)

</script>
<style scoped>
p {
  @apply mb-2
}</style>
