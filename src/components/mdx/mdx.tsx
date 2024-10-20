import type {
  MDXComponents,
  MDXRemoteOptions,
} from "next-mdx-remote-client/rsc";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote-client/rsc";
import rehypeAutoLinkHeadings from "rehype-autolink-headings";
import { rehypePrettyCode } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
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

export const Mdx = async (props: MDXRemoteProps) => {
  return (
    <MDXRemote
      components={{ ...components, ...props.components }}
      options={{ ...options, ...props.options }}
      onError={() => <div>Error</div>}
      {...props}
    />
  );
};
