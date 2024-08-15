
interface Callback {
  (message:string):void
}
// https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/

function ctrlK_Pressed(event:KeyboardEvent,callback:Callback) {
      if  (event.ctrlKey && event.key === 'k') {
        event.preventDefault(); 
        callback('ctrl+K')
      }
      if  ( event.key === 'ArrowUp') {
        event.preventDefault(); 
        callback('ArrowUp')
      }
      if  (event.key === 'ArrowDown') {
        event.preventDefault(); 
        callback('ArrowDown')
      }
      if  ( event.key === 'Enter') {
        event.preventDefault(); 
        callback('Enter')
      }
    }

  export default ctrlK_Pressed