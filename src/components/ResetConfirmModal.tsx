import React from 'react';
import { X, RotateCcw, AlertTriangle } from 'lucide-react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReset: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirmReset,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="bg-[#FAF7F2] rounded-3xl border border-[#DDD3C0] max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reset-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#5B6962] hover:text-[#183B2B] hover:bg-[#EFE7D8] transition cursor-pointer"
          aria-label="Close Reset Dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-100 border border-amber-300 text-amber-900 flex items-center justify-center shrink-0">
            <RotateCcw className="w-5 h-5 text-[#D95D39]" />
          </div>
          <div>
            <h2 id="reset-modal-title" className="font-serif-heading text-xl font-bold text-[#183B2B]">
              Reset Demo Data?
            </h2>
            <p className="text-xs text-[#5D6B64]">Restore original demo state</p>
          </div>
        </div>

        <p className="text-xs text-[#43514A] leading-relaxed">
          This will reset your profile back to the fictional Alex profile (Excel ⇄ English conversation) and restore the default sample exchange proposals.
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#48554E] hover:bg-[#EFE7D8] transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirmReset();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-[#D95D39] text-white text-xs font-semibold hover:bg-[#C24E2A] transition cursor-pointer shadow-xs flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
