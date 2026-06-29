"use client";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Purchase } from "@/types/purchase";

interface Props {
  purchase: Purchase;

  onView?: (purchase: Purchase) => void;

  onEdit: (purchase: Purchase) => void;

  onDelete: (purchase: Purchase) => void;
}

export default function PurchaseRowActions({
  purchase,
  onView,
  onEdit,
  onDelete,
}: Props) {
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
        className="w-44"
      >

        {onView && (

          <DropdownMenuItem
            onClick={() => onView(purchase)}
          >
            View
          </DropdownMenuItem>

        )}

        <DropdownMenuItem
          onClick={() => onEdit(purchase)}
        >
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onDelete(purchase)}
          className="text-red-600 focus:text-red-600"
        >
          Delete
        </DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>
  );
}