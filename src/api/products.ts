import { apiFetch } from "./client";
import type { CreateProductInput, Product } from "../types";

export function getProducts(): Promise<Product[]> {
  return apiFetch<Product[]>("/products");
}

export function getProductById(id: number): Promise<Product> {
  return apiFetch<Product>(`/products/${id}`);
}

export function getCategories(): Promise<string[]> {
  return apiFetch<string[]>("/products/categories");
}

export function createProduct(data: CreateProductInput): Promise<Product> {
  return apiFetch<Product>("/products", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
