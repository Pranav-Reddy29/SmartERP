import { CreatePurchaseDTO } from "../types/purchase.types";

export const validatePurchase = (
  body: CreatePurchaseDTO
): string | null => {

  if (!body.voucherNumber) {
    return "Voucher number is required";
  }

  if (!body.companyId) {
    return "Company is required";
  }

  if (!body.supplierId) {
    return "Supplier is required";
  }

  if (!body.items || body.items.length === 0) {
    return "At least one purchase item is required";
  }

  for (const item of body.items) {

    if (!item.productId) {
      return "Product is required";
    }

    if (item.quantity <= 0) {
      return "Quantity must be greater than zero";
    }

    if (item.rate < 0) {
      return "Rate cannot be negative";
    }

  }

  return null;
};