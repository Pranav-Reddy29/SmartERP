"use client";

import { useState } from "react";

import {
  Building2,
  ChevronDown,
  Check,
} from "lucide-react";

import { useCompanies } from "@/hooks/useCompany";

import type { Company } from "@/services/company.service";

export default function CompanySwitcher() {
  const { data, isLoading } = useCompanies();

  const companies = data?.companies ?? [];

  const [selected, setSelected] =
    useState<Company | null>(null);

  const [open, setOpen] = useState(false);

  const selectedCompany = selected ?? companies[0] ?? null;

  if (isLoading) {
    return (
      <div className="w-80 rounded-xl border bg-white p-4">
        Loading companies...
      </div>
    );
  }

  return (
    <div className="relative w-80">

      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-xl border bg-white px-5 py-3 shadow-sm hover:border-blue-500 transition"
      >

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-blue-100 p-3">

            <Building2
              className="text-blue-600"
              size={22}
            />

          </div>

          <div className="text-left">

            <p className="text-xs text-gray-500">
              Active Company
            </p>

            <h3 className="font-semibold">
              {selected?.companyName ??
                "Select Company"}
            </h3>

          </div>

        </div>

        <ChevronDown
          className={`transition ${
            open ? "rotate-180" : ""
          }`}
        />

      </button>

      {open && (

        <div className="absolute left-0 right-0 z-50 mt-2 rounded-xl border bg-white shadow-xl">

          {companies.map((company) => (

            <button
              key={company.id}
              onClick={() => {
                setSelected(company);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between px-5 py-4 hover:bg-slate-50"
            >

              <div className="flex items-center gap-3">

                <Building2
                  className="text-blue-600"
                  size={18}
                />

                {company.companyName}

              </div>

              {selected?.id === company.id && (
                <Check
                  className="text-green-600"
                  size={18}
                />
              )}

            </button>

          ))}

          {companies.length === 0 && (

            <div className="p-5 text-center text-gray-500">

              No companies found

            </div>

          )}

        </div>

      )}

    </div>
  );
}