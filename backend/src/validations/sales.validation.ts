export const validateSales = (body: any) => {

  if (!body.voucherNumber) {
    return "Voucher number is required";
  }

  if (!body.voucherDate) {
    return "Voucher date is required";
  }

  if (!body.customerId) {
    return "Customer is required";
  }

  if (!body.companyId) {
    return "Company is required";
  }

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return "At least one sales item is required";
  }

  for (const item of body.items) {

    if (!item.productId) {
      return "Product is required";
    }

    if (!item.quantity || item.quantity <= 0) {
      return "Quantity must be greater than zero";
    }

    if (item.rate == null || item.rate < 0) {
      return "Rate is invalid";
    }

  }

  return null;

};