import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
});

export const useTransactionGetMany = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const { data } = await axios.get("/api/transactions");
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useTransactionCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newTransaction) =>
      axios.post("/api/transactions", newTransaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
  });
};
