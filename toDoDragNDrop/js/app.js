// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.querySelectorAll(".test");
const input = document.getElementById("input");

//console.log(list);
// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id;
let box="";

// get item from localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
}else{
    // if data isn't empty
    LIST = [];
    id = 0;
}

// load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash,item.box);
    });
}

// clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

// Show todays date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to do function

function addToDo(toDo, id, done, trash, box){
    
    if(trash){ return; }
    
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    
    const item = `<li class="item ${box}" draggable="true" id="${id}">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;
    
    const position = "beforeend";
    if(box==="first")
    list[0].insertAdjacentHTML(position, item);

    if(box==="second")
    list[1].insertAdjacentHTML(position, item);

    if(box==="third")
    list[2].insertAdjacentHTML(position, item);
}

// add an item to the list user the enter key
document.addEventListener("keyup",function(even){
    if(event.keyCode == 13){
        const toDo = input.value;
        let a="first";
        // if the input isn't empty
        if(toDo){
            addToDo(toDo, id, false, false ,a);
            
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false,
                box   : a
            });
            
            // add item to localstorage ( this code must be added where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));
            
            id++;
        }
        input.value = "";
        var draggables=document.querySelectorAll(".item");
        console.log(document.querySelectorAll(".item"));

        for(let i=0;i<draggables.length;i++)
        {
            draggables[i].classList.add('first');
            console.log("dragstart");
            draggables[i].addEventListener("dragstart",function(ev)
            {
                ev.dataTransfer.setData("srcId",ev.target.id);
                console.log("dragstart");
                console.log(ev.target.id);
            });

        }


    }
});


// complete to do
function completeToDo(element){
    console.log(element);
     element.classList.toggle(CHECK);
     element.classList.toggle(UNCHECK);
    //  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    //  LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}

// target the items created dynamically

for(let i=0;i<list.length;i++)
{
    list[i].addEventListener("click", function(event)
    {   
        const element = event.target; // return the clicked element inside list
        const elementJob = element.attributes.job.value; // complete or delete
        
        console.log(element);

        if(elementJob == "complete"){
            completeToDo(element);
        }else if(elementJob == "delete"){
            removeToDo(element);
        }
        
        // add item to localstorage ( this code must be added where the LIST array is updated)
        localStorage.setItem("TODO", JSON.stringify(LIST));
    });
}




var dropTarget=document.querySelector(".main");
var draggables=document.querySelectorAll(".item");
console.log(dropTarget.childNodes);
console.log(draggables);

for(let i=0;i<draggables.length;i++)
{
    draggables[i].classList.add('first');
    console.log("dragstart");
    draggables[i].addEventListener("dragstart",function(ev)
    {
        ev.dataTransfer.setData("srcId",ev.target.id);
        console.log("dragstart");
        console.log(ev.target.id);
    });

}

dropTarget.addEventListener("dragover",function(ev)
 {
     ev.preventDefault();
     console.log("dragover");
 });

dropTarget.addEventListener("drop",function(ev)
{
    ev.preventDefault();
    let target=ev.target;
    console.log(target);
    const srcId=ev.dataTransfer.getData("srcId");
    console.log(srcId);
    console.log(target.childNodes);
    // console.log(srcId);
    // console.log(target);
    //let droppable=target.classList.contains("content");
    var src=document.getElementById(srcId);
    target=target.childNodes[3];
    console.log(target);
    console.log(srcId);
    if(target.id==="list1")
    {
       
        target.appendChild(src); 
        if(src.childNodes[3].classList.contains(LINE_THROUGH))
        {
            src.childNodes[3].classList.remove(LINE_THROUGH)
        }
    }
    if(target.id==="list2")
    {
        
        target.appendChild(src);
        src.classList.remove('first');
        src.classList.add('second'); 
        LIST[srcId].box="second";
        if(src.childNodes[3].classList.contains(LINE_THROUGH))
        {
            src.childNodes[3].classList.remove(LINE_THROUGH)
        }
    }
    if(target.id=="list3")
    {
       
        target.appendChild(src); 
        LIST[srcId].done = LIST[srcId].done ? false : true;
        src.classList.add('third'); 
        src.classList.remove('first');
        LIST[srcId].box="third";
        console.log(src.childNodes);
        const pa=target.querySelectorAll("p");
        //console.log(pa);
        for (let index = 0; index < pa.length; index++)
        {
            pa[index].classList.add(LINE_THROUGH);
           
        }
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
    // console.log(LIST);

});













