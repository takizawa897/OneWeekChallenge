// Todo の内容を管理するカスタムフック
import { useState } from 'react';

// Why: Todo の操作はこのカスタムフックの管理下にあるため、型定義もここに置いて完結させる
// Why: 別の Component で使用したいため export する
export type Todo = {
  value: string;
  readonly id: number;
  checked: boolean;
  removed:boolean;
};
export type Filter = 'all'|'checked'|'unchecked'|'removed';

/**
 * Todo の追加、編集、削除、完了の切り替えを行う関数を提供
 */
const useTodo = () => {
  // Todo の内容を管理するための state
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setfilter] = useState<Filter>('all');

  // 入力フォームの内容が変更されたときに呼ばれる関数
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

    // フィルタ状態を変更する関数
  const handleFilter = ( filter: Filter) => {
    setfilter(filter);
  };

  // Todo アイテムの内容を編集する関数
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


  // Todo アイテムのチェック状態を変更する関数
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

//   フィルタ済みの Todo リストを取得
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

    //   Todo アイテムを削除する関数
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

  // ごみ箱を空にする関数
  // 削除済以外を取り出して上書きすることで、ごみ箱を空にする
  const handleEmpty = () => {
    setTodos((todos) => todos.filter((todo) => !todo.removed));
  };

  // Todo を追加する関数 
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

    return {
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
    }
};

export default useTodo;