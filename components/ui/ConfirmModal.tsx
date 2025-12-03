"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
};

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = "Confirmation",
  message = "Voulez-vous vraiment effectuer cette action ?"
}: ConfirmModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <p className="text-gray-600">{message}</p>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>

          <Button  variant="destructive" onClick={onConfirm}>
            Confirmer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
