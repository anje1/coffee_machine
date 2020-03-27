"use strict"
let balance = document.querySelector(".balance");
let displayText = document.querySelector(".display-text");
let progressBar = document.querySelector(".progress-bar");
let coffeeCup = document.querySelector(".coffee-cup img");

let coffeeStatus = "waiting"; //"cooking" "ready"

coffeeCup.onclick = takeCoffee; //1 способ вызова

/*coffeeCup.onclick = function() {  //2 способ вызова
  takeCoffee(this);
}

coffeeCup.addEventListener("click", takeCoffee, par1) //3 способ вызова
coffeeCup.addEventListener("click", () => {
  takeCoffee;                                    //4 способ вызова
})

coffeeCup.AddEventListener("click", buyCoffee, "Американо", 50);*/

function buyCoffee(name, cost, elem) {
    if (coffeeStatus != "waiting") {
    return;
    }
  let afterBuyValue = +balance.value - cost;
//  alert(`Вы заказали ${name}. Цена: ${cost}`);
//alert(balance.value);
  if ( (balance.value - cost) < 0 || Number.isNaN(afterBuyValue)) {
    balance.style.border = "2px solid red";
    balance.style.backgroundColor = "pink";
    changeDisplayText("Недостаточно средств!");
    return;
  }
  balance.style.border = "none";
  balance.style.backgroundColor = "white";
  balance.value = (+balance.value - cost).toFixed(2);
  cookCoffee(name, elem);
}

function cookCoffee(name, elem) {
let cupImg = elem.querySelector("img");
let cupSrc = cupImg.getAttribute("src");
coffeeCup.setAttribute("src", cupSrc);
coffeeCup.style.opacity = "0%";
coffeeCup.classList.remove("d-none");//убрать класс
  coffeeStatus = "cooking";
  changeDisplayText("Ваш " + name + " готовится");
  //coffeeCup.classList.add(""); //Добавить класс
 // coffeeCup.classList.toggle(""); // вкл выкл класс
  //coffeeCup.classList.contains("d-none"); //содержит ли класс
  
  let readyPercent = 0;
  let cookingInterval = setInterval(() => {
    readyPercent++
    progressBar.style.width = readyPercent + "%";
    coffeeCup.style.opacity = readyPercent + "%";
    if (readyPercent == 100) {
      coffeeStatus = "ready";
      changeDisplayText("Ваш " + name + " готов!");
      coffeeCup.style.cursor = "pointer";
      clearInterval(cookingInterval);
    }
  }, 75);
}

function takeCoffee() {
  if (coffeeStatus != "ready") {
    return;
  }
  coffeeStatus = "waiting";
  coffeeCup.classList.add("d-none");
  coffeeCup.style.cursor = "auto";
  progressBar.style.width = "0%";
  changeDisplayText("Выберите кофе");
}

function changeDisplayText(text) {
  //displayText.innerText = "<span>"+text+"</span>";
  displayText.innerHTML = "<span>"+text+"</span>";
}
/*способы поиска элементов
1. в html коде
            <div class="coffee-item col" onclick="buyCoffee('Американо', 50)">
            
      click => onclick  ---щелчок мыши
      mouseover => onmouseover ---наведение мыши
      mousedown => onmousedown ---зажать кнопку мыши
      mouseup => onmouseup ---отпустить кнопку мыши
2. Задаем ID(класс) в html и пишем в JS alert(name(напр balance.value));---лучше избегать этот способ
3. document.getElementById("balance");
   document.getElementByClass("coffee-item");
   document.getElementsByTag("img"); ---устаревший способ
   
4. Рекомендуемый способ:
    document.querySelector("img"); ---поиск тегов
    document.querySelector(".coffee-item"); ---поиск классов
    document.querySelector("#balance"); ---поиск по id
    
    document.querySelectorAll(".coffee-item"); ---поиск всех элементов
    */
    
    //-----------------------------------------Drag'n'Drop--------------------
    
let bills = document.querySelectorAll(".wallet img");
 
for(let i = 0; i < bills.length; i++) {
   bills[i].onmousedown = takeMoney;
}

function takeMoney(event) {
  event.preventDefault();
  
  let bill = this;
  let billCost = bill.getAttribute("cost");
  
  bill.style.position = "absolute";
  bill.style.transform = "rotate(90deg)";
  
  let billCoords = bill.getBoundingClientRect();
  let billWidth = billCoords.width;
  let billHeight = billCoords.height;
  
  bill.style.top = event.clientY  - billWidth/2 + "px";
  bill.style.left = event.clientX - billHeight/2  + "px";
  
  window.onmousemove = (event) => {
    bill.style.top = event.clientY  - billWidth/2 + "px";
    bill.style.left = event.clientX - billHeight/2  + "px";
    
  };
  
  bill.onmouseup = dropMoney;
}

function dropMoney() {
  window.onmousemove = null;
}








