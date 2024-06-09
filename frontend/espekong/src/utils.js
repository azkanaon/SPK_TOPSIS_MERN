import { twMerge } from "tailwind-merge";

export const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
};

export function cn(...inputs) {
  return twMerge(inputs);
}
