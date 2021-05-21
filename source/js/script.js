let easydb, db;
let data;

let sumbit, textInput, resultList, resultNothing, resList;

const title = document.querySelector("title");

let runner = async () => {
  easydb = require("easydb-io");

  console.log(title.textContent);
  if (title.textContent == "Math") {
    db = easydb({
      database: '06c327a5-2da3-43af-a3aa-aab1ba323384',
      token: 'c41b0ea9-4c50-463e-9a97-65a8a18afe8c'
    })
  } else if (title.textContent == "Informatics") {
    db = easydb({
      database: 'ad494149-b120-4502-a41d-7d9af1ce749a',
      token: 'ddb91dc5-d585-469c-9333-824ffc31b8b5'
    })
  } else if (title.textContent == "Russian") {
    db = easydb({
      database: 'da020694-addb-4597-9cfc-06c009d578f6',
      token: '88dae22b-a9e5-49e4-b7c7-6d0901d1ff26'
    })
  } else if (title.textContent == "Literature") {
    db = easydb({
      database: '4b9e8151-e232-4457-b8bf-ed38994f8d74',
      token: 'e143bdf0-4982-43f7-a724-f5931d1f0817'
    })
  } else if (title.textContent == "Class") {
    db = easydb({
      database: 'a7589b5f-58ad-45b6-8e04-21e1a8885db1',
      token: 'ce92d5f4-bace-4f21-85a2-7e1947aa9596'
    })
  } else if (title.textContent == "History") {
    db = easydb({
      database: '1fa0a7b4-dd69-4624-a935-9c1cf35bee09',
      token: '364e03c0-e4a5-427c-8057-b25d56cee848'
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
