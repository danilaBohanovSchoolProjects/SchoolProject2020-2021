let easydb, db;
let data;

let sumbit, textInput, resultList, resultNothing, resList;

const title = document.querySelector("title");

let runner = async () => {
  easydb = require("easydb-io");

  console.log(title.textContent);
  if (title.textContent == "Math") {
    db = easydb({
      database: '6a5990d2-560c-4183-9438-48461d20f0c1',
      token: 'fa0650dc-2b7c-423f-8fde-f6f3df13270e'
    })
  } else if (title.textContent == "Informatics") {
    db = easydb({
      database: '23186ee9-9aae-45fc-8735-a4238178d5ea',
      token: '3775a4e9-74ee-44f0-be70-b66700be2997'
    })
  } else if (title.textContent == "Russian") {
    db = easydb({
      database: '714f0c7a-9c05-4ddf-a379-0996c6781c47',
      token: 'fe007134-7023-47bd-b3ec-c5f85b5facd9'
    })
  } else if (title.textContent == "Literature") {
    db = easydb({
      database: 'd25dc6f9-46cd-465b-acd6-25e4463f95dd',
      token: '565fa569-3d2a-4325-9677-9ef7824dba47'
    })
  } else if (title.textContent == "English") {
    db = easydb({
      database: '938fdf53-111d-4fe2-b8f8-d9ee34eb85ee',
      token: 'f22c6049-2991-40b0-bb71-598fb4f4669f'
    })
  } else if (title.textContent == "History") {
    db = easydb({
      database: 'b0c66ff7-511e-41c0-b013-8bfbf6480037',
      token: '272a8175-c92a-4f69-a9de-d0710b1aa5de'
    })
  }

  data = await db.List();
  console.log(data);

  sumbit = document.querySelector(".form-section__sumbit");
  textInput = document.querySelector(".form-section__text-input");
  resultList = document.querySelector(".result__list");
  resultNothing = document.querySelector(".result__nothing");
  resList = new DocumentFragment();

  let isEmpty = true;

  let cnt = -1;

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
    cnt = key;

    delButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      db.Delete(key);
      console.log(key);
      resListItem.remove();
    });
  }
  cnt++;


  if (!isEmpty) {
    resultList.appendChild(resList);
    resultNothing.classList.add('result__nothing--hide');
    resultList.classList.remove('result__list--hide');
  }

  sumbit.addEventListener("click", (evt) => {
    evt.preventDefault();
    let curText = textInput.value;
    if (!curText) return;
    if (isEmpty) {
      resultList.appendChild(resList);
      resultNothing.classList.add('result__nothing--hide');
      resultList.classList.remove('result__list--hide');
    }
    isEmpty = false;
    textInput.value = "";
    const resListItem = document.createElement('li');
    resListItem.classList.add('result__list-item');
    resListItem.classList.add('result__list-item--loading');
    resListItem.textContent = "Загрузка...";
    resultList.appendChild(resListItem);
    db.Put(cnt, curText);
    resListItem.classList.remove('result__list-item--loading');
    resListItem.textContent = curText;
    const delButton = document.createElement('button');
    delButton.classList.add('result__del-button');
    const span = document.createElement('span');
    span.classList.add('visually-hidden');
    span.textContent = "Удалить комметарий";
    delButton.appendChild(span);
    resListItem.appendChild(delButton);

    let id = cnt;

    delButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      db.Delete(id);
      console.log(id);
      resListItem.remove();
    });

    cnt++;
  });
};

runner();
