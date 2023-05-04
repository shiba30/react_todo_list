import React, { useState } from 'react';
import './styles.css';
import { InputTodo } from './components/InputTodo';
import { DisplayTodoCount } from './components/DisplayTodoCount';

export const App = () => {
  const [todoText, setTodoText] = useState();
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [editingIndex, setEditingIndex] = useState();
  const [editTodoText, setEditTodoText] = useState('');
  const [completedTodo, setCompletedTodo] = useState({});

  const onChangeTodoText = (e) => setTodoText(e.target.value);
  const onChangeEditTodoText = (e) => setEditTodoText(e.target.value);
  const onClickAdd = () => {
    // 新規追加
    if (todoText) {
      const newTodos = [...incompleteTodos, todoText];
      setIncompleteTodos(newTodos);
      setTodoText('');
    }
  };
  const onClickCompleteTodo = (index) => {
    // 完了タスク確認処理
    const newCompleted = { ...completedTodo };
    if (newCompleted[index]) {
      delete newCompleted[index];
    } else {
      newCompleted[index] = true;
    }
    setCompletedTodo(newCompleted);
  };
  const onClickEdit = (index) => {
    // 編集処理
    setEditingIndex(index);
    setEditTodoText(incompleteTodos[index]);
  };
  const onClickSave = (index) => {
    // 保存処理
    if (editTodoText) {
      const newTodos = [...incompleteTodos];
      newTodos[index] = editTodoText;
      setEditingIndex();
      setIncompleteTodos(newTodos);
    }
  };
  const onClickDelete = (index) => {
    // 削除処理
    const newTodos = [...incompleteTodos];
    const newCompletedTodo = { ...completedTodo };
    const updatedCompletedTodo = {};

    if (window.confirm('本当に削除してもよしいですか？"')) {
      newTodos.splice(index, 1);
      setIncompleteTodos(newTodos);
      
      // 削除時に完了したToDoの情報を維持
      for (const key in newCompletedTodo) {
        if (parseInt(key, 10) > index) {
          updatedCompletedTodo[parseInt(key, 10) - 1] = newCompletedTodo[key];
        } else if (parseInt(key, 10) !== index) {
          updatedCompletedTodo[key] = newCompletedTodo[key];
        }
      }
      setCompletedTodo(updatedCompletedTodo);
    }
  };

  return (
    <>
      <div className="container">
        <div className="container_width">
          <h1 className="title">Todo App By React</h1>

          <InputTodo
            todoText={todoText}
            onChange={onChangeTodoText}
            onClick={onClickAdd}
          />

          <div className="todo_list_area">
            <label htmlFor="item" className="label">TODO LIST</label>
            <ul id="itemList">
              {incompleteTodos.map((todo, index) => {
                const isCompleted = completedTodo[index];
                return (
                  <li key={todo}>
                    <input
                      type='checkbox'
                      checked={isCompleted}
                      onChange={() => onClickCompleteTodo(index)}
                      className='checkbox'
                    />
                    {editingIndex === index ?
                      (
                        <>
                          <input
                            type="text"
                            value={editTodoText}
                            onChange={onChangeEditTodoText}
                            className="item-text"
                            style={isCompleted ? { textDecoration: 'line-through', color: '#999' } : {}}
                          />
                          <button onClick={() => onClickSave(index)} className='todo_button'>Save</button>
                        </>
                      ) : (
                        <>
                          <span
                            className="item-text"
                            style={isCompleted ? { textDecoration: 'line-through', color: '#999' } : {}}
                          >{todo}</span>
                          <button onClick={() => onClickEdit(index)} className='todo_button'>Edit</button>
                        </>
                      )}
                    <button onClick={() => onClickDelete(index)} className='todo_button'>Delete</button>
                  </li>
                );
              })}
            </ul>

            <DisplayTodoCount
              total={incompleteTodos.length}
              completed={Object.keys(completedTodo).length}
              incomplete={incompleteTodos.length - Object.keys(completedTodo).length
              }
            />

          </div>
        </div>
      </div>
    </>
  );
};
