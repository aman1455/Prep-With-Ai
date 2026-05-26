import React from "react";
import { LuCircleAlert } from "react-icons/lu";

const DeleteAlertContent = ({ content, onDelete }) => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-danger/10 border border-danger/20 flex items-center justify-center">
          <LuCircleAlert className="text-danger" size={18} />
        </div>
        <div>
          <h4 className="font-display font-semibold text-sm text-text-primary">Delete Session</h4>
          <p className="text-xs text-text-muted mt-0.5">This action cannot be undone</p>
        </div>
      </div>
      <p className="text-sm text-text-secondary mb-6">{content}</p>
      <div className="flex justify-end gap-3">
        <button type="button" className="btn-secondary text-xs px-4 py-2">Cancel</button>
        <button type="button" className="btn-danger text-xs px-4 py-2" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlertContent;
