import AddButton from './components/AddButton';
import TodoItem from './components/TodoItem';
import Filter from './components/Filter';
import useTodo from './hooks/useTodo';


export const App = () => {

    const {
      text,
      todos,
      filter,
      filteredTodos,
      handleChange,
      handleFilter,
      handleEdit,
      handleCheck,
      handleRemove,
      handleEmpty,
      handleSubmit
    } = useTodo();

    return (
      <div>
        <Filter
          filter={filter}
          handleFilter={handleFilter}
        />

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


