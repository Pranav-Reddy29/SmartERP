"use client";

import { LedgerGroup } from "@/types/group";

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

interface GroupRowActionsProps {
  group: LedgerGroup;

  onView?: (group: LedgerGroup) => void;

  onEdit: (group: LedgerGroup) => void;

  onDelete: (group: LedgerGroup) => void;
}

export default function GroupRowActions({
  group,
  onView,
  onEdit,
  onDelete,
}: GroupRowActionsProps) {
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
          onClick={() => onView?.(group)}
        >
          <Eye className="mr-2 h-4 w-4" />
          View Group
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => onEdit(group)}
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit Group
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onDelete(group)}
          className="text-red-600 focus:text-red-600"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Group
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}