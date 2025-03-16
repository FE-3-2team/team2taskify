import EmailInput from "../components/common/Input/EmailInput";
import PasswordInput from "@/components/common/Input/PasswordInput";
import TitleInput from "@/components/common/Input/TitleInput";

export default function TestPage() {
  return (
    <div className="container mx-auto p-4">
      <EmailInput />
      <PasswordInput />
      <TitleInput />
    </div>
  );
}
