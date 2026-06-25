"use client";

import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import { useState } from "react";

export default function Providers({

    children,

}:{

    children:React.ReactNode

}){

    const [queryClient]=useState(()=>new QueryClient());

    return(

        <QueryClientProvider client={queryClient}>

            {children}

            <Toaster richColors position="top-right"/>

        </QueryClientProvider>

    );

}