  const handleEmpty =()=>{
  setTodos((todos)=>todos.filter((todo)=> !todo.removed))
};