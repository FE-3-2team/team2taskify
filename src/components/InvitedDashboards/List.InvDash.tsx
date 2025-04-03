import ItemInvDash from "@/components/InvitedDashboards/Item.InvDash";

interface ListInvDashProps {
  invitations: Invitation[];
  onRespond: (id: number, inviteAccepted: boolean) => void;
}

const ListInvDash: React.FC<ListInvDashProps> = ({
  invitations,
  onRespond,
}) => {
  return (
    <div className="flex flex-col tablet:gap-5">
      {invitations.map((inv) => (
        <ItemInvDash key={inv.id} invitation={inv} onRespond={onRespond} />
      ))}
    </div>
  );
};

export default ListInvDash;
