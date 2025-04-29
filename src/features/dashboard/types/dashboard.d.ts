type TypePatientSex = "m" | "f";
type TypeUnion = "yes" | "no" | "unknown";

export interface IBioPatientPayload {
  name: string;
  age: number;
  sex: boolean | TypePatientSex;
  juandice: TypeUnion;
  familyAsd: TypeUnion;
}
export interface IFAQPayload {
  idUser: number;
  A1: number;
  A2: number;
  A3: number;
  A4: number;
  A5: number;
  A6: number;
  A7: number;
  A8: number;
  A9: number;
  A10: number;
}

type TypeDatasetVariable =
  | "A1"
  | "A2"
  | "A3"
  | "A4"
  | "A5"
  | "A6"
  | "A7"
  | "A8"
  | "A9"
  | "A10";
export interface IFAQTableData {
  id: number;
  dataset_variabel: TypeDatasetVariable;
  question_text: string;
}

export interface IBioPatientData {
  id: number;
  name: string;
}
