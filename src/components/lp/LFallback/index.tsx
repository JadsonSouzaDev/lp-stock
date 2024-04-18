import { FC } from "react";

import { Logo, LogoText } from "@/components/icons";

const LFallback: FC = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-r from-orange-300 to-orange-200 text-amber-800">
      <div className="flex flex-col items-center justify-center">
        <Logo className="h-32 w-32" />
        <LogoText className="h-24 w-44" />
      </div>
    </div>
  );
};

export default LFallback;
