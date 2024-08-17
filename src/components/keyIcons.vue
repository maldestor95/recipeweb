<template>
  <div class="flex gap-0">
    <!-- CTRL -->
    <svg class="kbd h-5" viewBox="-1 3.5 17 8" >
      <path
        d="M 4.5 4.5 h 2 M 5.5 5.5 v 5 M 8.2 4.5 l 0.1 6 M 10 7.5 c 0.3 0.3 0.5 0.7 0.5 1 v 2 M 12.3 4.5 v 6 M 8.4 4.5 c 1.7 0 2.1 0 2.1 1.5 s -0.4 1.5 -2.1 1.5 M 3.2 9.3 c -0.1 0.4 -0.3 1.2 -1.2 1.2 C 1 10.5 0.5 9.5 0.5 8 V 7 c 0 -1.6 0.5 -2.5 1.5 -2.5 c 1 0 1.1 0.6 1.2 1.3 M 12.6 10.5 h 2"
        stroke="currentcolor"
        fill="none"
        stroke-linecap="square"     
      ></path>
    </svg>
    <!-- K -->
    <svg class="kbd h-5" viewBox="3 3.5 7 8" >
      <path
        d="M 4.5 4.5 v5 m 1 -2.5 l 2.5 -2.5 m -2.5 2.5 l 2.5 2.5 "
        stroke="currentcolor"
        fill="none"
        stroke-linecap="square"     
      ></path>
    </svg>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
/* linear-gradient(-225deg,#d5dbe4,#f8f8f8) */

.kbd {
  align-items: center;
  /* background: var(--docsearch-key-gradient); */
  background: linear-gradient(-225deg, #d5dbe4, #f8f8f8);
  border-radius: 3px;
  box-shadow: inset 0 -2px 0 0 #cdcde6,inset 0 0 1px 1px #fff,0 1px 2px 1px rgba(30,35,90,.4);
  /* color: var(--docsearch-muted-color); */
  color: #999;
  display: flex;
  justify-content: center;
  margin-right: 0.4em;
  position: relative;
  padding: 0 0 2px;
  border: 0;
  top: -1px;
  @apply font-bold w-auto;
}
</style>
