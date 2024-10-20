import type {
  MDXComponents,
  MDXRemoteOptions,
} from "next-mdx-remote-client/rsc";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote-client/rsc";
import { Suspense } from "react";
import rehypeAutoLinkHeadings from "rehype-autolink-headings";
import { rehypePrettyCode } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { Grid } from "../container/grid";
import { MdxAlert } from "./mdx-alert";

const components: MDXComponents = {
  blockquote: ({ children, title }) => (
    <MdxAlert title={title}>{children}</MdxAlert>
  ),
  Danger: (props) => <MdxAlert variant="destructive" {...props} />,
  Warning: (props) => <MdxAlert variant="warning" {...props} />,
  Tip: (props) => <MdxAlert variant="success" {...props} />,
  Info: (props) => <MdxAlert variant="info" {...props} />,
};

const options: MDXRemoteOptions = {
  mdxOptions: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          // theme: {
          //   light: "github-light",
          //   dark: "github-dark",
          // },
          keepBackground: true,
          // transformers: [
          //   transformerCopyButton({
          //     visibility: "hover",
          //     feedbackDuration: 3_000,
          //   }),
          // ],
        },
      ],
      [
        rehypeAutoLinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["subheading-anchor"],
            arialLabel: "Link to section",
          },
        },
      ],
    ],
  },
};

export const ArticleMdx = (props: MDXRemoteProps) => {
  return (
    <Grid className="w-full grid-cols-[auto_1fr]">
      <article className="w-full max-w-screen-md">
        <Suspense fallback={<div>Loading...</div>}>
          <MDXRemote
            components={{ ...components, ...props.components }}
            options={{ ...options, ...props.options }}
            onError={() => <div>Error</div>}
            {...props}
          />
        </Suspense>
      </article>
      <aside className=""></aside>
    </Grid>
  );
};
