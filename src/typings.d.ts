declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    port?: string;
    PG_USER: string;
    PG_PASSWORD: string;
    PG_DATABASE: string;
    PG_HOST: string;
    PG_PORT: string;
  }
}
