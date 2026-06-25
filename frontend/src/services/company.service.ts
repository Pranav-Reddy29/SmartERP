import api from "@/lib/api";

export interface Company {
  id: string;
  companyName: string;
  gstNumber?: string;
  state?: string;
  address?: string;
  phone?: string;
  financialYear?: string;
}

export interface CompaniesResponse {
  success: boolean;
  companies: Company[];
}

export interface CompanyResponse {
  success: boolean;
  company: Company;
}

export const getCompanies = async (): Promise<CompaniesResponse> => {
  const { data } = await api.get("/company");
  return data;
};

export const getCompany = async (
  id: string
): Promise<CompanyResponse> => {
  const { data } = await api.get(`/company/${id}`);
  return data;
};

export const createCompany = async (
  company: Partial<Company>
): Promise<CompanyResponse> => {
  const { data } = await api.post("/company", company);
  return data;
};

export const updateCompany = async (
  id: string,
  company: Partial<Company>
): Promise<CompanyResponse> => {
  const { data } = await api.put(`/company/${id}`, company);
  return data;
};

export const deleteCompany = async (id: string) => {
  const { data } = await api.delete(`/company/${id}`);
  return data;
};