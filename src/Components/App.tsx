import { useState, useCallback, memo, useEffect } from "react";
import * as st from "simple-runtypes";
import clsx from "clsx";

import { mockItems } from "../mocks";

const TODOS = "TODOS";
const ItemRuntype = st.record({
  id: st.string(),
  task: st.string(),
  done: st.boolean(),
});
const ItemsRuntype = st.array(ItemRuntype);
type Item = ReturnType<typeof ItemRuntype>;

const ToDoItem: React.FC<
  { onDelete: (id: string) => void; onCheck: (id: string) => void } & Item
> = ({ id, task, done, onDelete, onCheck }) => {
  const [hidden, setHidden] = useState(true);

  return (
    <div
      id={id}
      className={`cursor-pointer rounded-md hover:bg-blue-200 ${clsx({
        "line-through opacity-50": done,
        "bg-blue-300": !hidden,
      })}`}
    >
      <div
        className="flex items-center p-2"
        onClick={() => setHidden((prev) => !prev)}
      >
        <input
          id={`todo-item-${id}`}
          type="checkbox"
          // TODO: remove onfocus ring
          className="h-3 w-3 cursor-pointer rounded-lg
      border border-blue-400 bg-blue-200 checked:bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-1 active:opacity-70"
          checked={done}
          onChange={() => onCheck(id)}
          onClick={(e) => e.stopPropagation()}
        />
        <div className="ml-2 w-full">{task}</div>
        <button
          className="group p-1 hover:rounded-xl hover:bg-blue-300 active:opacity-70"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="red"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
              className="origin-center transition-all group-hover:rotate-90"
            />
          </svg>
        </button>
      </div>
      <div
        className={`cursor-default px-2 transition-[height] ease-linear ${clsx({
          "h-0": hidden,
          "h-[50px]": !hidden,
        })}`}
      >
        <div
          className={`transition-[visibility] delay-300 ease-linear ${clsx({
            hidden: hidden,
            visible: !hidden,
          })}`}
        >
          info card
        </div>
      </div>
    </div>
  );
};

const ToDoItemMemo = memo(ToDoItem);

function App() {
  // TODO: try to add dark theme later
  // const [darkMode, setDarkMode] = useState(true);
  const [items, setItems] = useState<Item[]>(() => {
    if (mockItems && mockItems.length > 0 && import.meta.env.DEV)
      return mockItems;
    if (Object.prototype.hasOwnProperty.call(localStorage, TODOS)) {
      const parsedTodos = st.use(
        ItemsRuntype,
        JSON.parse(localStorage.getItem(TODOS) as string)
      );

      if (parsedTodos.ok) {
        return parsedTodos.result;
      }
    }
    return [];
  });

  const onDelete = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const onCheck = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  }, []);

  useEffect(() => {
    localStorage.setItem(TODOS, JSON.stringify(items));
  }, [items]);

  return (
    <div className="h-screen bg-blue-100">
      <div className="container mx-auto px-2">
        <header className="px-2">DoMe App</header>
        <div className="py-3 children:mb-1 last:children:mb-0">
          {items.map((item) => (
            <ToDoItemMemo
              key={item.id}
              {...item}
              onDelete={onDelete}
              onCheck={onCheck}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
