import React from 'react';

export const DisplayTodoCount = (props) => {
    const {total, completed, incomplete} = props;

    return (
        <>
            <p id="total">全タスク: {total}</p>
            <p id="completed">完了済み: {completed}</p>
            <p id="incomplete">未完了: {incomplete}</p>
        </>
    );
};