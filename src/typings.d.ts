declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    port?: string;
    PG_USER: string;
    PG_PASSWORD: string;
    PG_DATABASE: string;
    PG_HOST: string;
    PG_PORT: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_KEY: string;
  }
}
