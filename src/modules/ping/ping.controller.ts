import { Controller, Get, OnModuleInit, Post } from '@nestjs/common';
import { PingService } from './ping.service';
// import { RaftService } from '../chain/consensus/raft/raft.service';
import { Client, ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { grpcOptions } from '../../config/transportOptions';
import { HeroById } from '../../transport_layers/rpc/interfaces/hero-by-id.interface';
import { Observable, ReplaySubject } from 'rxjs';
import { Hero } from '../../transport_layers/rpc/interfaces/hero.interface';
import { toArray } from 'rxjs/operators';

// interface ConsensusLeaderMessage {
//   type: string,
//   body: string
// }

// interface HeroService {
//   findOne(data: HeroById): Observable<Hero>;
//   findMany(upstream: Observable<HeroById>): Observable<Hero>;
// }

interface RaftService {
  ConsensusLeaderRequest(message: string): object;
}

@Controller('ping')
export class PingController implements OnModuleInit{
  @Client(grpcOptions)
  private client: ClientGrpc;
  // private heroService: HeroService;
  private raftServiceRpc: RaftService;

  // constructor(
  //   // private readonly pingService: PingService,
  // ) {}

  onModuleInit() {
    // this.heroService = this.client.getService<HeroService>('HeroService');
    this.raftServiceRpc = this.client.getService<RaftService>('RaftService');
  }

  // @Get('test')
  // getMany(): Observable<Hero[]> {
  //   const ids$ = new ReplaySubject<HeroById>();
  //   ids$.next({ id: 1 });
  //   ids$.next({ id: 2 });
  //   ids$.complete();
  //
  //   const stream = this.heroService.findMany(ids$.asObservable());
  //   return stream.pipe(toArray());
  // }
  //
  // @Get()
  // async findAll(): Promise<string>  {
  //   return this.pingService.get();
  // }

  @GrpcMethod('RaftService')
  ConsensusLeaderRequest(message: string): object {
    console.log("mensaje recibido " + message);
    return Object.create(null);
  }

  @Get('raft')
  sendRaftLeaderRequest(): void {
    const message = "hello";
    this.raftServiceRpc.ConsensusLeaderRequest("puta");
    // console.log(this.raftServiceRpc.ConsensusLeaderRequest(message));
  }
}
