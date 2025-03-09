declare module 'react-markdown' {
  import React from 'react';
  
  interface ReactMarkdownProps {
    children: string;
    remarkPlugins?: any[];
    rehypePlugins?: any[];
    className?: string;
    components?: {
      [nodeType: string]: React.ComponentType<{
        node: any;
        children?: React.ReactNode;
        className?: string;
        [key: string]: any;
      }>;
    };
  }
  
  export default function ReactMarkdown(props: ReactMarkdownProps): JSX.Element;
}

declare module 'remark-math' {
  const remarkMath: any;
  export default remarkMath;
}

declare module 'rehype-katex' {
  const rehypeKatex: any;
  export default rehypeKatex;
}