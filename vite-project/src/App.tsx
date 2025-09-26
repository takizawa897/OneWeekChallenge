import localforage from "localforage";
import { useState, useEffect } from "react";
// import { useState } from "react";
import { isTodos } from './lib/isTodos';




//データの安全性確保のために別ファイルにTodoとFilterを型定義した。
// type Todo = {
//   value: string;
//   readonly id: number;
//   checked: boolean;
//   removed:boolean;
// };
// type Filter = 'all'|'checked'|'unchecked'|'removed';


export const App = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleFilter = ( filter: Filter) => {
    setFilter(filter);
  };

  //【ジェネリクス(handleEdit handleCheck handleRemove の処理をまとめたもの)】
  //todosの更新内容取込→更新反映+前のstateを配列として記録
     const handleTodo = <K extends keyof Todo, V extends Todo[K]>(
        id: number,
        key: K,
        value: V
    )=>{
     setTodos((todos) => {
       const newTodos = todos.map((todo) => {
         if (todo.id === id) {
           return { ...todo, [key]: value };
         }else{
         return todo;
          }
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


//ごみ箱を空にする
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

//localforage をインポート
  useEffect(() => {
    localforage
      .getItem('todo-20200101')
      .then((values) => isTodos(values)&&setTodos(values));
  }, []);

  useEffect(() => {
    localforage.setItem('todo-20200101', todos);
  }, [todos]);
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input type="text"
          value={text}  
          // disabled = {filter==='checked'||filter==='removed'}
          onChange={(e) => handleChange(e)}
           />
          <input 
          className='addbutton'
          type="submit" 
          value="登録"
          // disabled = {filter==='checked'||filter==='removed'}
          onSubmit={handleSubmit}
           />
        </form>
        )
      )}
      
        <ul>
          {filteredTodos.map((todo) => {

            return (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  disabled={todo.removed}
                  checked={todo.checked}
                  onChange={() => handleTodo(todo.id,'checked',!todo.checked)}
                />
                <input
                  type="text"
                  disabled={todo.checked || todo.removed}
                  value={todo.value}
                  onChange={(e) => handleTodo(todo.id, 'value',e.target.value)}
                />
                <button  className='RDbutton'   onClick={()=>handleTodo(todo.id,'removed',!todo.removed)}>
                  {todo.removed ?'復元':'削除'}
                  </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };


