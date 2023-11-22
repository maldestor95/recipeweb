<template>
  <div class="bg-red-100 container absolute top-0">
    <div @click="hidemenu = !hidemenu" class="absolute left-0 top-1 w-8 h-8 p-0">
      <!-- <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 30 24"
        stroke-width="3"
        stroke="currentColor"
        class="w-6 h-6 mx-auto my-auto"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 4h22M4 12h22M4 20h22"
        />
      </svg> -->
      <img src="/public/logo.svg" />
    </div>
    <recipeListForm
      class="mt-1"
      v-if="hidemenu == false"
      :recipe-list="recipeList"
      @choice="
        (e) => {
          changerecipe(e);
          hidemenu = true;
        }
      "
    ></recipeListForm>
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
// import menubtn from "../../components/menubtn.vue";

const recipeList = ref([{ title: "testa", link: "linktest" }]);
const recipechosen = ref("sample recipe chosen");
const recipeDetails = ref(`# sample details`);
const hidemenu = ref(true);

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
