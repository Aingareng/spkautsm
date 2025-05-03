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
  idUser: string;
  A1: "yes" | "no";
  A2: "yes" | "no";
  A3: "yes" | "no";
  A4: "yes" | "no";
  A5: "yes" | "no";
  A6: "yes" | "no";
  A7: "yes" | "no";
  A8: "yes" | "no";
  A9: "yes" | "no";
  A10: "yes" | "no";
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

interface IPatientData {
  pasienId: number;
  pasienName: string;
  pasienAge: number;
  pasienGender: TypePatientSex;
  asdPresentasi: string;
  nonAsdPresentasi: string;
  hasilKlasifikasi: "YES" | "NO";
}

interface IPosterior {
  posteriorYES: string;
  posteriorNO: string;
}

export interface IPatientResult {
  patient: IPatientData;
  calculationDetails: {
    posterior: IPosterior;
  };
}
