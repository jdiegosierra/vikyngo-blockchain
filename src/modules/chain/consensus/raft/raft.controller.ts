import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { RaftService } from './raft.service';
import { raftOptions } from '../../../../config/transportOptions';
import { Observable } from 'rxjs';

export interface RaftRequest {
  message: string;
}

export interface RaftResponse {
  message: string;
}

interface IRaftService {
  leaderRequest(message: RaftRequest): Observable<RaftResponse>;
}

@Controller('raft')
export class RaftController implements OnModuleInit {
  @Client(raftOptions)
  private client: ClientGrpc;
  private raftClient: IRaftService;

  onModuleInit() {
    this.raftClient = this.client.getService<IRaftService>('RaftService');
  }
  @GrpcMethod('RaftService')
  leaderRequest(message: RaftRequest): RaftResponse {
    return {message: RaftService.parseRequest(message.message, 3).toString()};
  }

  @Get()
  sendRequest(): string {
    this.raftClient.leaderRequest({message: "I want to be the leader"}).subscribe(response => {
      console.log(response.message);
    });
    return "You are the leader";
  }
}
