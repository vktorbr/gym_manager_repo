const currentPage = location.pathname;

const itemsMenu = document.querySelectorAll("header .links a");


itemsMenu.forEach(function(item){
    if(currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active");
    }
})