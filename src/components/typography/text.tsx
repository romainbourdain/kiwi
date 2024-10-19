import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { ElementType, HTMLAttributes, Ref } from "react";
import { forwardRef } from "react";

const textVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7",
      base: "text-base",
      muted: "text-sm font-medium leading-none text-muted-foreground",
      lead: "text-xl text-muted-foreground",
      sm: "text-sm font-medium leading-none",
      lg: "text-lg font-semibold",
      "inline-code":
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      blockquote: "mt-6 border-l-2 pl-6 italic",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

type textVariantComp = "p" | "h1" | "h2" | "h3" | "h4" | "blockquote";

const getTextCompFromVariant = (
  variant: NonNullable<VariantProps<typeof textVariants>["variant"]>
) => {
  if (["p", "h1", "h2", "h3", "h4", "blockquote"].includes(variant))
    return variant as textVariantComp;
  if (variant === "inline-code") return "code";
  return "span";
};

export type TextProps<T extends ElementType> = HTMLAttributes<HTMLElement> &
  VariantProps<typeof textVariants> & {
    asChild?: boolean;
    as?: T;
  };

export const Text = forwardRef(
  <T extends ElementType = "span">(
    { asChild = false, as, variant, className, ...props }: TextProps<T>,
    ref: Ref<HTMLElement>
  ) => {
    const Comp: ElementType = asChild
      ? Slot
      : as || getTextCompFromVariant(variant || "base");

    return (
      <Comp
        ref={ref}
        className={cn(textVariants({ variant }), className)}
        {...props}
      />
    );
  }
);

Text.displayName = "Text";
