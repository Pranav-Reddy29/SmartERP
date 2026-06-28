export const validateProduct = (body: any) => {

  if (!body.name) {

    return "Product name is required";

  }

  if (!body.companyId) {

    return "Company is required";

  }

  if (!body.categoryId) {

    return "Category is required";

  }

  if (!body.unitId) {

    return "Unit is required";

  }

  return null;

};