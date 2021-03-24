const addForm = document.querySelector('.header-form');
const todoInput = document.querySelector('.todoInput');
const todoList = document.querySelector('.todoList');

// search
const searchInput = document.querySelector('.search');

class App {
    todoList = [];

    search = () => {
      let searched = searchInput.value.toLowerCase();

      let texts = document.querySelectorAll('h2');

      Array.from(texts).forEach((text) => {
        if(text.textContent.toLowerCase().indexOf(searched) != -1) {
          text.parentElement.parentElement.style.display = 'block';
        } else {
          text.parentElement.parentElement.style.display = 'none';
        }
      })

    }

    addExtraZero = (x) => {
      return x < 10 ? "0" + x : x;
    }

    checkLi = (e) => {

      let d = new Date();
      let h = this.addExtraZero(d.getHours());
      let m = this.addExtraZero(d.getMinutes());
      let day = this.addExtraZero(d.getDate());
      let month = this.addExtraZero(parseInt(d.getMonth()) + 1);
      let year = this.addExtraZero(d.getFullYear());

      let date = [month, day, year].join('.');

      let t = `${date} ${[h, m].join(':')}`;

      for(let x = 0; x < this.todoList.length; x++) {
        if(e.target.type == 'checkbox') {

          if(this.todoList[x].title == e.target.nextElementSibling.textContent) {
            this.todoList[x].isDone = true;
            this.todoList[x].doneTime = t;
            localStorage.setItem('todoList', JSON.stringify(this.todoList));
          }

          e.target.disabled = true;
          e.target.nextElementSibling.style.textDecoration = 'line-through';
          e.target.nextElementSibling.style.color = 'gray';

          // add done time
          e.target.parentElement.nextElementSibling.firstElementChild.innerHTML = `${this.todoList[x].addTime} / ${this.todoList[x].doneTime}`;

        }
      }

      if (e.target.className == 'delete') {
            if(confirm(`${e.target.previousElementSibling.textContent} silmek istediginize emin misiniz?`)) {
              for(let x = 0; x < app.todoList.length; x++) {
                if(e.target.parentElement.previousElementSibling.firstElementChild.nextElementSibling.textContent == app.todoList[x].title) {
                  app.todoList.splice(x, 1);
                  todoList.removeChild(e.target.parentElement.parentElement.parentElement);
                  localStorage.setItem('todoList', JSON.stringify(app.todoList));
                }
              }
            }
        }
    }


    addItem = (e) => {
      e.preventDefault();

      let todo = todoInput.value;


      // delete same todo
      if(this.todoList.length > 0) {
        for(let x = 0; x < this.todoList.length; x++) {
          if(this.todoList[x].title.toLowerCase() == todo.toLowerCase()) {
            let lis = document.querySelectorAll('li');

            lis.forEach((li) => {
              if(li.firstElementChild.firstElementChild.lastElementChild.textContent.toLowerCase() == todo.toLowerCase()) {
                todoList.removeChild(li);
                this.todoList.splice(x, 1);
                localStorage.setItem('todoList', this.todoList);
              }
            })
          }
        }
      }

      // time
      let d = new Date();
      let h = this.addExtraZero(d.getHours());
      let m = this.addExtraZero(d.getMinutes());
      let day = this.addExtraZero(d.getDate());
      let month = this.addExtraZero(parseInt(d.getMonth()) + 1);
      let year = this.addExtraZero(d.getFullYear());

      let date = [month, day, year].join('.');

      let t = `${date} ${[h, m].join(':')}`;



      let li = document.createElement('li');

      li.innerHTML = `
        <div class="todoLi">
          <div class="leftSide">
            <input type="checkbox" class="checkbox" />
            <h2>${todo}</h2>
          </div>
          <div class="rightSide">
            <span class="time">${t}</span>
            <button>Edit</button>
            <button class="delete">X</button>
          </div>
        </div>
      `;

      this.todoList.push({
        title: `${todo}`,
        isDone: false,
        addTime: t,
        doneTime: '',
      });

      localStorage.setItem('todoList', JSON.stringify(this.todoList));

      todoList.appendChild(li);

      todoInput.value = "";

    }


}

const app = new App();

addForm.addEventListener('submit', app.addItem);
searchInput.addEventListener('keyup', app.search);

onload = () => {

  let list = JSON.parse(localStorage.getItem('todoList'));

  if(!localStorage.getItem('todoList')) {
    app.todoList = [];
  } else {
      app.todoList = JSON.parse(localStorage.getItem('todoList'));

      app.todoList.map((todo) => {
        let li = document.createElement('li');
        if(todo.isDone == false) {

          li.innerHTML = `
            <div class="todoLi">
              <div class="leftSide">
                <input type="checkbox" class="checkbox" />
                <h2>${todo.title}</h2>
              </div>
              <div class="rightSide">
                <span class="time">${todo.addTime}</span>
                <button>Edit</button>
                <button class="delete">X</button>
              </div>
            </div>
          `;
        } else {
          li.innerHTML = `
            <div class="todoLi">
              <div class="leftSide">
                <input type="checkbox" disabled="disabled" checked="checked" class="checkbox" />
                <h2 style="text-decoration: line-through; color: gray;">${todo.title}</h2>
              </div>
              <div class="rightSide">
                <span class="time">${todo.addTime} / ${todo.doneTime}</span>
                <button class="edit">Edit</button>
                <button class="delete">X</button>
              </div>
            </div>
          `;

        }

        todoList.appendChild(li);
      });

    }

}

todoList.addEventListener('click', app.checkLi);

// localStorage.clear();

window.onload = onload;
