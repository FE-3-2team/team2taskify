import EmailInput from "../components/common/Input/EmailInput";
import PasswordInput from "@/components/common/Input/PasswordInput";
import TitleInput from "@/components/common/Input/TitleInput";
import DeadlineInput from "@/components/common/Input/DateInput";

export default function TestPage() {
  return (
    <div className="container mx-auto p-4">
      <EmailInput />
      <PasswordInput />
      <TitleInput />
      <DeadlineInput />
    </div>
  );
}
