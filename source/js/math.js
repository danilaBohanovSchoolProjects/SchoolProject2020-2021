let easydb, db;
let data;

let sumbit, textInput, resultList, resultNothing, resList;

let runner = async () => {
  easydb = require("easydb-io");

  db = easydb({
    database: '3ef30d0b-5dc9-4aa0-8dea-aef8bba8923c',
    token: '391214b8-41be-4c01-9e23-45e8a93a8ef8'
  })

  data = await db.List();
  console.log(data);

  sumbit = document.querySelector(".form-section__sumbit");
  textInput = document.querySelector(".form-section__text-input");
  resultList = document.querySelector(".result__list");
  resultNothing = document.querySelector(".result__nothing");
  resList = new DocumentFragment();

  let isEmpty = true;

  let cnt = 0;

  for (let key in data) {
    const resListItem = document.createElement('li');
    resListItem.classList.add('result__list-item');
    resListItem.textContent = data[key];

    const delButton = document.createElement('button');
    delButton.classList.add('result__del-button');
    const span = document.createElement('span');
    span.classList.add('visually-hidden');
    span.textContent = "Удалить комметарий";
    delButton.appendChild(span);
    resListItem.appendChild(delButton);

    resList.appendChild(resListItem);
    isEmpty = false;
    cnt++;
  }

  if (!isEmpty) {
    resultList.appendChild(resList);
    resultNothing.classList.add('result__nothing--hide');
    resultList.classList.remove('result__list--hide');
  }

  sumbit.addEventListener("click", (evt) => {
    evt.preventDefault();
    let curText = textInput.value;
    if (!curText) return;
    textInput.textContent = "";
    const resListItem = document.createElement('li');
    resListItem.classList.add('result__list-item');
    resListItem.classList.add('result__list-item--loading');
    resListItem.textContent = "Загрузка...";
    resultList.appendChild(resListItem);
    db.Put(cnt, curText);
    resListItem.classList.remove('result__list-item--loading');
    resListItem.textContent = curText;
  });
};

runner();
