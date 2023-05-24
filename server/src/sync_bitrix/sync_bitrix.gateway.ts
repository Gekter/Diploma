import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { BitrixService } from 'src/bitrix/bitrix.service';
import { GetTaskDto } from 'src/bitrix/dto/getTask.dto';

@WebSocketGateway(+process.env.PORT_SOCKET)
export class SyncBitrixGatewey {
  @WebSocketServer()
  server: Server;

  constructor(private bitrixService: BitrixService) {}

  @SubscribeMessage('join')
  handleJoin(
    @MessageBody() projectId: number,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(client.id, 'connected to', projectId);
    client.join('' + projectId);
  }

  public sendTask(task: GetTaskDto) {
    this.server.to('' + task.group.id).emit('TASK', task);
  }
}
