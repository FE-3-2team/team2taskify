// import Image from "next/image";
// import { useState } from "react";
// import Next from "@/assets/icons/NextPage.icon.svg";
// import Prev from "@/assets/icons/PrevPage.icon.svg";

// interface Props {
//   invitations?: Invitations[];
// }
// export default function InvitationHistory({ invitations }: Props) {
//   const totalPage = Math.ceil(invitations.length / 5);
//   const [page, setPage] = useState(1);
//   return (
//     <div className="w-[284px] h-[406px] tablet:w-[620px] tablet:h-[477px] pt-6 pb-3 tablet:pt-8 tablet:pb-0">
//       <div className="flex ">
//         <p className="xl-bold tablet:text-2xl-bold"> 초대 내역</p>
//         <div>
//           <p>
//             {totalPage} 페이지 중 {page}
//           </p>
//           <button>
//             <Image src={Prev} width={40} height={40} alt="<" />
//           </button>
//           <button>
//             <Image src={Next} width={40} height={40} alt=">" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
