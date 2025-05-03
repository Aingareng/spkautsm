import { Info } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../shared/components/ui/alert";

interface IProps {
  clafication: "YES" | "NO";
}

export default function AlertInfo({ clafication }: IProps) {
  let titleContent = "Termasuk dalam kemungkinan ASD";
  let descriptionContent = (
    <ul className="text-xs">
      <li> - Hasil ini diperoleh dari model prediksi berbasis data.</li>
      <li> - Ini bukan diagnosis medis.</li>
      <li>
        - Kami menyarankan Anda untuk membawa hasil ini ke dokter anak,
        psikolog, atau profesional kesehatan lainnya untuk evaluasi lanjutan.
      </li>
    </ul>
  );

  if (clafication === "NO") {
    titleContent = "Tidak Terindikasi ASD (non-ASD)";
    descriptionContent = (
      <ul className="text-xs">
        <li>
          {" "}
          - Berdasarkan data yang dimasukkan, anak tidak menunjukkan indikasi
          kuat berada dalam spektrum autisme.
        </li>
        <li> - Namun, ini hanyalah prediksi awal dari sistem.</li>
        <li>
          - Jika Anda masih memiliki kekhawatiran atau observasi khusus,
          konsultasi lanjutan tetap disarankan.
        </li>
      </ul>
    );
  }

  return (
    <Alert className="bg-sky-950 text-white">
      <Info className="h-10 w-10" />
      <AlertTitle>
        <h3 className="p-0.5">Hasil Klasifikasi: {titleContent}</h3>
      </AlertTitle>
      <AlertDescription className="pt-2.5 text-white">
        <h4>📌 Catatan Penting:</h4>
        {descriptionContent}
      </AlertDescription>
    </Alert>
  );
}
