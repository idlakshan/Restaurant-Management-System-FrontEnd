 
 document.addEventListener("DOMContentLoaded", function () {
    navigationButtonClickEvent()

});
 
 //Admin navigation Button Clicked
function navigationButtonClickEvent(){
    let nav = document.querySelector(".aside-nav-button-list"),
    navList = nav.querySelectorAll("li"),
   
    totalNav = navList.length;
   
   for (let i = 0; i < totalNav; i++) {
    const button = navList[i].querySelector("div");
   
    button.addEventListener('click', function () {
        for (let j = 0; j < totalNav; j++) {
            navList[j].querySelector("div").classList.remove("active");
        }
   
        this.classList.add("active");
    })
   
   }
}