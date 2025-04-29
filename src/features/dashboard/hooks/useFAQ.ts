import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFAQ, getFAQ } from "../services/api";
import { IFAQPayload } from "../types/dashboard";

export default function useFAQ() {
  const queryClient = useQueryClient();
  const queryKey = ["faq"];

  const {
    data: quiz,
    error,
    isFetched,
    isFetching,
    isPending,
    isLoading,
  } = useQuery({
    queryKey,
    queryFn: () => getFAQ(),
  });

  const createMutation = useMutation({
    mutationFn: (payload: IFAQPayload) => createFAQ(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    quiz,
    error,
    isFetched,
    isFetching,
    isPending,
    isLoading,
    createFAQ: createMutation.mutateAsync,
  };
}
