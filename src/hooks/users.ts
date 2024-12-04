import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { client } from "../api/client";
import { IUser } from "../pages/HomePage/HomePage";

interface Options {
  usersLimit?: number;
  queryOptions?: Partial<UseQueryOptions<IUser[]>>;
}

const useUsers = (query: string, options: Options = {}) => {
  const { usersLimit = 5, queryOptions = {} } = options;

  const result = useQuery({
    queryKey: ["users", { query }],
    queryFn: () =>
      client<{ items: IUser[] }>(
        `search/users?q=${encodeURIComponent(query)}&per_page=${usersLimit}`
      ).then((data) => data.items),
    ...queryOptions,
  });

  return result;
};

export { useUsers };
