// ゴミ箱を空にするボタンを表示するコンポーネント
// 処理を持たない純粋な表示コンポーネント
import React from 'react';
import type { Todo } from '../hooks/useTodo';

// Component に渡したい props の型を定義
type EmptyRemovedTodoProps = {
    // ゴミ箱に入っている Todo の一覧
    removedTodos: Todo[];
    // ゴミ箱を空にする関数
    handleEmpty: () => void;    
}

const EmptyRemovedTodo = (props: EmptyRemovedTodoProps) => {
        return (
          <button 
          onClick={props.handleEmpty}
          disabled={props.removedTodos.length === 0}
          >
          ごみ箱を空にする
          </button>
    );
};

export default React.memo(EmptyRemovedTodo);
