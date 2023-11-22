"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
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

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { handleCreateProduct } from "@/services/create";
import { useState } from "react";

import { categories } from "@/data";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";

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

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("2");

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

    const product = {
      name: values.name,
      category: Number(value),
      base_price: values.base_price,
      discount_percentage: values.discount_percentage,
      image_url: values.image_url,
    };

    try {
      await handleCreateProduct(product);

      form.reset();
      setValue("2");
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

            <Label className="-mb-2">Categoria:</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {value
                    ? categories.find(
                        (category) => category.value.toString() === value
                      )?.label
                    : "Selecione categoria..."}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[334px] p-0">
                <Command className="w-full">
                  <CommandInput
                    placeholder="Procurar categoria..."
                    className="h-9"
                  />
                  <CommandEmpty>Nenhuma categoria encontrada.</CommandEmpty>
                  <CommandGroup>
                    <ScrollArea className="h-40">
                      {categories.map((category) => (
                        <CommandItem
                          key={category.value}
                          value={category.value.toString()}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          {category.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              value === category.value.toString()
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </ScrollArea>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

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
