import IApiResponse from "@/shared/types/apiResponse";
import { api } from "@/shared/utils/api";
import {
  IBioPatientData,
  IBioPatientPayload,
  IFAQPayload,
  IFAQTableData,
} from "../types/dashboard";

export const getFAQ = async () =>
  await api.get<IApiResponse<IFAQTableData[]>>("/getQchat10");

export const createPatient = async (payload: IBioPatientPayload) =>
  await api.post<IApiResponse<IBioPatientData>>("/postPasien", payload);

export const createFAQ = async (payload: IFAQPayload) =>
  await api.post<IApiResponse<null>>("/insertKuisoner", payload);
