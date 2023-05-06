import React from 'react';

export const InputTodo = (props) => {
    const {todoText, onChange, onClick} = props;
    
    return (
        <div className="add_item_area">
            <label className="label">ADD ITEM</label>
            <input
                placeholder="TODOを入力"
                className="task_text"
                value={todoText}
                onChange={onChange}
            />
            <button className="btn_submit" onClick={onClick}>Add</button>
        </div>
    );
};
