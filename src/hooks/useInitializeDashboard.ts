import { useEffect } from "react";
import { getMember } from "@/api/member";

export function useInitializeDashboard({
  dashboardId,
  fetchColumns,
  setMembers,
}: {
  dashboardId: string | string[] | undefined;
  fetchColumns: (id: string) => void;
  setMembers: (members: Assignee[]) => void;
}) {
  useEffect(() => {
    if (typeof dashboardId === "string") {
      fetchColumns(dashboardId);
    }
  }, [dashboardId]);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!dashboardId || typeof dashboardId !== "string") return;
      try {
        const { members } = await getMember(1, Number(dashboardId), 20);
        const formatted = members.map((m: any) => ({
          id: m.id,
          userId: m.userId,
          nickname: m.nickname,
          profileImageUrl: m.profileImageUrl,
        }));
        setMembers(formatted);
      } catch (err) {
        console.error("멤버 조회 실패", err);
      }
    };

    fetchMembers();
  }, [dashboardId]);
}
