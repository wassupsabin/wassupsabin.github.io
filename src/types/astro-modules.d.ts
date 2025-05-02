// Module declarations for Astro-related packages
declare module 'astro:content' {
  interface CollectionEntry<T> {
    slug: string;
    data: T;
    body: string;
    render(): Promise<{ Content: any; headings: any[]; remarkPluginFrontmatter: any }>;
  }
}

declare module 'astro/config' {
  export function defineConfig(config: any): any;
}

declare module '@astrojs/tailwind' {
  export default function tailwind(options?: any): any;
}

declare module '@astrojs/sitemap' {
  export default function sitemap(options?: any): any;
}

declare module '@astrojs/prefetch' {
  export default function prefetch(options?: any): any;
}

// For astro:assets (used in your astro.config.mjs)
declare module 'astro/assets' {
  export function getImage(options: any): Promise<any>;
  
  export interface ImageMetadata {
    src: string;
    width: number;
    height: number;
    format: string;
  }

  export interface LocalImageProps {
    src: ImageMetadata;
    alt: string;
    width?: number;
    height?: number;
    format?: string;
    quality?: number;
  }

  export interface RemoteImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    format?: string;
    quality?: number;
  }

  export type ImageProps = LocalImageProps | RemoteImageProps;

  export function Image(props: ImageProps): any;
}

// Add this to support any imports in .astro files
declare module '*.astro' {
  const component: any;
  export default component;
}