<template>
  <!-- <div class="grid grid-cols-[200px_1fr]"> -->
  <div class="flex bg-red-100 items-start absolute top-3 mx-auto">
    <menubtn>
      <recipeListForm
        :recipe-list="recipeList"
        @choice="(e) => changerecipe(e)"
      ></recipeListForm>
    </menubtn>
    <recipeView
      :title="recipechosen"
      :recipeDetails="recipeDetails"
      class=""
    ></recipeView>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import methods from "./methods";
import recipeListForm from "./recipelist.vue";
import recipeView from "./recipeview.vue";
import menubtn from "../../components/menubtn.vue";

const recipeList = ref([{ title: "testa", link: "linktest" }]);
const recipechosen = ref("sample recipe chosen");
const recipeDetails = ref(`# sample details`);

onMounted(async () => {
  recipeList.value = await methods.fetchList();
});

async function changerecipe(recipeTitle: string) {
  recipechosen.value = recipeList.value.filter(
    (rr) => rr.title.toUpperCase() == recipeTitle.toUpperCase()
  )[0].title;
  const link = recipeList.value.filter(
    (rr) => rr.title.toUpperCase() == recipeTitle.toUpperCase()
  )[0].link;
  recipeDetails.value = await methods.fetchRecipe(link);
}
</script>

<style scoped></style>
