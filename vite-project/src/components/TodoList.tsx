// Todo リストを表示するコンポーネント
// 処理を持たない純粋な表示コンポーネント
import React from 'react';
import TodoItem from './TodoItem';
import type { Todo } from '../hooks/useTodo';

// Component に渡したい props の型を定義
type TodoListProps = {
    // Todo アイテムの一覧
    todos: Todo[];
    // Todo アイテムの変更
    handleEdit: (id: number, value: string) => void;
    // Todo 完了のチェック
    handleCheck: (id: number, checked: boolean) => void;
    // Todo 削除
    handleRemove: (id: number, removed: boolean) => void;
}

// Why: map で回すためだけのコンポーネントで若干冗長に見えるが、
//      App.tsx の可読性を上げるために分割する
const TodoList = (props: TodoListProps) => {
      return (
          <ul>
            {props.todos.map((todo) => (
              <TodoItem 
                key={todo.id} 
                todo={todo} 
                handleEdit={props.handleEdit}
                handleCheck={props.handleCheck}
                handleRemove={props.handleRemove}
              />
            ))}
          </ul>
    );
}

// Why: パフォーマンス改善のため、React.memo でラップしてメモ化する
export default React.memo(TodoList);
