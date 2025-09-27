import { useState } from 'react';
import AddButton from './components/AddButton';
import TodoItem from './components/TodoItem';


export type Todo = {
  value: string;
  readonly id: number;
  checked: boolean;
  removed:boolean;
};
type Filter = 'all'|'checked'|'unchecked'|'removed';


// const handleEmpty =()=>{
//   setTodos((todos)=>todos.filter((todo)=> !todo.removed))
// };

export const App = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setfilter] = useState<Filter>('all');


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleFilter = ( filter: Filter) => {
    setfilter(filter);
  };
  const handleEdit = (id: number, value: string) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          //todo.value = value;
          return { ...todo, value: value };
        }
        console.log(todo);
        return todo;
      });
      console.log('===Original todos===');
      todos.map((todo) => {
        console.log(`id:${todo.id}, value: ${todo.value}`);
      });
      return newTodos;
    });
  };


  const handleCheck = (id: number, checked: boolean) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
            //todo.value = value;
          return { ...todo, checked };
        }
        return todo;
      });
      return newTodos;
    });
  };
    const filteredTodos = todos.filter((todo) => {
    switch(filter){
      case 'all':
        return !todo.removed;
      case 'checked':
        return todo.checked && !todo.removed;  
      case 'unchecked':
        return !todo.checked && !todo.removed;
      case 'removed':
        return todo.removed;
        default:
          return todo;
    }
  });

  const handleRemove = (id: number, removed: boolean) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
            //todo.value = value;
          return { ...todo, removed };
        }
        return todo;
      });
      return newTodos;
    });
  };

  const handleEmpty =()=>{
  setTodos((todos)=>todos.filter((todo)=> !todo.removed))
};



  const handleSubmit = () => {
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };
    

      



      setTodos((todos) => [newTodo, ...todos]);
      setText('');
    };


    return (
      <div>
        <select defaultValue="all"
        onChange={(e)=>handleFilter(e.target.value as Filter)}>
          <option value="all">すべてのタスク</option>
          <option value="checked">完了したタスク</option>
          <option value="unchecked">現在のタスク</option>
          <option value="removed">ごみ箱</option>
        </select>
        
        {filter === 'removed'?(
          <button 
          onClick={handleEmpty}
          disabled={todos.filter((todo)=>todo.removed).length === 0}
          >
          ごみ箱を空にする
          </button>
        ):(
        filter !=='checked'&&( 
          <AddButton
            task={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            onAdd={handleSubmit}
          />
        )
      )}
        <ul>
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleEdit={handleEdit}
              handleCheck={handleCheck}
              handleRemove={handleRemove}
            />
          ))}
        </ul>
      </div>
    );
  };


