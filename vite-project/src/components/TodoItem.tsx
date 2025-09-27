// Todo アイテムを表示するコンポーネント
// 処理を持たない純粋な表示コンポーネント
import React from 'react';
import { type Todo } from '../App';

// Component に渡したい props の型を定義
type TodoItemProps = {
    // Todo アイテムの情報
    todo: Todo;
    // Todo アイテムの変更
    handleEdit: (id: number, value: string) => void;
    // Todo 完了のチェック
    handleCheck: (id: number, checked: boolean) => void;
    // Todo 削除
    handleRemove: (id: number, removed: boolean) => void;
}

const TodoItem = (props: TodoItemProps) => {
      return (
            <li key={props.todo.id}>
              <input
                type="checkbox"
                disabled={props.todo.removed}
                checked={props.todo.checked}
                onChange={() => props.handleCheck(props.todo.id,!props.todo.checked)}
              />
              <input
                type="text"
                disabled={props.todo.checked || props.todo.removed}
                value={props.todo.value}
                onChange={(e) => props.handleEdit(props.todo.id, e.target.value)}
              />
              <button  className='RDbutton'   onClick={()=>props.handleRemove(props.todo.id,!props.todo.removed)}>
                {props.todo.removed ?'復元':'削除'}
                </button>
            </li>
    );
}

export default React.memo(TodoItem);
