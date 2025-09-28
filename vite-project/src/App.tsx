import AddTodo from './components/AddTodo';
import TodoItem from './components/TodoItem';
import Filter from './components/Filter';
import useTodo from './hooks/useTodo';
import EmptyRemovedTodo from './components/EmptyRemovedTodo';

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
          <EmptyRemovedTodo
            removedTodos={todos.filter((todo) => todo.removed)}
            handleEmpty={handleEmpty}
          />
        ):(
        filter !=='checked'&&( 
          <AddTodo
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


