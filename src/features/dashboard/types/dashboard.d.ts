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
  A1: string;
  A2: string;
  A3: string;
  A4: string;
  A5: string;
  A6: string;
  A7: string;
  A8: string;
  A9: string;
  A10: string;
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
