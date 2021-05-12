let easydb, db;
let data;

let sumbit, textInput, resultList, resultNothing, resList;

const title = document.querySelector("title");

let runner = async () => {
  easydb = require("easydb-io");

  console.log(title.textContent);
  if (title.textContent == "Math") {
    db = easydb({
      database: '734cd7b1-797b-4fc4-80d8-dd4c3eca45c5',
      token: '2c656d4e-738c-4476-8572-df422a912a53'
    })
  } else if (title.textContent == "Informatics") {
    db = easydb({
      database: '298ea123-2381-48a8-99da-6b997ee2c464',
      token: '493d7b5e-c33c-4aec-9921-2cadba466d07'
    })
  } else if (title.textContent == "Russian") {
    db = easydb({
      database: 'fd0af936-9546-4fa9-a69c-49ef2f0b2474',
      token: '69dc25b9-a06e-4dab-80d8-dad642fbab1a'
    })
  } else if (title.textContent == "Literature") {
    db = easydb({
      database: 'e4cdeab0-366c-44fa-809a-84427078f2ef',
      token: '3713b2b5-d49c-442f-a7d5-209390844ed9'
    })
  } else if (title.textContent == "Class") {
    db = easydb({
      database: '0ffc6c34-6f4a-4b57-931b-f09191cc8a88',
      token: '39cff467-a6d0-4596-ac40-0bd54e70e975'
    })
  } else if (title.textContent == "History") {
    db = easydb({
      database: 'a1113e0f-0398-4afa-9238-5c79caa933ed',
      token: '9d8db3b0-29a6-4688-bfbd-d86e34b1a497'
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
