//change theme
const toggleTheme = document.getElementById('toggle-theme');

toggleTheme.addEventListener("click", () => {
   if(toggleTheme.checked){
      document.querySelector('body').classList.replace('theme-light', 'theme-dark');
   } else {
      document.querySelector('body').classList.replace('theme-dark', 'theme-light');
   }
});

const toDoObjectList = [];

class ToDo {
   constructor(item){
      this.toDoList = item;
   }

   addItem(){
      const newInput = document.getElementById('new-input').value;
     
      if(newInput == ""){
         console.log("empty input")
      } else {
         const toDoObject = {
            id : toDoObjectList.length,
            txt : newInput,
            isCheck : false,
         }

         toDoObjectList.unshift(toDoObject);
         this.displayItem();
         document.getElementById('new-input').value = '';
        
      }  
   }

   countItems(){
      const itemCounter = document.getElementById('item-counter');
      let counter = toDoObjectList.length;
      
      // @TODO should display 0 when nothing left
      if(toDoObjectList != []){
         itemCounter.innerText = counter;
      } else{
         itemCounter.innerText = toDoObjectList.length;
      } 
   }

   toggleCheck(){

   }

   deleteItem(idx){
      const itemToDelete = toDoObjectList.findIndex((item)=> item.id == idx);
      toDoObjectList.splice(itemToDelete,1);
      this.displayItem();
   }

   displayItem(){

      this.toDoList.innerHTML = "";

      toDoObjectList.forEach((item) => {
         
         const listItem = document.createElement('li');
         listItem.classList.add("list-item-flex");
         listItem.setAttribute("data-id", item.id);
        
         //parent element label
         const label = listItem.appendChild(document.createElement(`label`));
         label.setAttribute("for", "check");
         label.setAttribute("data-id", item.id);
            
            //child element input
            const input = label.appendChild(document.createElement(`input`));
            input.setAttribute("type","checkbox");
            input.setAttribute("name","check");

            //child element i
            const unChecked = label.appendChild(document.createElement(`i`));
            unChecked.classList.add("checkbox-circle");

            //child element i
            const checked = label.appendChild(document.createElement(`i`));
            checked.classList.add("gradient-circle");  

            //child element span
            const span = label.appendChild(document.createElement(`span`));
            span.classList.add("list-item");
            span.innerText = `${item.txt}`;

            //child element deleteBtn
            const deleteBtn = listItem.appendChild(document.createElement(`span`));
            deleteBtn.classList.add("delete-btn");
            deleteBtn.setAttribute("data-id", item.id);

            deleteBtn.addEventListener("click", function(e) {
                  const deleteId = e.target.getAttribute("data-id");
                  newToDoList.deleteItem(deleteId);
               })
   
         this.toDoList.appendChild(listItem);   
         this.countItems();
      })
   }
}

//main
const toDoList = document.getElementById('todo-list');

newToDoList = new ToDo(toDoList);
  
document.getElementById('new-input').addEventListener("keydown", function (e) {
    if (e.key === "Enter") {  
      // e.preventDefault();
      newToDoList.addItem();
      
    }
})

//@TODO clear completed, remove all checked items

//@TODO filter elements by all, active or by default (switch case)

//@TODO drag nad drop to reorder

