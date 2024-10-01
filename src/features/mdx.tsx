// components/mdx-remote.js
import { Title } from "@/components/typography/title";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { HTMLAttributes } from "react";

const components = {
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Title {...props} variant="h1" />
  ),
};

export function MDX(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
