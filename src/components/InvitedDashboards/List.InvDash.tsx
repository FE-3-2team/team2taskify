import ItemInvDash from "@/components/InvitedDashboards/Item.InvDash";
import { InvitationType } from "@/api/invitations";

interface ListInvDashProps {
  invitations: InvitationType[];
  onRespond: (id: number, inviteAccepted: boolean) => void;
}

const ListInvDash: React.FC<ListInvDashProps> = ({
  invitations,
  onRespond,
}) => {
  return (
    <div>
      {invitations.map((inv) => (
        <ItemInvDash key={inv.id} invitation={inv} onRespond={onRespond} />
      ))}
    </div>
  );
};

export default ListInvDash;
