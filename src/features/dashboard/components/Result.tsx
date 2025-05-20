import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import AutismResult from "./AutismResult";
// import { Separator } from "@/shared/components/ui/separator";
import { formatTanggalIndonesia } from "@/shared/utils/formatDate";
// import NavyBayesResult from "./NavyBayesResult";
import usePatient from "../hooks/usePatient";
import { useEffect, useState } from "react";
import localStorageUtils from "@/shared/utils/storage";
import AlertInfo from "@/features/dashboard/components/AlertInfo";
import convertToPercent from "@/shared/utils/convertToPercent";
import StepRecomendation from "./StepRecomendation";

export default function Result() {
  const [patientState, setPatientState] = useState<{
    id: number;
    name: string;
  }>();
  const { patientResult } = usePatient(patientState?.id);

  useEffect(() => {
    if (localStorageUtils.has("PATIENT")) {
      const patient = localStorageUtils.get<{ id: number; name: string }>(
        "PATIENT"
      );

      if (patient) {
        setPatientState(patient);
      }
    }
  }, []);

  if (patientResult?.status !== 200) {
    return <div>Gagal memuat </div>;
  }

  const { patient } = patientResult.data;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1>Hasil Kuisioner</h1>
        </CardTitle>
        <CardDescription>
          <p>{formatTanggalIndonesia(new Date().toString())}</p>
          <p>
            {patient.pasienName}, {patient.pasienAge} bulan
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-6">
        <section className="">
          <div className="flex">
            <AutismResult
              label="ASD"
              value={+convertToPercent(+patient.nonAsdPresentasi)}
            />
            <AutismResult
              label="NON-ASD"
              value={+convertToPercent(+patient.asdPresentasi)}
            />
          </div>

          <AlertInfo clafication={patient.hasilKlasifikasi} />
          <StepRecomendation clafication={patient.hasilKlasifikasi} />
        </section>

        {/* <section>
          <h2>Hasil Kalkulasi Navy Bayes</h2>
          <Separator className="my-3 bg-primary" />
          <section className="grid grid-cols-2 gap-3">
            <NavyBayesResult
              label="Risiko Autisme"
              value={+posterior.posteriorYES}
            />
            <NavyBayesResult
              label="Tidak Terindikasi Autisme"
              value={+posterior.posteriorNO}
            />
          </section>
        </section> */}
      </CardContent>
    </Card>
  );
}
