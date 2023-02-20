declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PROTOCOL: string;
      CUSTOM_DOMEN: string;
      PORT: string;
      NEXT_PUBLIC_NET: string;

      API: string;
      ARTICLES: string;
      CAPTCHA: string;
      CHECK_CAPTCHA: string;
      CREATE_ACCOUNT: string;
      GET_ACCOUNT: string;
      GET_AMOUNT: string;
      GET_ARTICLES: string;
      GET_CITY: string;
      NEWS: string;
      SEND: string;

      NEXT_PUBLIC_SITE_GET_ARTICLES: string;
      NEXT_PUBLIC_SITE_ARTICLES: string;
      NEXT_PUBLIC_SITE_CAPTCHA: string;
      NEXT_PUBLIC_SITE_CHECK_CAPTCHA: string;
      NEXT_PUBLIC_SITE_CREATE_ACCOUNT: string;
      NEXT_PUBLIC_SITE_GET_ACCOUNT: string;
      NEXT_PUBLIC_SITE_GET_AMOUNT: string;
      NEXT_PUBLIC_SITE_GET_ARTICLES: string;
      NEXT_PUBLIC_SITE_GET_CITY: string;
      NEXT_PUBLIC_SITE_NEWS: string;
      NEXT_PUBLIC_SITE_SEND: string;
      
      NODE_ENV: "development" | "production";
    }
  }
}

export {};
