"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CompanySwitcher from "@/components/dashboard/CompanySwitcher";
import GroupTable from "@/components/groups/GroupTable";
import GroupTableSkeleton from "@/components/groups/GroupTableSkeleton";
import CreateGroupDialog from "@/components/groups/CreateGroupDialog";
import EditGroupDialog from "@/components/groups/EditGroupDialog";
import DeleteGroupDialog from "@/components/groups/DeleteGroupDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { LedgerGroup } from "@/types/group";
import { useGroups } from "@/hooks/useGroup";
import useKeyboardShortcuts from "@/hooks/useKeyboardShortcuts";
import useAuth from "@/hooks/useAuth";

export default function GroupsPage() {
  const { company } = useAuth();
  const companyId = company?.id ?? "";
  const { data, isLoading } = useGroups(companyId);

  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<LedgerGroup | null>(null);

  useKeyboardShortcuts({
    onCreateGroup: () => setCreateOpen(true),
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <GroupTableSkeleton />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Group Management</h1>
            <p className="mt-2 text-muted-foreground">Create and manage ledger groups.</p>
          </div>
          <CompanySwitcher />
        </div>

        <div className="flex justify-end">
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Group
          </Button>
        </div>

        <GroupTable
          data={data?.groups ?? []}
          onView={(group) => console.log(group)}
          onEdit={(group) => {
            setSelectedGroup(group);
            setEditOpen(true);
          }}
          onDelete={(group) => {
            setSelectedGroup(group);
            setDeleteOpen(true);
          }}
        />
      </div>

      <CreateGroupDialog open={createOpen} onOpenChange={setCreateOpen} companyId={companyId} />
      <EditGroupDialog open={editOpen} onOpenChange={setEditOpen} group={selectedGroup} />
      <DeleteGroupDialog open={deleteOpen} onOpenChange={setDeleteOpen} group={selectedGroup} />
    </DashboardLayout>
  );
}
