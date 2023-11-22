import axios from "axios";
import { FormSchema } from "@/components/add-product-form";

export async function handleCreateProduct(data: FormSchema) {
  await axios.post("https:supermercadoapi.vercel.app/products", data);
}
