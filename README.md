> ## jsconfig.json 설정

탭이 열려있지 않고 닫혀 있는 파일에도 import 자동 완성이 작동하게 하려면  
jsonconfig.json 파일을 생성하고 `Ctrl` + `Space` 을 누른다.  
아래와 같이 설정이 자동 완성되어 나온다.

```json
{
  "compilerOptions": {
    "target": "es2020"
  }
}
```

설정을 마치고 나면 불러오려는 컴포넌트 파일이 열려 있지 않아도  
자동 완성을 통해 컴포넌트를 불러와서 사용할 수 있다.  

---
> ## 인풋, 버튼 스타일 초기화 / flex: 1

```scss
input {
    // 스타일 초기화
    background: none;
    outline: none;
    border: none;
    flex: 1; // 차지할 수 있는 영역 모두 차지
    padding: 0.5rem;
    font-size: 1.125rem;
    line-height: 1.5;
    color: white;
    &::placeholder {
        color: #dee2e6;
    }
}
button {
    // 스타일 초기화
    background: none;
    outline: none;
    border: none;
    // ...
}
```

---
> ## CSS `& + &` 선택자
```scss
// 엘리먼트 사이사이에 테두리를 넣어 줌
& + & {
  border-top: 1px solid #dee2e6;
}
```

---
> ## classnames 라이브러리
`cn('default클래스이름', 조건부클래스이름)` 형태  
checked true일 때만 기존 checkbox 클래스 + checked 클래스가 붙음
```jsx
import cn from 'classnames';
// ...
const TodoListItem = ({ todo }) => {
  const { text, checked } = todo;
  return (
    <div className="TodoListItem">
      <div className={cn('checkbox', { checked })}>
      </div>
    </div>
  );
};
// ...
```
스타일링은 이렇게!
```css
.checkbox {
  display: flex;
  align-items: center;
  flex: 1;
  cursor: pointer;
  svg {
    font-size: 1.5rem;
  }
  .text {
    flex: 1;
    margin-left: 0.5rem;
  }
  /* checked 클래스가 있을 때 */
  &.checked {
    svg {
      color: #22b8cf;
    }
    .text {
      color: #adb5bd;
      text-decoration: line-through;
    }
  }
}
```

---
> ## useCallback(() => {}, [])
컴포넌트가 리렌더링될 때마다 함수를 새로 만드는 것이 아니라,   
한번 함수를 만든 뒤 재사용할 수 있도록 `useCallback` Hook 이용
```jsx
const TodoInsert = () => {
  const [value, setValue] = useState('');

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  // ...
}
```

---
> ## useReducer
useReducer를 사용하는 방법은 기존 코드를 많이 고쳐야 한다는 단점이 있지만,
상태를 업데이트하는 로직으로 모아 컴포넌트 바깥에 둘 수 있다는 장점이 있다.
```jsx
function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT':
      return todos.concat(action.todo);
    case 'REMOVE':
      return todos.filter((todo) => todo.id !== action.id);
    case 'TOGGLE':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;
  }
}

const App = () => {
  // const [todos, setTodos] = useState(createBulkTodos);
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  const nextId = useRef(2501);
  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    // setTodos((todos) => todos.concat(todo));
    dispatch({ type: 'INSERT', todo });
    nextId.current += 1;
  }, []);

  const onRemove = useCallback((id) => {
    // setTodos((todos) => todos.filter((todo) => todo.id !== id));
    dispatch({ type: 'REMOVE', id });
  }, []);

  const onToggle = useCallback((id) => {
    // setTodos((todos) =>
    //   todos.map((todo) =>
    //     todo.id === id ? { ...todo, checked: !todo.checked } : todo,
    //   ),
    // );
    dispatch({ type: 'TOGGLE', id });
  }, []);

  return (
    //...
  );
};
```