import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPatient } from "../services/api";
import { IBioPatientPayload } from "../types/dashboard";

const QUERY_KEY = ["patients"];

const usePatient = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (payload: IBioPatientPayload) => createPatient(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });

  return {
    createPatient: createMutation.mutateAsync,
  };
};

export default usePatient;
