import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { BitrixService } from './bitrix.service';

// Модуль реализует запросы к битриксу
@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://b24-dcm29b.bitrix24.ru/rest/1/v60kcd5zzq7r723g',
      timeout: 10000,
    }),
  ],
  providers: [BitrixService],
  exports: [BitrixService],
})
export class BitrixModule {}
