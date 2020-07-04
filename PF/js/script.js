//fun rexpression to select elements
const selectElement= (s) => document.querySelector(s);

//open the menu on click
selectElement('.hamburger').addEventListener('click',()=>{
   selectElement('.mobile-nav').classList.add('open'); 
});

//close the menu on click
selectElement('.times').addEventListener('click',()=>{
    selectElement('.mobile-nav').classList.remove('open'); 
 });