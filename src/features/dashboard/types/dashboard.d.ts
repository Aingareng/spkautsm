type TypePatientSex = "m" | "f";
type TypeUnion = "yes" | "no" | "unknown";

export interface IBioPatientPayload {
  name: string;
  age: number;
  sex: boolean | TypePatientSex;
  juandice: TypeUnion;
  familyAsd: TypeUnion;
}
