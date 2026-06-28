export const validateUnit = (body: any) => {

  if (!body.name) {

    return "Unit name is required";

  }

  if (!body.shortName) {

    return "Short name is required";

  }

  if (!body.companyId) {

    return "Company is required";

  }

  return null;

};