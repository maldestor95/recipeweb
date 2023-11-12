<template>
  <div>
    <div>
      <input
        v-model="recipeSelection"
        type="text"
        class="border-2 border-blue-400 rounded-lg px-1"
      />
    </div>
    <div
      v-for="item in recipeListFiltered"
      :key="item.title"
      class="cursor-pointer text-left hover:bg-blue-400"
      @click="$emit('choice', item.title)"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed, ref } from "vue";
import { recipeListType } from "./methods";
const recipeSelection = ref("");

const props = defineProps({
  recipeList: { type: Object as PropType<recipeListType>, required: true },
});

const recipeListFiltered = computed(() => {
  // return [{ title: 13 }, { title: "aaa" }];
  return props.recipeList.filter((rl) =>
    rl.title.toUpperCase().includes(recipeSelection.value.toUpperCase())
  );
});
</script>

<style scoped></style>
