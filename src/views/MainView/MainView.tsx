import { useState, useCallback, useEffect, memo } from 'react';
import clsx from 'clsx';

import { collection, authStore } from '../../services';

import { Layout } from '../common';

type Todo = {
  id: string;
  task: string;
  done: boolean;
};

const ToDoItem: React.FC<
  { onDelete: (id: string) => void; onUpdate: (task: Todo) => void } & Todo
> = ({ id, task, done, onDelete, onUpdate }) => (
  <div
    id={id}
    className={`rounded-md hover:bg-stone-100 ${clsx({
      'line-through opacity-50': done,
    })}`}
  >
    <div className="flex items-center p-2">
      <input
        id={`todo-item-${id}`}
        type="checkbox"
        // TODO: remove onfocus ring
        className="border-1 h-3 w-3
          cursor-pointer
      rounded-sm border-stone-300 text-stone-700 checked:bg-stone-700 hover:bg-stone-200 focus:outline-none focus:ring-0 focus:ring-stone-400 focus:ring-offset-0 active:opacity-70"
        checked={done}
        onChange={() => onUpdate({ task, done: !done, id })}
        // onClick={(e) => e.stopPropagation()}
      />
      <div className="ml-2 w-full">{task}</div>
      <button
        className="group p-1 hover:rounded-xl hover:bg-red-100 active:opacity-70"
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
  </div>
);

const ToDoItemMemo = memo(ToDoItem);

export const MainView = () => {
  // TODO: try to add dark theme later
  // const [darkMode, setDarkMode] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    // TODO: change it, move somewhere
    if (authStore.isValid) {
      const getTodos = async () => {
        const result = await collection('todos').getList<Todo>(1, 20);

        setTodos(result.items);
      };

      getTodos();
    }
  }, []);

  const onRemove = useCallback(async (id: string) => {
    // const storeItem = todos.find((item) => item.id === id);
    setTodos((prev) => prev.filter((item) => item.id !== id));

    try {
      await collection('todos').delete(id);
    } catch (error) {
      // revert if failed
    }
  }, []);

  // TODO: change it later i dont like (when finish app)
  const onUpdate = useCallback(async (task: Todo) => {
    const { id } = task;

    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );

    try {
      await collection('todos').update(id, task);
    } catch (error) {
      // revert if failed
      setTodos((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, done: !item.done } : item
        )
      );
    }
  }, []);

  return (
    <Layout>
      {/* TODO: header add logo name and theme switch */}
      <header className="px-2">WONTDO</header>
      <div className="py-3 children:mb-1 last:children:mb-0">
        {todos.map((item) => (
          <ToDoItemMemo
            key={item.id}
            {...item}
            onDelete={onRemove}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </Layout>
  );
};
