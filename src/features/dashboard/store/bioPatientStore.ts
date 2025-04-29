import localStorageUtils from "@/shared/utils/storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TypePatientStatus = "INPUT_BIO" | "CHEKUP" | "RESULT";

interface IBioPatientState {
  patientStatus: TypePatientStatus;
}

const initialState: IBioPatientState = {
  patientStatus: "INPUT_BIO",
};

export const bioPatientStore = createSlice({
  name: "bioPatient",
  initialState,
  reducers: {
    setPatientStatus: (
      state,
      action: PayloadAction<IBioPatientState["patientStatus"]>
    ) => {
      state.patientStatus = action.payload;
      localStorageUtils.set("PATIENT_STATE", action.payload);
    },
  },
});

export const { setPatientStatus } = bioPatientStore.actions;
export default bioPatientStore.reducer;
