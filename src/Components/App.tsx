import { useState } from "react";
import z from "zod";
import clsx from "clsx";

import { mockItems } from "../mocks";

const TODOS = "TODOS";

const ItemSchema = z.object({
  id: z.string(),
  task: z.string(),
  done: z.boolean(),
});
const ItemsSchema = z.array(ItemSchema);
type Item = z.infer<typeof ItemSchema>;

const ToDoItem: React.FC<Item> = ({ id, task, done }) => (
  <div
    id={id}
    className={`flex cursor-pointer items-center rounded-md p-2 hover:bg-blue-200 children:cursor-pointer ${clsx(
      {
        "line-through opacity-50": done,
      }
    )}`}
  >
    <input
      id={`todo-item-${id}`}
      type="checkbox"
      value=""
      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2  dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600"
    />
    <label htmlFor={`todo-item-${id}`} className="ml-2 w-full ">
      {task}
    </label>
  </div>
);

function App() {
  // TODO: try to add dark theme later
  // const [darkMode, setDarkMode] = useState(true);
  const [items, setItems] = useState<Item[]>(() => {
    if (mockItems && mockItems.length > 0 && import.meta.env.DEV)
      return mockItems;
    if (Object.prototype.hasOwnProperty.call(localStorage, TODOS)) {
      const parsedTodos = ItemsSchema.safeParse(
        JSON.parse(localStorage.getItem(TODOS) as string)
      );

      if (parsedTodos.success) {
        return parsedTodos.data;
      }
    }
    return [];
  });

  return (
    <div className="h-screen bg-blue-100">
      <div className="container mx-auto px-2">
        <header>DoMe App</header>
        <div className="py-3 children:mb-1 last:children:mb-0">
          {items.map((item) => (
            <ToDoItem key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
