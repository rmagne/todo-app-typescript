declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      PORT: string;
      DB_URI: string;
      // add more environment variables and their types here
    }
  }
}
