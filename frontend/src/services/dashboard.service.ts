import api from "@/lib/api";

export const getDashboardStats=async()=>{

    const response=await api.get("/dashboard");

    return response.data;

};