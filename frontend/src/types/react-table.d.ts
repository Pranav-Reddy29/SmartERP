import "@tanstack/react-table";

import { Ledger } from "./ledger";
import { LedgerGroup } from "./group";

declare module "@tanstack/react-table" {
  interface TableMeta<TData> {
    onView?: (item: Ledger | LedgerGroup) => void;

    onEdit?: (item: Ledger | LedgerGroup) => void;

    onDelete?: (item: Ledger | LedgerGroup) => void;
  }
}