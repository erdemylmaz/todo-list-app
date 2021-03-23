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

    checkLi = (e) => {

      for(let x = 0; x < this.todoList.length; x++) {
        if(e.target.type == 'checkbox') {
          e.target.disabled = true;
          e.target.nextElementSibling.style.textDecoration = 'line-through';
          e.target.nextElementSibling.style.color = 'rgba(255, 255, 255, 0.5)';
          if(this.todoList[x].title == e.target.nextElementSibling.textContent) {
            this.todoList[x].isDone = true;
            localStorage.setItem('todoList', JSON.stringify(this.todoList));
          }
        }
      }

      if (e.target.className == 'delete') {
            if(confirm(`${e.target.previousElementSibling.textContent} silmek istediginize emin misiniz?`)) {
              for(let x = 0; x < app.todoList.length; x++) {
                if(e.target.previousElementSibling.textContent == app.todoList[x].title) {
                  app.todoList.splice(x, 1);
                  todoList.removeChild(e.target.parentElement.parentElement);
                  localStorage.setItem('todoList', JSON.stringify(app.todoList));
                }
              }
            }
        }
    }

    addItem = (e) => {
      e.preventDefault();

      let todo = todoInput.value;

      let li = document.createElement('li');

      li.innerHTML = `
        <div class="todoLi">
        <input type="checkbox" class="checkbox" />
          <h2>${todo}</h2>
          <button class="delete">X</button>
        </div>
      `;

      this.todoList.push({
        title: `${todo}`,
        isDone: false
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
            <input type="checkbox" class="checkbox" />
              <h2>${todo.title}</h2>
              <button class="delete">X</button>
            </div>
          `;
        } else {
          li.innerHTML = `
            <div class="todoLi">
            <input type="checkbox" disabled="disabled" checked="checked" class="checkbox" />
              <h2 style="text-decoration: line-through; color: rgba(255, 255, 255, 0.5);">${todo.title}</h2>
              <button class="delete">X</button>
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
