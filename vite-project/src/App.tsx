import { useState } from 'react'
type Todo ={
  value: string;
  readonly id : number;
};

export const App = () =>{
  const [text,setText]=useState('');
  const [todos,setTodos]=useState<Todo[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
    setText(e.target.value);
  };
  const handleSubmit = () =>{
    if(!text) return;
  

  const newTodo:Todo ={
    value:text,
  }

  setTodos((todos)=>[newTodo,...todos]);
  setText('');
};

  return(
    <div>
      <form onSubmit={(e) => { e.preventDefault()
       handleSubmit(); 
      }}
      >
        <input type="text" 
        value={text} 
        //onChange={(e)=>setText(e.target.value)}
        onChange={(e)=>handleChange(e)}
        />
        <input type="submit"
        //多分ここが、登録
        value="追加" onSubmit={handleSubmit}
        />
      </form>
      <ul>
        {todos.map((todo)=>{
          return <li>{todo.value}</li>
        })}
      </ul>
      {/* //<p>{text}</p> 2025年9月22日12時44分取り敢えず必要なくなったから消す*/}
    </div>
  );
};