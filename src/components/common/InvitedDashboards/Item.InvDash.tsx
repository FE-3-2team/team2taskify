interface InvitedDashboardItemProps {
  id: number;
  title: string;
  inviter: string;
  onRespond: (id: number, accepted: boolean) => void;
}

export default function ItemInvDash({
  id,
  title,
  inviter,
  onRespond,
}: InvitedDashboardItemProps) {
  return (
    <div className="">
      <div className="">
        <p className="">{title}</p>
        <p className="">{inviter}</p>
      </div>

      <div className="">
        <button className="" onClick={() => onRespond(id, true)}>
          수락
        </button>
        <button className="" onClick={() => onRespond(id, false)}>
          거절
        </button>
      </div>
    </div>
  );
}
