import type { ApiBodyOptions } from '@nestjs/swagger';

export const options: ApiBodyOptions = {
  schema: {
    default: {
      name: '',
    },
  },
};
