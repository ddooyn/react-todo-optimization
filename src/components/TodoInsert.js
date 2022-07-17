import React, { useCallback, useState } from 'react';
import './TodoInsert.scss';
import { MdAdd } from 'react-icons/md';

const TodoInsert = () => {
  const [value, setValue] = useState('');

  // 컴포넌트가 리렌더링될 때마다 함수를 새로 만드는 것이 아니라,
  // 한번 함수를 만든 뒤 재사용할 수 있도록 useCallback
  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return (
    <form className="TodoInsert">
      <input
        type="text"
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={onChange}
      />
      <button>
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;
