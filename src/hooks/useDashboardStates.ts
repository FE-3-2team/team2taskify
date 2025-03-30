import { useState } from "react";
import type { ColumnData } from "@/types/column";

export default function useDashboardStates() {
  const [columns, setColumns] = useState<ColumnData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalContentType, setModalContentType] = useState<
    "addColumn" | "editColumn" | null
  >(null);
  const [isCreateCardModalOpen, setIsCreateCardModalOpen] = useState(false);
  const [isEditCardModalOpen, setIsEditCardModalOpen] = useState(false);
  const [isManageColumnModalOpen, setIsManageColumnModalOpen] = useState(false);
  const [targetColumnId, setTargetColumnId] = useState<number | null>(null);
  const [targetColumnTitle, setTargetColumnTitle] = useState<string>("");
  const [members, setMembers] = useState<Assignee[]>([]);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  return {
    columns,
    setColumns,
    isLoading,
    setIsLoading,
    modalContentType,
    setModalContentType,
    isCreateCardModalOpen,
    setIsCreateCardModalOpen,
    isEditCardModalOpen,
    setIsEditCardModalOpen,
    isManageColumnModalOpen,
    setIsManageColumnModalOpen,
    targetColumnId,
    setTargetColumnId,
    targetColumnTitle,
    setTargetColumnTitle,
    members,
    setMembers,
    newColumnTitle,
    setNewColumnTitle,
  };
}
