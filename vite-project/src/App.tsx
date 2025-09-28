import AddTodo from './components/AddTodo';
import Filter from './components/Filter';
import useTodo from './hooks/useTodo';
import EmptyRemovedTodo from './components/EmptyRemovedTodo';
import TodoList from './components/TodoList';

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
      {/* Why:「Filter されているかどうか」について知らない状態のコンポーネントとして
               切り出すことで、よりシンプルにできる
      */}
      <TodoList
        todos={filteredTodos}
        handleEdit={handleEdit}
        handleCheck={handleCheck}
        handleRemove={handleRemove}
      />
      </div>
    );
  };
