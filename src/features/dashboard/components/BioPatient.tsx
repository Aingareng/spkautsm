import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Button } from "@/shared/components/ui/button";
import usePatient from "../hooks/usePatient";
import { IBioPatientPayload } from "../types/dashboard";
import { StatusCodes } from "@/shared/types/statusCodes";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { setPatientStatus } from "../store/bioPatientStore";
import localStorageUtils from "@/shared/utils/storage";

const formSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Nama pasien wajib diisi" })
    .min(2, { message: "Nama pasien minimal 2 huruf" })
    .refine((val) => /^[A-Za-z\s]+$/.test(val), {
      message: "Nama pasien hanya boleh berisi huruf dan spasi",
    }),
  age: z
    .string()
    .nonempty({ message: "Umur pasien wajib diisi" })
    .regex(/^\d+$/, { message: "Umur hanya boleh berupa angka" })
    .transform((val) => parseInt(val, 10))
    .refine((val) => val <= 3, {
      message: "Umur pasien tidak boleh lebih dari 3 tahun",
    })
    .transform((val) => val.toString()),
  sex: z.enum(["f", "m"]),
  familyAsd: z.enum(["yes", "no"]),
  juandice: z.enum(["yes", "no"]),
});

export default function BioPatient() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: "",
      familyAsd: "yes",
      juandice: "yes",
      sex: "m",
    },
  });

  const { createPatient } = usePatient();
  const dispatch = useAppDispatch();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const payload: IBioPatientPayload = {
      ...values,
      age: +values.age,
    };
    const result = await createPatient(payload);

    if (result.status === StatusCodes.CREATED) {
      dispatch(setPatientStatus("CHEKUP"));
      localStorageUtils.set("PATIENT", result.data);
    }

    return;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="w-[550px]">
          <CardHeader>
            <CardTitle>
              <h2>Bio Pasien</h2>
            </CardTitle>
            <CardDescription>
              Silahkan isi data diri pasien untuk memulai.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Pasien</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukan nama lengkap" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Umur Pasien</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukan umur pasien" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Kelamin</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih jenis kelamin" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m">Laki-laki</SelectItem>
                      <SelectItem value="f">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="juandice"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    Apakah pasien menderita penyakit kuning?
                  </FormLabel>

                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal">Ya</FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">Tidak</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="familyAsd"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    Apakah ada riwayat keluarga yang menderita autisme?
                  </FormLabel>

                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal">Ya</FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">Tidak</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex justify-end space-x-2">
            <Button type="submit">Kirim</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
