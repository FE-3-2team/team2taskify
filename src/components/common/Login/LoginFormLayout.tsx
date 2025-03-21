import React from "react";

interface LoginFormLayoutProps {
  logoSection: React.ReactNode;
  formSection: React.ReactNode;
  buttonSection: React.ReactNode;
  footerSection: React.ReactNode;
  logoToFormSpacingClass?: string;
  formToButtonSpacingClass?: string;
  buttonToFooterSpacingClass?: string;
}

export default function LoginFormLayout({
  logoSection,
  formSection,
  buttonSection,
  footerSection,
  logoToFormSpacingClass = "mt-[30px]",
  formToButtonSpacingClass = "mt-[24px]",
  buttonToFooterSpacingClass = "mt-[10px] md:mt-[24px]",
}: LoginFormLayoutProps) {
  return (
    <div className="flex flex-col items-center">
      <div>{logoSection}</div>
      <div className={`w-full ${logoToFormSpacingClass}`}>{formSection}</div>
      <div className={`w-full ${formToButtonSpacingClass}`}>
        {buttonSection}
      </div>
      <div className={buttonToFooterSpacingClass}>{footerSection}</div>
    </div>
  );
}
