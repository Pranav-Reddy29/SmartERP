import DashboardLayout from "@/components/layout/DashboardLayout";

import CompanySwitcher from "@/components/dashboard/CompanySwitcher";

import StatsGrid from "@/components/dashboard/StatsGrid";

import SalesAnalytics from "@/components/dashboard/SalesAnalytics";

import ActivityTimeline from "@/components/dashboard/ActivityTimeline";

import QuickActions from "@/components/dashboard/QuickActions";

import RecentTransactions from "@/components/dashboard/RecentTransactions";

import LowStock from "@/components/dashboard/LowStock";

export default function DashboardPage(){

    return(

        <DashboardLayout>

            <div className="space-y-8">

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                        <h1 className="text-4xl font-bold">

                            Dashboard

                        </h1>

                        <p className="mt-2 text-gray-500">

                            Welcome to SmartERP Billing, Inventory & Accounting Management System

                        </p>

                    </div>

                    <CompanySwitcher/>

                </div>

                <StatsGrid/>

                <div className="grid gap-6 lg:grid-cols-2">

                    <SalesAnalytics/>

                    <ActivityTimeline/>

                </div>

                <QuickActions/>

                <div className="grid gap-6 lg:grid-cols-2">

                    <RecentTransactions/>

                    <LowStock/>

                </div>

            </div>

        </DashboardLayout>

    );

}