"use client";

import * as React from "react";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { Check, ChevronDown } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function MenuRoot(props: React.ComponentProps<typeof MenuPrimitive.Root>) {
  return <MenuPrimitive.Root modal={false} {...props} />;
}

function MenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MenuPrimitive.Trigger>) {
  return (
    <MenuPrimitive.Trigger
      className={cn(
        buttonVariants({ size: "lg", variant: "outline" }),
        "justify-between gap-2 rounded-full border-border/70 px-4 data-[popup-open]:bg-secondary",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="size-4 text-muted-foreground transition-transform duration-150 ease-out data-[popup-open]:rotate-180" />
    </MenuPrimitive.Trigger>
  );
}

function MenuContent({
  className,
  sideOffset = 8,
  align = "center",
  ...props
}: Omit<React.ComponentProps<typeof MenuPrimitive.Positioner>, "className"> & {
  className?: string;
}) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        align={align}
        sideOffset={sideOffset}
        className="z-50"
        {...props}
      >
        <MenuPrimitive.Popup
          className={cn(
            "z-50 w-72 origin-[var(--transform-origin)] rounded-2xl border border-border/70 bg-popover p-1.5 text-popover-foreground outline-none ring-1 ring-foreground/6 transition-[opacity,transform] duration-150 ease-out data-[ending-style]:scale-[0.97] data-[ending-style]:opacity-0 data-[starting-style]:scale-[0.97] data-[starting-style]:opacity-0",
            className
          )}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

function MenuItem({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof MenuPrimitive.Item> & { inset?: boolean }) {
  return (
    <MenuPrimitive.Item
      className={cn(
        "flex cursor-default items-center gap-3 rounded-xl px-3 py-2 text-sm outline-none transition-colors duration-150 ease-out data-[highlighted]:bg-secondary data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-9",
        className
      )}
      {...props}
    >
      {children}
    </MenuPrimitive.Item>
  );
}

function MenuItemIndicator({
  className,
  ...props
}: React.ComponentProps<typeof MenuPrimitive.RadioItemIndicator>) {
  return (
    <MenuPrimitive.RadioItemIndicator
      className={cn("flex size-4 items-center justify-center text-primary", className)}
      {...props}
    >
      <Check className="size-3.5" />
    </MenuPrimitive.RadioItemIndicator>
  );
}

function MenuLabel({
  className,
  ...props
}: React.ComponentProps<typeof MenuPrimitive.GroupLabel>) {
  return (
    <MenuPrimitive.GroupLabel
      className={cn("px-3 py-2 text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}

function MenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof MenuPrimitive.Separator>) {
  return (
    <MenuPrimitive.Separator
      className={cn("my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

export {
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuItemIndicator,
  MenuLabel,
  MenuSeparator,
  MenuPrimitive,
};
