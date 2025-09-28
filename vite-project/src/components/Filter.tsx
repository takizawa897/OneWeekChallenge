// タスクの状態でフィルタリングするためのコンポーネント
// 処理を持たない純粋な表示コンポーネント
import React from 'react';
import { type Filter } from '../hooks/useTodo';

// Component に渡したい props の型を定義
type FilterProps = {
  // 現在のフィルタ状態
  filter: Filter;
  // フィルタ状態を変更する関数
  handleFilter: (filter: Filter) => void;
}

const Filter = (props: FilterProps) => {
  return (
    <select defaultValue="all"
      // Why: e.target.value は string 型なので、Filter 型にキャストする
      onChange={(e)=>props.handleFilter(e.target.value as Filter)}>
      <option value="all">すべてのタスク</option>
      <option value="checked">完了したタスク</option>
      <option value="unchecked">現在のタスク</option>
      <option value="removed">ごみ箱</option>
    </select>
  );
}

// Why: パフォーマンス改善のため、React.memo でラップしてメモ化する
export default React.memo(Filter);
