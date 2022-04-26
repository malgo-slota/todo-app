//change theme
const toggleTheme = document.getElementById('toggle-theme');

toggleTheme.addEventListener("click", () => {
   if(toggleTheme.checked){
      document.querySelector('body').classList.replace('theme-light', 'theme-dark');
   } else {
      document.querySelector('body').classList.replace('theme-dark', 'theme-light');
   }
});

const toDoList = document.getElementById('todo-list');
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
            // it causes problems when items was deleted and new added
            // it doubles up indexes
            // @TODO find new way to calculate what idx sholud be 
            id : toDoObjectList.length,
            txt : newInput,
            isChecked : false,
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

   toggleCheck(selectedId){

      const selectedItemIdx = toDoObjectList.findIndex((item)=> item.id == selectedId);

      if(toDoObjectList[selectedItemIdx].isChecked == false) {
         toDoObjectList[selectedItemIdx].isChecked = true;
         // console.log("true");
      } else {
         toDoObjectList[selectedItemIdx].isChecked = false;
         // console.log("false");
      }
      this.displayItem()
   }

   deleteItem(idx){
      const itemToDelete = toDoObjectList.findIndex((item)=> item.id == idx);
      toDoObjectList.splice(itemToDelete,1);
      this.displayItem();
   }

   clearCompleted(){
      const itemsToClear = toDoObjectList.map(function(item, idx) {
         if(toDoObjectList[idx].isChecked==true){
            return item;
         } 
      });

      const itemsToClear2 = itemsToClear.filter(function (item) {
         return item !== undefined;
      })

      itemsToClear2.forEach(item => {
         this.deleteItem(item.id);
      })
      this.displayItem();
   }


   filterItems() {
      //@TODO filter elements by all, active or by default (switch case)
      switch (id) {
         case 'completed':
               //display only with checked value
            break;
      
         case 'active':
               //display only with unchecked value
            break;

            //all by default
         default: 
               //display all
            break;
      }
   }

   reorder(){
      //drag and drop
      
   }

   displayItem(){

      this.toDoList.innerHTML = "";

      toDoObjectList.forEach((item) => {
         
         const listItem = document.createElement('li');
         listItem.classList.add("list-item-flex");
         listItem.setAttribute("data-id", item.id);
        
         //parent element label
         const label = listItem.appendChild(document.createElement(`label`));
         label.classList.add("label-txt");
         //label.setAttribute("data-id", item.id);
            
            //child element input
            const input = label.appendChild(document.createElement(`input`));
            input.setAttribute("type","checkbox");
            input.setAttribute("name","check");
            // input.setAttribute("value", item.isChecked);
            input.setAttribute("data-id", item.id);

            //child element i
            const checkMark = label.appendChild(document.createElement(`i`));
            checkMark.classList.add("checkbox-circle");

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

          
         this.countItems();
            
         //checkbox functionality
            input.addEventListener("click", function(e) {
               const selectedId = e.target.getAttribute("data-id");
                  newToDoList.toggleCheck(selectedId);
            })

            if(item.isChecked){
               checkMark.classList.add("gradient-circle");
               span.classList.add("line-through");
            }

            //clear completed
            const clearBtn = document.querySelector(".clear-btn");
            clearBtn.addEventListener("click", function() {
                  newToDoList.clearCompleted();

            })

            //filter
            document.querySelectorAll('.btn-container input').forEach(radio => {
               radio.addEventListener('change', (e) => {
                  this.filterItems(e.target.id);
               });
            });

            // listItem.addEventListener("drag", function(e) {
            //    e.preventDefault();
            // })

            // listItem.addEventListener("drop", function(e) {
               
            // } )

            this.toDoList.appendChild(listItem); 
      })
   }
}

//main
newToDoList = new ToDo(toDoList);
  
document.getElementById('new-input').addEventListener("keydown", function (e) {
    if (e.key === "Enter") {  
      // e.preventDefault();
      newToDoList.addItem();
    }
})

