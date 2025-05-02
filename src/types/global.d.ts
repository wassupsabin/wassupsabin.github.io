// Facebook SDK types
interface Window {
  fbAsyncInit: () => void;
  FB: {
    init: (params: {
      xfbml?: boolean;
      version?: string;
      cookie?: boolean;
      status?: boolean;
      autoLogAppEvents?: boolean;
      appId?: string;
    }) => void;
    XFBML: {
      parse: (element?: Element) => void;
    };
    AppEvents: {
      logPageView: () => void;
    };
    api: (path: string, method: string, params?: object, callback?: Function) => void;
  };
}

// Stripe types
interface StripeResponse {
  clientSecret: string;
}

// Newsletter subscription response
interface NewsletterResponse {
  success: boolean;
  message?: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

// File type augmentations
declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

// Environment variables
interface ImportMetaEnv {
  readonly PUBLIC_FACEBOOK_PAGE_ID: string;
  readonly PUBLIC_STRIPE_KEY: string;
  readonly PUBLIC_SITE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}