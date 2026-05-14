import { useQuery } from '@tanstack/react-query';


const useQueryHook = () => {
  const { data: expenseData, isLoading } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const response = await api.get("/expenses");      
      return response?.data;
    },
    retry: 1,
  });

  return {expenseData, isLoading}
}

export default useQueryHook