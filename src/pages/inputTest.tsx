import EmailInput from "../components/common/Input/EmailInput";
import PasswordInput from "@/components/common/Input/PasswordInput";
import TitleInput from "@/components/common/Input/TitleInput";
import DeadlineInput from "@/components/common/Input/DateInput";
import CommentBox from "@/components/common/Input/TextPlace";
import AuthForm from "@/components/common/Input/Auth";
export default function TestPage() {
  return (
    <div className="container p-4 mx-auto">
      <EmailInput />
      <PasswordInput />
      <TitleInput />
      <DeadlineInput />
      <CommentBox />
      <AuthForm />
    </div>
  );
}
