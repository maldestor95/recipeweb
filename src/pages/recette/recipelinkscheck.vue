<template>
<div class="container shadow-2xl  mx-auto max-w-lg rounded-lg py-4 my-4">
    <h1>Check Recipe links are not broken</h1>
    <p>If some links are broken,  please fix on github 
        <a href="https://github.com/maldestor95/recipebook/tree/master/recipe" target="_blank">
            recipebook
        </a>
    </p>
    
    <p v-if="nbBrokenLinks>0" class="text-red-400"> there is {{ nbBrokenLinks }} broken links</p>

    <div class="h-96 overflow-auto ml-2 my-4">

        <div v-for="item in overview" class="flex overflow-y-auto">
            <div class="flex pr-2">
                <svg v-if="item.status!=404" class="w-6 h-6 "
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" >
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            
            <svg v-if="item.status==404"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
        </div>
        <div class="w-96 text-left ">
            {{ item.link }}
            </div>        

        </div>
    </div>    

    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import methods from './methods';

    const recipeListStatus=ref([] as Array<{content:string,status:number}>)
    const recipeListRef=ref([] as Array<{ title: string; link: string; }>)
    
onMounted(async () => {
  const recipeList = await methods.fetchList();
 recipeListRef.value=recipeList

  const recipeFetchPromise=recipeList.map(rr=>methods.fetchRecipe(rr.link))
  recipeListStatus.value=await Promise.all(recipeFetchPromise)
  

});

const overview= computed(()=>{
    const rr=[]
       for (let index = 0; index < recipeListRef.value.length; index++) {
        try {

                rr.push({"link":recipeListRef.value[index].link,"status":recipeListStatus.value[index].status})
        }
        catch
        {

        }
       }
       return rr
    }
        
)
const nbBrokenLinks=computed(()=>{
    return overview.value.filter(ov=>ov.status==404).length
})
</script>

<style scoped>

</style>