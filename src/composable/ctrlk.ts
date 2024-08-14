// mouse.js
import { ref, onMounted, onUnmounted } from 'vue'

// by convention, composable function names start with "use"
export function ctrlKey() {
  // state encapsulated and managed by the composable
  const ctrlKey = ref(0)
  

  // a composable can update its managed state over time.
  function update(event:KeyboardEvent) {
      if  (event.ctrlKey && event.key === 'k') {ctrlKey.value+=1
      event.preventDefault(); // Prevents the default browser action for Ctrl+K
      console.log(`Ctrl+K ${ctrlKey.value}`);
      }
    }

  // a composable can also hook into its owner component's
  // lifecycle to setup and teardown side effects.
    onMounted(() => window.addEventListener('keydown', update))
    onUnmounted(() => window.removeEventListener('keydown', update))

  // expose managed state as return value
    return { ctrlKey }
}