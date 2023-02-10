export const LoginSkeleton = () => {
  return (
    <div className="h-full w-full ">
      <div className="h-54 mx-auto mt-32 max-w-[22rem] rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-3 h-7 w-52 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="mb-3 h-9 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="mb-3 h-9 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-9 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  );
};
