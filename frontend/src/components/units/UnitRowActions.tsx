"use client";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Unit } from "@/types/unit";

interface Props {
  unit: Unit;

  onView?: (unit: Unit) => void;

  onEdit: (unit: Unit) => void;

  onDelete: (unit: Unit) => void;
}

export default function UnitRowActions({
  unit,
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
            onClick={() => onView(unit)}
          >
            View
          </DropdownMenuItem>

        )}

        <DropdownMenuItem
          onClick={() => onEdit(unit)}
        >
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onDelete(unit)}
          className="text-red-600 focus:text-red-600"
        >
          Delete
        </DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>
  );
}