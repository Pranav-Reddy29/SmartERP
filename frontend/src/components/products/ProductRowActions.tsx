"use client";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Product } from "@/types/product";

interface Props {
  product: Product;

  onView?: (product: Product) => void;

  onEdit: (product: Product) => void;

  onDelete: (product: Product) => void;
}

export default function ProductRowActions({
  product,
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
            onClick={() => onView(product)}
          >
            View
          </DropdownMenuItem>

        )}

        <DropdownMenuItem
          onClick={() => onEdit(product)}
        >
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onDelete(product)}
          className="text-red-600 focus:text-red-600"
        >
          Delete
        </DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>
  );
}