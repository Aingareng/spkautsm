import { Button } from "@/shared/components/ui/button";
import { CardContent, CardFooter } from "@/shared/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ILoginRequest } from "../types/login";

const formSchema = z.object({
  email: z
    .string()
    .nonempty("Email wajib diisi")
    .email({ message: "Email tidak valid" }),
  password: z
    .string()
    .min(8, "Kata sandi minimal harus terdiri dari 8 karakter"),
});

interface IProps {
  onSending: (payload: ILoginRequest) => void;
}

export default function LoginForm({ onSending }: IProps) {
  function onSubmit(values: z.infer<typeof formSchema>) {
    onSending({
      email: values.email,
      pass: values.password,
    } as ILoginRequest);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CardContent className="grid grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Cth : johndoe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kata sandi</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter className="border mx-5 px-0">
          <Button type="submit" className="w-full cursor-pointer">
            Masuk
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
