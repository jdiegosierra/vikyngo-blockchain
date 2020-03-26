import { config } from "dotenv"

interface IData {
  [key: string]: any;
}

// Some basic config
const defaultConfig: IData = {
  title: 'TypeScript Server'
};

// Environment config
const server: IData = {
  development: {
    HOST: '0.0.0.0',
    PORT: 3001,
    HTTPS: false
  },
  test: {
    HOST: '0.0.0.0',
    PORT: 3001,
    HTTPS: true
  },
  production: {
    HOST: '0.0.0.0',
    PORT: 3001,
    HTTPS: true
  }
};

export default {
  ...defaultConfig,
  ...{
    server: server[process.env.NODE_ENV || 'development']
  }
};
