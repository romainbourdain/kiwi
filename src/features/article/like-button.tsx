"use client";

import { likeArticle } from "@/actions/articles.action";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useTransition } from "react";

export type LikeButtonProps = {
  slug: string;
  isLiked: boolean;
  likes: number;
};

export const LikeButton = ({ isLiked, slug, likes }: LikeButtonProps) => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      variant={isLiked ? "default" : "outline"}
      onClick={() =>
        startTransition(async () => {
          await likeArticle({ articleId: slug });
        })
      }
      disabled={isPending}
      loading={isPending}
    >
      {!isPending && (
        <Star className="size-4" fill={isLiked ? "currentColor" : "none"} />
      )}
      {likes}
    </Button>
  );
};
