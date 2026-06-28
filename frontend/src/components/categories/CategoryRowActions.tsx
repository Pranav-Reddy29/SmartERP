"use client";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Category } from "@/types/category";

interface Props {
  category: Category;

  onView?: (category: Category) => void;

  onEdit: (category: Category) => void;

  onDelete: (category: Category) => void;
}

export default function CategoryRowActions({
  category,
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
            onClick={() => onView(category)}
          >
            View
          </DropdownMenuItem>

        )}

        <DropdownMenuItem
          onClick={() => onEdit(category)}
        >
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onDelete(category)}
          className="text-red-600 focus:text-red-600"
        >
          Delete
        </DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>
  );
}