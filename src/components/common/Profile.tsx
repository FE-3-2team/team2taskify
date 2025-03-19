import { Badge } from "./Badge";

interface Props {
  value: User;
  isEdit?: boolean;
}
export default function Profile({ value, isEdit }: Props) {
  let nickname = value.nickname;
  const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(value.nickname);
  const hangulRomanization = require("hangul-romanization");
  if (isKorean) nickname = hangulRomanization.convert(nickname);
  return (
    <div className="flex flex-row items-center gap-3 w-fit">
      <Badge nickname={nickname} img={value.profileImageUrl} />
      <p className={"hidden text-lg-medium text-black-200 tablet:block"}>
        {value.nickname}
      </p>
    </div>
  );
}
