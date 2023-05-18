declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    port?: string;
    NODE_ENV: 'development' | 'production';
    LOCAL_PG_USER: string;
    LOCAL_PG_PASSWORD: string;
    PRD_PG_USER: string;
    PRD_PG_PASSWORD: string;
    PG_DATABASE: string;
    LOCAL_PG_HOST: string;
    PRD_PG_HOST: string;
    PG_PORT: string;
    SALT_ROUNDS: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_KEY: string;
    SECRET: string;
  }
}

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
