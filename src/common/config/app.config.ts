import { NotFoundException } from '@nestjs/common';

export const EnvConfiguration = () => ({
    environment: process.env.NODE_ENV || 'dev',
    mongoDb: process.env.MONGODB,
    port: process.env.PORT || 3002,
    defaultLimit: +process.env.DEFAULT_LIMIT || 7,
})