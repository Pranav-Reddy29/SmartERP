import "@tanstack/react-table";
import { Ledger } from "./ledger";

declare module "@tanstack/react-table" {
  interface TableMeta<TData> {
    onView?: (ledger: Ledger) => void;
    onEdit?: (ledger: Ledger) => void;
    onDelete?: (ledger: Ledger) => void;
  }
}