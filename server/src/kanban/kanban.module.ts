import { Module } from '@nestjs/common';
import { BitrixModule } from 'src/bitrix/bitrix.module';
import { KanbanController } from './kanban.controller';

// Модуль реализует рест-апи для клиентской части
@Module({
  imports: [BitrixModule],
  controllers: [KanbanController],
})
export class KanbanModule {}
