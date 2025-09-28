// Todo リストにタスクを追加するコンポーネント
// 処理を持たない純粋な表示コンポーネント
import React from 'react';

// Component に渡したい props の型を定義
type AddTodoProps = {
    // タスクの内容
    task: string
    // タスクの内容が変更されたときに呼ばれる関数
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    // タスクを追加する関数
    onAdd: () => void;
}

const AddTodo = (props: AddTodoProps) => {
      return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              props.onAdd();
            }}
          >
          <input type="text"
            value={props.task}
            // disabled = {filter==='checked'||filter==='removed'}
            onChange={(e) => props.onChange(e)}
           />
          <input 
            className='addTodo'
            type="submit" 
            value="登録"
            // disabled = {filter==='checked'||filter==='removed'}
            onSubmit={() => props.onAdd()}
          />
        </form>
      );
};

export default React.memo(AddTodo);
