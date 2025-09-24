import { useState } from 'react';

type Todo = {
  value: string;
  readonly id:number;
};

export const App = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

 const handleEdit = (id:number,value:string)=>{
  setTodos((todos)=>{
    const newTodos = todos.map((todo)=>{
      if(todo.id === id){
        todo.value = value;
      }
      console.log(todo);
      return todo;
    });
    console.log('===Original todos===');
    todos.map((todo)=>{
      console.log('id:${todo.id}, value: ${todo.value}');
  });
    return newTodos;
  });
 };
  const handleSubmit = () => {
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
    };

    setTodos((todos) => [newTodo, ...todos]);
    setText('');
  };

  return (
    <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input type="text" value={text} onChange={(e) => handleChange(e)} />
          <input type="submit" value="追加" onSubmit={handleSubmit} />
        </form>
        <ul>  
          {todos.map((todo)=>{
            return(
            <li key={todo.id}>
              <input
              type="text"
              value={todo.value}
              onChange={(e)=>handleEdit(todo.id,e.target.value)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};