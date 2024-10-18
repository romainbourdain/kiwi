"use client";

import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/lib/db";
import { z } from "zod";
import { MDX } from "../mdx/mdx";

const createArticleSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  content: z.string(),
});

export type CreateArticleFormProps = {
  defaultValues: z.infer<typeof createArticleSchema>;
  id: number;
};

export const CreateArticleForm = ({
  defaultValues,
  id,
}: CreateArticleFormProps) => {
  const form = useZodForm({
    defaultValues,
    schema: createArticleSchema,
  });

  const handleSubmit = async (values: z.infer<typeof createArticleSchema>) => {
    db.article.update({
      where: { id },
      data: values,
    });
    // router.back();
  };

  return (
    <>
      <Form form={form} onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <FormField
              name="title"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormLabel>Titre</FormLabel>
                    <FormDescription>Le titre de l'article</FormDescription>
                  </div>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardHeader>
          {form.getFieldState("title").isDirty && (
            <CardFooter>
              <Button type="submit">Mettre à jour</Button>
            </CardFooter>
          )}
        </Card>
        <Card>
          <CardHeader>
            <FormField
              name="description"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormLabel>Description</FormLabel>
                    <FormDescription>
                      La description est affichée dans la card du poste
                    </FormDescription>
                  </div>
                  <FormControl>
                    <AutosizeTextarea maxHeight={200} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardHeader>
          {form.getFieldState("description").isDirty && (
            <CardFooter>
              <Button type="submit">Mettre à jour</Button>
            </CardFooter>
          )}
        </Card>
        <Card>
          <CardHeader>
            <FormField
              name="content"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormLabel>Contenu</FormLabel>
                    <FormDescription>Le contenu de l'article</FormDescription>
                  </div>
                  <Tabs defaultValue="">
                    <TabsList>
                      <TabsTrigger value="code">Modifier</TabsTrigger>
                      <TabsTrigger value="preview">Visualiser</TabsTrigger>
                    </TabsList>
                    <TabsContent value="code">
                      <FormControl>
                        <AutosizeTextarea maxHeight={600} {...field} />
                      </FormControl>
                      <FormMessage />
                    </TabsContent>
                    <TabsContent value="preview">
                      <MDX source={form.getValues().content} />
                    </TabsContent>
                  </Tabs>
                </FormItem>
              )}
            />
          </CardHeader>
          {form.getFieldState("content").isDirty && (
            <CardFooter>
              <Button type="submit">Mettre à jour</Button>
            </CardFooter>
          )}
        </Card>
        <Button>Enregistrer</Button>
      </Form>
    </>
  );
};
