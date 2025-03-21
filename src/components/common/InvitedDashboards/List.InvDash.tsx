const ListInvDash: React.FC<{ invitations: Invitation[] }> = ({
  invitations,
}) => {
  return (
    <ul>
      {invitations.map((invite) => (
        <li key={invite.id} className="">
          {invite.dashboard.title} - 초대한 사람: {invite.inviter.nickname}
        </li>
      ))}
    </ul>
  );
};

export default ListInvDash;
