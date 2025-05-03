import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";

interface IProps {
  clafication: "YES" | "NO";
}
export default function StepRecomendation({ clafication }: IProps) {
  let descriptionContent = (
    <ul className="text-sm">
      <li> - Konsultasi dengan tenaga medis atau psikolog anak.</li>
      <li> - Lakukan observasi lebih lanjut di rumah dan sekolah..</li>
      <li> - Bawa hasil ini sebagai pendukung saat pemeriksaan profesional.</li>
    </ul>
  );

  if (clafication === "NO") {
    descriptionContent = (
      <ul className="text-sm">
        <li> - Lanjutkan pemantauan perkembangan anak secara berkala.</li>
        <li>
          {" "}
          - Jika muncul kekhawatiran baru, segera konsultasi ke profesional.
        </li>
        <li>
          - Gunakan aplikasi ini kembali untuk evaluasi berkala bila diperlukan.
        </li>
      </ul>
    );
  }

  return (
    <Alert className="mt-4">
      <AlertTitle>
        <h3 className="p-0.5">🔗 Langkah Selanjutnya yang Disarankan:</h3>
      </AlertTitle>
      <AlertDescription className="pt-2.5">
        {descriptionContent}
      </AlertDescription>
    </Alert>
  );
}
