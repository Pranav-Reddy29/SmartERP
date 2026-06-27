export const validateGroup = (
  body: any
) => {

  if (!body.name) {

    return "Group Name is required";

  }

  if (!body.nature) {

    return "Nature is required";

  }

  if (!body.companyId) {

    return "Company is required";

  }

  return null;

};