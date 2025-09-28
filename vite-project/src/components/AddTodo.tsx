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
            // Why: onSubmit にも関数を追加することで、
            //      Enter キーでの送信も可能にする
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
            // Why: form タグを使う場合、ボタンは submit を呼び出すため、
            //      実は登録ボタンに処理を書かなくても動く
          />
        </form>
      );
};

// Why: パフォーマンス改善のため、React.memo でラップしてメモ化する
export default React.memo(AddTodo);
