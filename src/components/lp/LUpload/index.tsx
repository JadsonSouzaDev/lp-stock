"use client";

import Image from "next/image";
import { ChangeEvent, forwardRef, useState } from "react";

import { InputProps } from "@/components/ui/input";

import UploadButton from "./UploadButton";

const LUpload = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, onChange, ...props }) => {
    const [loading, setLoading] = useState<boolean>(false);
    return (
      <div className={`flex items-end justify-center pb-12`}>
        {props.value && (
          <Image
            width={150}
            height={150}
            src={props.value?.toString()}
            alt={""}
          />
        )}
        <div className="absolute translate-y-12">
          <UploadButton
            loading={loading}
            onLoading={setLoading}
            urlUpload={props.value?.toString()}
            onUpload={(url) =>
              onChange &&
              onChange({
                name: props.name,
                target: { value: url },
              } as unknown as ChangeEvent<HTMLInputElement>)
            }
          />
        </div>
      </div>
    );
  }
);
LUpload.displayName = "Input";

export default LUpload;
