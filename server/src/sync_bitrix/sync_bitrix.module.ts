import { Module } from '@nestjs/common';
import { BitrixModule } from 'src/bitrix/bitrix.module';
import { SyncBitrixController } from './sync_bitrix.controller';
import { SyncBitrixGatewey } from './sync_bitrix.gateway';

// Модуль реализует синхронизацию данных с битриксом
@Module({
  controllers: [SyncBitrixController],
  providers: [SyncBitrixGatewey],
  imports: [BitrixModule],
})
export class SyncBitrixModule {}
