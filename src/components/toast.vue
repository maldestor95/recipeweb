<template>
    <div :class="{toast:showToast,hidden:!showToast}">
        {{props.text}}
    </div>
    <slot>
      <button @click="showToast=!showToast">{{ props.text }}</button>
    </slot>
</template>

<script setup lang="ts">
import { watch } from 'vue';

interface Props {
  text: string;
  timeoutInSeconds: string
}
const props = withDefaults(defineProps<Props>(), {
  text: "sample text",
  timeoutInSeconds:"2"
});

const showToast=defineModel("showToast") 

watch(showToast,async(newValue)=>{
  if (newValue) {
    const delay= Number(props.timeoutInSeconds)*1000

    setTimeout(function(){
          console.log("timer finished, disable toast");
          showToast.value=false
    }, delay);
    console.log(showToast.value)}
})
</script>

<style scoped>
.toast {
  animation-duration: 4s;
  animation-name: toast;
  
  @apply bg-blue-300 p-4 rounded-lg absolute top-0 invisible 
}
@keyframes toast {
  0% {
    top: 0px;
   transform: translateY(0);
   opacity: 0;
   @apply visible
  }

  50% {
    transform: translateY(2rem);
    opacity: 1;
    @apply visible
  }
  100% {
    opacity: 0;
    @apply invisible hidden
  }

}
</style>

<!-- 
  HOW TO USE IT
  - have a ref 'ShowToast'
  <toast text="MyToast" :show-toast="showToast" @update:show-toast="showToast=false">
    <button @click="showToast=true">dispToast</button>
  </toast>

 -->