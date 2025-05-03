import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPatient, getPatientResult } from "../services/api";
import { IBioPatientPayload } from "../types/dashboard";

const QUERY_KEY = "patients";

const usePatient = (id?: number) => {
  const queryClient = useQueryClient();

  const {
    data: patientResult,
    error,
    isError,
    isFetched,
    isFetching,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: id ? [QUERY_KEY, id] : [QUERY_KEY],
    queryFn: () => getPatientResult(id!),
    enabled: !!id,
  });

  const createMutation = useMutation({
    mutationFn: (payload: IBioPatientPayload) => createPatient(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] }),
  });

  return {
    patientResult,
    error,
    isError,
    isFetched,
    isFetching,
    isLoading,
    isPending,
    createPatient: createMutation.mutateAsync,
  };
};

export default usePatient;
