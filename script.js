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
  
  let bill = this;
  let billCost = bill.getAttribute("cost");
  
  if (inAtm(bill)) {
    balance.value = +balance.value + +billCost
    bill.remove();
  }
}

function inAtm(bill) {
  let billCoord = bill.getBoundingClientRect();
  let atm = document.querySelector(".atm");
  let atmCoord = atm.getBoundingClientRect();
  
  let billLeftTopCornerX = billCoord.x;
  let billLeftTopCornerY = billCoord.y;
  
  let billRightTopCornerX = billCoord.x + billCoord.width;
  let billRightTopCornerY = billCoord.y;
  
  let atmLeftTopCornerX = atmCoord.x;
  let atmLeftTopCornerY = atmCoord.y;
  
  let atmRightTopCornerX = atmCoord.x + atmCoord.width;
  let atmRightTopCornerY = atmCoord.y;
  
  let atmLeftBottomCornerX = atmCoord.x;
  let atmLeftBottomCornerY = atmCoord.y + atmCoord.height/3;
  
  let atmRightBottomCornerX = atmCoord.x + atmCoord.width;
  let atmRightBottomCornerY = atmCoord.y + atmCoord.height/3;
  
  if (
    billLeftTopCornerX >= atmLeftTopCornerX
    && billLeftTopCornerY >= atmLeftTopCornerY
    && billRightTopCornerX <= atmRightTopCornerX
    && billRightTopCornerY >= atmRightTopCornerY
    
    && billLeftTopCornerX >= atmLeftBottomCornerX
    && billLeftTopCornerY <= atmLeftBottomCornerY
    ) {
      return true;
    } else {
      return false;
    }
}

//-------------------------------Сдача----------------------

let changeBtn = document.querySelector(".change");
changeBtn.onclick = takeChange;

function takeChange() {
  tossCoin("10");
}

function tossCoin(cost) {
  let changeContainer = document.querySelector(".change-box")
  let changeContainerCoords = changeContainer.getBoundingClientRect();
  
  let coinSrc = "";
  
  switch (cost) {
    case "10":
      coinSrc = "img/10rub.png";
      break;
    case "5":
      coinSrc = "img/5rub.png";
      break;
    case "2":
      coinSrc = "img/2rub.png";
      break;
    case "1":
      coinSrc = "img/1rub.png";
      break;
  }
  
/*  changeContainer.innerHTML += `
    <img src="${coinSrc}" style="height: 50px">  ----1 способ
  `*/
  
  let coin = document.createElement("img");
  coin.setAttribute("src", coinSrc);
  coin.style.height = "50px";
  coin.style.cursor = "pointer";
  coin.style.display = "inline-block";
  coin.style.position = "absolute";
  
  changeContainer.append(coin); //Прикрепить после внутри эл.
/*  changeContainer.prepend(coin); //Прикрепить до внутри эл.
  
  changeContainer.after(coin); //после контейнера
  changeContainer.before(coin); //перед контейнером
  
  changeContainer.replace(coin); //заменяет элементы*/
  coin.style.top = Math.round(Math.random() * (changeContainerCoords.height - 50)) + "px";
  coin.style.left = Math.round(Math.random() * (changeContainerCoords.width - 50)) + "px";
  
  coin.onclick = () => coin.remove();
  
}






