const todoInputElement = document.querySelector('.todo-input');
const todoEnterBtn = document.querySelector('.enter');
const todoList = document.querySelector('.todo-list');
const leftItem = document.querySelector('.left-items');

let todos = []; // todo를 모아놓은 객체 배열 {id, content, isCompleted}
let id = 1; // todo 객체의 id가 될 숫자

const setTodos = (newTodos) => todos = newTodos; 

const createTodo = () => {
    todoInputElement.addEventListener('keypress',(e)=>{
        if(e.key=='Enter'){
            pushTodo(e.target.value);  
        }
	
    }); 
    todoEnterBtn.addEventListener('click',(e)=>{
        pushTodo(todoInputElement.value);
    });


}; 

const pushTodo = (content) => {
	const newId = id++;
    const newTodos = [...todos,{id: newId,content:content,isCompleted:false}];
    setTodos(newTodos);

	paintTodos();
    settodos();
};

const completeTodo = (todoId) => {
    const newTodos = todos.map(todo => (todo.id === todoId) ? {...todo, isCompleted : !todo.isCompleted} : todo);
    setTodos(newTodos);
	paintTodos();
	settodos();
   
};

const deleteTodo = (todoId) => {
    const newTodos = todos.filter(todo => todo.id !== todoId);
    setTodos(newTodos);
    paintTodos();
    settodos();
};

const updateTodo = (e, todoId) =>{
    const inputElement = document.createElement('input');
    inputElement.classList.add('edit-input');

    let content = e.target.innerHTML;
    inputElement.value = content;
    const parentElement = e.target.parentNode;

    
    inputElement.addEventListener('keypress', (e)=>{
        if(e.key == 'Enter'){
            content = inputElement.value;
            const newTodos = todos.map(todo => (todoId === todo.id ? {... todo, content} : todo ));
            todos = newTodos;
            inputElement.classList.remove('visible');
            paintTodos();
        }
        if(e.target.value==""){alert("내용 입력")};
    });
    parentElement.appendChild(inputElement);
 
};

const paintTodos = () => {
    todoList.innerHTML = null;
    todos.forEach(todo => paint(todo));
};

const paint = (todo) => {

    const liElement = document.createElement('li');
    liElement.classList.add('todo-item');

    if(todo.isCompleted){
        console.log("asd");
        liElement.classList.add('checked');
    }

    const checkBtn = document.createElement('button');
    checkBtn.classList.add('checkbox');
    checkBtn.innerHTML = '✔︎';
    checkBtn.addEventListener('click', ()=> completeTodo(todo.id));
	
    const content = document.createElement('div');
    content.classList.add('content');
    content.innerHTML = todo.content;
    content.addEventListener('dblclick', (e)=> updateTodo(e, todo.id));


    const delBtn = document.createElement('button');
    delBtn.classList.add('delBtn');
    delBtn.innerHTML = '✕';
    delBtn.addEventListener('click', () => deleteTodo(todo.id));

    liElement.appendChild(checkBtn);
    liElement.appendChild(content);
    liElement.appendChild(delBtn);

    todoList.appendChild(liElement);    
};

const settodos = () => {
    const setTodo = todos.filter(todo => todo.isCompleted == false);
    leftItem.innerHTML = `오늘 할 일이 ${setTodo.length}개 남아있습니다`;
}
createTodo();












