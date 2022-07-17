import React from 'react';
import './TodoInsert.scss';
import { MdAdd } from 'react-icons/md';

const TodoInsert = () => {
  return (
    <form className="TodoInsert">
      <input type="text" placeholder="할 일을 입력하세요" />
      <button>
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;
