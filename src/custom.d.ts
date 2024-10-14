declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}

// avif
declare module "*.avif" {
  const src: string;
  export default src;
}

// png
declare module "*.png" {
  const src: string;
  export default src;
}

// jpg
declare module "*.jpg" {
  const src: string;
  export default src;
}
