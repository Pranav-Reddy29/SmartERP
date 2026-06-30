"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import {
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import { Sales } from "@/types/sales";

interface SalesRowActionsProps {
  sale: Sales;

  onEdit: (sale: Sales) => void;

  onDelete: (sale: Sales) => void;
}

export default function SalesRowActions({
  sale,
  onEdit,
  onDelete,
}: SalesRowActionsProps) {

  return (

    <DropdownMenu>

      <DropdownMenuTrigger asChild>

        <Button
          variant="ghost"
          size="icon"
        >

          <MoreHorizontal className="h-4 w-4" />

        </Button>

      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
      >

        <DropdownMenuItem
          onClick={() =>
            onEdit(sale)
          }
        >

          <Pencil className="mr-2 h-4 w-4" />

          Edit

        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() =>
            onDelete(sale)
          }
          className="text-red-600 focus:text-red-600"
        >

          <Trash2 className="mr-2 h-4 w-4" />

          Delete

        </DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>

  );

}