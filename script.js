"use strict"
let balance = document.querySelector(".balance");

function buyCoffee(name, cost) {
  let afterBuyValue = +balance.value - cost;
//  alert(`Вы заказали ${name}. Цена: ${cost}`);
//alert(balance.value);
  if ( (balance.value - cost) < 0 || Number.isNaN(afterBuyValue)) {
    alert("Недостаточно средств!");
    return;
  }
  balance.value = (+balance.value - cost).toFixed(2);
  alert("Ваш " + name + " готовится.");
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