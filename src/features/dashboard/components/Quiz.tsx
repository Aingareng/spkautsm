import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import useFAQ from "../hooks/useFAQ";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { useForm } from "react-hook-form";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import localStorageUtils from "@/shared/utils/storage";
import { IBioPatientData, IFAQPayload } from "../types/dashboard";
import { StatusCodes } from "@/shared/types/statusCodes";
import { toast } from "sonner";

const formSchema = z
  .object({
    A1: z.enum(["yes", "no"], { required_error: "Wajib di isi" }),
    A2: z.enum(["yes", "no"], { required_error: "Wajib di isi" }),
    A3: z.enum(["yes", "no"], { required_error: "Wajib di isi" }),
    A4: z.enum(["yes", "no"], { required_error: "Wajib di isi" }),
    A5: z.enum(["yes", "no"], { required_error: "Wajib di isi" }),
    A6: z.enum(["yes", "no"], { required_error: "Wajib di isi" }),
    A7: z.enum(["yes", "no"], { required_error: "Wajib di isi" }),
    A8: z.enum(["yes", "no"], { required_error: "Wajib di isi" }),
    A9: z.enum(["yes", "no"], { required_error: "Wajib di isi" }),
    A10: z.enum(["yes", "no"], { required_error: "Wajib di isi" }),
  })
  .and(z.record(z.string(), z.string()));

export default function Quiz() {
  const { quiz, isLoading, createFAQ } = useFAQ();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      A1: "yes",
      A2: "yes",
      A3: "yes",
      A4: "yes",
      A5: "yes",
      A6: "yes",
      A7: "yes",
      A8: "yes",
      A9: "yes",
      A10: "yes",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const user = localStorageUtils.get<IBioPatientData>("PATIENT");

    if (!user) {
      toast("Bio pasien tidak ditemukan");
      return;
    }

    const payload: IFAQPayload = {
      ...values,
      idUser: user.id.toString(),
    };

    const result = await createFAQ(payload);

    if (
      result.status === StatusCodes.CREATED ||
      result.status === StatusCodes.ACCEPTED
    ) {
      toast("Berhasil");
    }
  }

  if (isLoading)
    return (
      <Card className="w-[550px]">
        <CardHeader>
          <Skeleton className="h-4 w-full bg-neutral-200" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-4 w-[50px] bg-neutral-200" />
          <Skeleton className="h-4 w-[50px] bg-neutral-200" />
        </CardContent>
      </Card>
    );

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        {quiz &&
          quiz.data?.map((item) => (
            <Card
              key={item.id}
              className="w-[550px] border border-l-8 border-l-primary"
            >
              <CardHeader>{item.question_text}</CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name={`A${item.id}` as const}
                  render={({ field }) => (
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
                        <FormMessage />
                      </RadioGroup>
                    </FormControl>
                  )}
                />
              </CardContent>
            </Card>
          ))}
        <div className="flex justify-end mt-4">
          <Button type="submit">Kirim</Button>
        </div>
      </form>
    </Form>
  );
}
