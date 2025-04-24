import { useMutation, useQueryClient } from "@tanstack/react-query";
import post from "../services/api";
import { ILoginRequest } from "../types/login";

export default function useLogin() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (payload: ILoginRequest) => post(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] });
    },
  });

  return {
    loginApi: createMutation.mutateAsync,
  };
}
