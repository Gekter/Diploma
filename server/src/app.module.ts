import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { BitrixModule } from './bitrix/bitrix.module';
import { KanbanModule } from './kanban/kanban.module';
import { SyncBitrixModule } from './sync_bitrix/sync_bitrix.module';

@Module({
  imports: [
    BitrixModule,
    KanbanModule,
    SyncBitrixModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'build'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
