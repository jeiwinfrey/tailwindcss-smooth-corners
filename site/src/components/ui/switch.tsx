"use client";

import * as React from "react";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";

import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "inline-flex h-7 w-12 items-center rounded-full border border-border bg-secondary p-0.5 outline-none transition-colors duration-150 ease-out focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 data-[checked]:bg-primary/14 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className="size-5 rounded-full bg-background shadow-sm transition-transform duration-150 ease-out data-[checked]:translate-x-5" />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
