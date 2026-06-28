export const validateCategory = (body: any) => {

  if (!body.name) {

    return "Category name is required";

  }

  if (!body.companyId) {

    return "Company is required";

  }

  return null;

};