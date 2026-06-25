export interface DashboardStats {

    totalSales:number;

    totalPurchase:number;

    totalCustomers:number;

    totalStockItems:number;

}

export interface DashboardResponse{

    success:boolean;

    stats:DashboardStats;

}