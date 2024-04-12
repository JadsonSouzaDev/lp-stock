"use client";

import { ChangeEvent, FC } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type UploadButtonProps = {
  onUpload: (imgUrl: string) => void;
  urlUpload: string | undefined;
  onLoading: (loading: boolean) => void;
  loading: boolean;
};

const UploadButton: FC<UploadButtonProps> = ({
  onUpload,
  onLoading,
  loading,
  urlUpload,
}) => {
  const handleFormData = async (e: ChangeEvent<HTMLInputElement>) => {
    onLoading(true);
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    onUpload(data.secure_url);
    onLoading(false);
  };

  return (
    <div className="flex">
      <Button variant="outline" type="button">
        <label htmlFor="file" className="cursor-pointer">
          <span>
            {loading
              ? "Salvando..."
              : urlUpload
              ? "Atualizar imagem"
              : "Adicionar imagem"}
          </span>
          <Input
            type="file"
            name="file"
            id="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFormData(e)}
          />
        </label>
      </Button>
    </div>
  );
};

export default UploadButton;
