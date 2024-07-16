
import pino from 'pino';

export const Logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});