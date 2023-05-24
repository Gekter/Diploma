import { Body, Controller, Post } from '@nestjs/common';
import { BitrixService } from 'src/bitrix/bitrix.service';
import { Event } from './dto/Event.dto';
import { SyncBitrixGatewey } from './sync_bitrix.gateway';

@Controller('bitrix-sync')
export class SyncBitrixController {
  constructor(
    private bitrixService: BitrixService,
    private bitrixGateway: SyncBitrixGatewey,
  ) {}

  @Post('/')
  public async resolve(@Body() dto: Event) {
    console.log(dto);
    switch (dto.event) {
      case 'ONTASKCOMMENTADD':
      case 'ONTASKCOMMENTUPDATE':
        const updatedTask1 = await this.bitrixService.getTaskById(
          +dto.data.FIELDS_AFTER.TASK_ID!,
        );
        this.bitrixGateway.sendTask(updatedTask1);
        break;
      case 'ONTASKADD':
      case 'ONTASKUPDATE':
        const updatedTask2 = await this.bitrixService.getTaskById(
          +dto.data.FIELDS_AFTER.ID,
        );
        this.bitrixGateway.sendTask(updatedTask2);
        break;
    }
  }
}
