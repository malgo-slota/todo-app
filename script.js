const toDoList = document.getElementById('todo-list');
const newInput = document.getElementById('new-input');


//change theme
const toggleTheme = document.getElementById('toggle-theme');

toggleTheme.addEventListener("click", () => {
   if(toggleTheme.checked){
      document.querySelector('body').classList.replace('theme-light', 'theme-dark');
   } else {
      document.querySelector('body').classList.replace('theme-dark', 'theme-light');
   }
   // [toggleTheme.checked ? 'theme-light' : 'theme-dark'];
});


// if (document.querySelector('.filter input[type="radio"]:checked').id === 'completed') {
//         elem.classList.add('hidden');
//     }

//when enter is pressed   
newInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {  
      e.preventDefault();
      checkInput();
      addNewToDo();
      howManyItems();
      newInput.value = ''
    }
})

//check input
function checkInput () {
   let newToDo = newInput.value;
   toDoArray.push(newToDo);  
}

//crreate new li item
function addNewToDo (){
   const listItem = document.createElement('li');

   listItem.innerHTML = `

         <li class="list-item-wrapper">
          
            <input type="checkbox" name="check" id="check"> 
            <label for="check"></label>

            <span class="checkbox-circle"></span> 
            <div class="list-item">
               ${newInput.value}
            </div>
            <input type="button" class="delete-btn">
        </li>
   `;

   toDoList.append(listItem);
}

//upadate items count, FIND BETTER WAY
const itemCounter = document.getElementById('item-counter');
const toDoArray = [];

function howManyItems (){
   let counter = toDoArray.length;
   if (counter === undefined || counter === null){
      itemCounter.innerHTML = 0;
   } else
   itemCounter.innerHTML = `${counter}`; 
}

//if it is checkd as done
   // const checkItem = document.querySelector('check');

   // toDoList.addEventListener('click', (e) => {
   //    if(e.target.classList.contains('list-item')){
   //       checkItem.classList.add('completed');
   //    }
      
   // }) 



//cross delete button, remove element
toDoList.addEventListener('click',(event) => {
    if (event.target.classList.contains('delete-btn')) {
        removeItem(event.target.parentElement);
        console.log('delete cross was clicked');
    }
});

function removeItem (listItem){
  listItem.remove();
  //item counter decreses -1

}

//remove all checked items





//filter elements by all, active or by default (switch case)
