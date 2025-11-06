"use client";

import { ReactNode, useState } from "react";
import { Button } from "@mui/material";

interface Props {
  children: ReactNode;
  text: string;
  initialOpen?: boolean;
}

export function LoadMoreProductsWrapper(props: Props) {
  const [open, setOpen] = useState(props.initialOpen ?? false);

  if (open) {
    return props.children;
  }

  return (
    <div className={"flex justify-center"}>
      <Button
        className={"border border-[var(--foreground)]"}
        color={"primary"}
        variant={"outlined"}
        sx={{
          borderRadius: 0,
          padding: "8px 12px",
          marginBottom: "32px",
        }}
        onClick={() => setOpen(true)}
      >
        {props.text}
      </Button>
    </div>
  );
}
