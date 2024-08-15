<template>
  <div>

    <div class="flex pb-4 pt-6">
      <div class="basis-3/12"></div>
      <input
      v-model="recipeSelection"
      type="text"
      class="border-2 border-blue-400 rounded-lg basis-10/12"
      id="recipeSelection"
      />
      <div class="basis-3/12"></div>
    </div>
    <ul
      v-for="(item,id) in recipeListFiltered" :key="id"
      class="cursor-pointer text-left hover:bg-blue-400"
      @click="$emit('choice', item.title)"
    >
      <li class="test" :class="{'bg-blue-400 recipeSelected':id==hihglightedRecipeCounter}" :id="`recipe${id}`">
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed, onMounted, onUnmounted, ref, watch } from "vue";
import { recipeListType } from "./methods";
import ctrlK_Pressed from "../../helpers/ctrlk"

const recipeSelection = ref("");
const hihglightedRecipeCounter=ref(0)

const props = defineProps({
  recipeList: { type: Object as PropType<recipeListType>, required: true },
});

const recipeListFiltered = computed(() => {
  return props.recipeList.filter((rl) =>
    rl.title.toUpperCase().includes(recipeSelection.value.toUpperCase())
  );
});

watch(recipeListFiltered,()=>{hihglightedRecipeCounter.value=0})

const ctrlKListener=(ev:KeyboardEvent)=>{
    ctrlK_Pressed(ev,(message:string)=>{
      //console.log(message, hihglightedRecipeCounter.value)
      switch (message) {
        case 'ctrl+K':
            document.getElementById('recipeSelection')?.focus()
          break;
        case ('ArrowUp'):
          highlightPreviousFilteredRecipe()
        break;
        case ('ArrowDown'):
          highlightNextFilteredRecipe()
        break;
        case ('Enter'):
          //console.log(`$emit('choice',${recipeListFiltered.value[hihglightedRecipeCounter.value].title})`)
          document.getElementById(`recipe${hihglightedRecipeCounter.value}`)?.click()
        break;
        default:
          break;
      }
  })
}
function highlightNextFilteredRecipe(){
  if (hihglightedRecipeCounter.value<recipeListFiltered.value.length) {
    hihglightedRecipeCounter.value=hihglightedRecipeCounter.value+1  
  }
}
function highlightPreviousFilteredRecipe(){
  if (hihglightedRecipeCounter.value>0) {
    hihglightedRecipeCounter.value=hihglightedRecipeCounter.value-1
  }
}

onMounted(async () => {
  window.addEventListener('keydown',ctrlKListener)
  document.getElementById('recipeSelection')?.focus()
});

onUnmounted(()=>{
  window.removeEventListener('keydown',ctrlKListener)
})

</script>

<style scoped>
li:before {
  content: "\00BB";
  margin-right: 6px;
}
</style>
