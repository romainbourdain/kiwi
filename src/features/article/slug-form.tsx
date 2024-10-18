"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  useZodForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { z } from "zod";

const slugSchema = z.object({
  slug: z.string().min(3, {
    message: "L'identifiant de l'article doit au moins faire 3 caractères",
  }),
});

export type SlugFormProps = {
  defaultValues: z.infer<typeof slugSchema>;
};

export const SlugForm = ({ defaultValues }: SlugFormProps) => {
  const form = useZodForm({
    defaultValues,
    schema: slugSchema,
  });

  const showButton = form.getValues().slug !== defaultValues.slug;

  const handleSubmit = async () => {};

  return (
    <Form
      form={form}
      onSubmit={handleSubmit}
      className="flex items-center gap-2"
    >
      <FormField
        name="slug"
        render={({ field }) => (
          <FormItem className="flex items-center gap-2 space-y-0">
            <FormLabel>Id</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <Button
        type="submit"
        variant="success"
        disabled={!showButton}
        className={cn("transition-opacity")}
      >
        <Check className="size-4" />
      </Button>
    </Form>
  );
};
