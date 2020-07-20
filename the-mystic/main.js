//fun rexpression to select elements
const selectElement= (s) => document.querySelector(s);

//open the menu on click
selectElement('.menu-toggle').addEventListener('click',()=>{
   selectElement('body').classList.toggle('open'); 
});

//close the menu on click
// selectElement('.close').addEventListener('click',()=>{
//     selectElement('.nav-list').classList.remove('active'); 
//  });