// components/mdx-remote.js
import rehypeShiki from "@shikijs/rehype";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote-client/rsc";
import type { PluggableList } from "unified";
import { MdxError, MdxInfo, MdxSuccess, MdxWarning } from "./mdx-alert";

const components = {
  Info: MdxInfo,
  Warning: MdxWarning,
  Error: MdxError,
  Success: MdxSuccess,
};

const rehypePlugins = [
  [rehypeShiki, { theme: "github-dark" }],
] satisfies PluggableList;

export function MDX(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...props.components }}
      options={{
        mdxOptions: {
          rehypePlugins,
          ...props.options?.mdxOptions,
        },
        ...props.options,
      }}
    />
  );
}
