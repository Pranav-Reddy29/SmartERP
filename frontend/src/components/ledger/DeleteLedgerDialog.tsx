"use client";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useDeleteLedger } from "@/hooks/useLedger";

import { Ledger } from "@/types/ledger";

import { toast } from "sonner";

interface Props {

    open:boolean;

    onOpenChange:(open:boolean)=>void;

    ledger:Ledger | null;

}

export default function DeleteLedgerDialog({

    open,

    onOpenChange,

    ledger

}:Props){

    const mutation=useDeleteLedger();

    const handleDelete=async()=>{

        if(!ledger) return;

        try{

            await mutation.mutateAsync(ledger.id);

            toast.success("Ledger deleted");

            onOpenChange(false);

        }catch{

            toast.error("Delete failed");

        }

    };

    return(

        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >

            <DialogContent>

                <DialogHeader>

                    <DialogTitle>

                        Delete Ledger

                    </DialogTitle>

                </DialogHeader>

                <p>

                    Are you sure you want to delete

                    <strong>

                        {" "}
                        {ledger?.ledgerName}

                    </strong>

                    ?

                </p>

                <DialogFooter>

                    <Button

                        variant="outline"

                        onClick={()=>onOpenChange(false)}

                    >

                        Cancel

                    </Button>

                    <Button

                        variant="destructive"

                        onClick={handleDelete}

                        disabled={mutation.isPending}

                    >

                        Delete

                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>

    );

}