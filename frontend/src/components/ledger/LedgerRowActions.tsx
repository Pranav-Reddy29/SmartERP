"use client";

import { Ledger } from "@/types/ledger";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

interface LedgerRowActionsProps {
  ledger: Ledger;

  onView?: (ledger: Ledger) => void;

  onEdit: (ledger: Ledger) => void;

  onDelete: (ledger: Ledger) => void;
}

export default function LedgerRowActions({
  ledger,
  onView,
  onEdit,
  onDelete,
}: LedgerRowActionsProps) {
  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>

      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-48"
      >

        <DropdownMenuItem
          onClick={() => onView?.(ledger)}
        >
          <Eye className="mr-2 h-4 w-4" />

          View Ledger

        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => onEdit(ledger)}
        >
          <Pencil className="mr-2 h-4 w-4" />

          Edit Ledger

        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onDelete(ledger)}
          className="text-red-600 focus:text-red-600"
        >
          <Trash2 className="mr-2 h-4 w-4" />

          Delete Ledger

        </DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>
  );
}