"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { handleCreateProduct } from "@/services/create";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2),
  category: z.coerce.number().min(1),
  base_price: z.coerce.number().min(1),
  discount_percentage: z.coerce.number(),
  image_url: z.string().min(2),
});

export type FormSchema = z.infer<typeof formSchema>;

export function AddProductForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: 0,
      base_price: 0,
      discount_percentage: 0,
      image_url: "",
    },
  });

  async function onSubmit(values: FormSchema) {
    setIsLoading(true);

    try {
      await handleCreateProduct(values);

      form.reset();
    } catch (error) {
      window.alert("Erro ao criar produto!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Adicionar produtos!</CardTitle>
        <CardDescription>
          Preencha os campos para adicionar os produtos ao banco do
          supermercado.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Produto:</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria:</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="base_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço base:</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      type="number"
                      step=".01"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discount_percentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Porcentagem de disconto:</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      type="number"
                      step=".01"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Url da Imagem:</FormLabel>
                  <FormControl>
                    <Input autoComplete="off" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="self-center w-28">
              {isLoading ? "Carregando..." : "Criar"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
