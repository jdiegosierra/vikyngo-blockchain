import { Controller, Get, OnModuleInit, Param } from '@nestjs/common';
import {
  ClientGrpc, Client
} from '@nestjs/microservices';
import { Observable, ReplaySubject } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { HeroById } from '../rpc/interfaces/hero-by-id.interface';
import { Hero } from '../rpc/interfaces/hero.interface';
import { raftOptions } from "../../config/transportOptions";
import { heroOptions } from "../../config/transportOptions";
import { RaftRequest, RaftResponse } from '../rpc/rpc.controller';


interface HeroService {
  findOne(data: HeroById): Observable<Hero>;
  findMany(upstream: Observable<HeroById>): Observable<Hero>;
  leaderRequest(message: RaftRequest): Observable<RaftResponse>;
}
interface RaftService {
  leaderRequest(message: RaftRequest): Observable<RaftResponse>;
}

@Controller('hero')
export class RestController implements OnModuleInit {
  @Client(raftOptions)
  private client: ClientGrpc;
  @Client(heroOptions)
  private clientHero: ClientGrpc;
  private heroService: HeroService;
  private raftService: RaftService;

  onModuleInit() {
    this.heroService = this.clientHero.getService<HeroService>('HeroService');
    this.raftService = this.client.getService<RaftService>('RaftService');
  }

  @Get()
  getMany(): Observable<Hero[]> {
    const ids$ = new ReplaySubject<HeroById>();
    ids$.next({ id: 1 });
    ids$.next({ id: 2 });
    ids$.complete();

    const stream = this.heroService.findMany(ids$.asObservable());
    return stream.pipe(toArray());
  }

  @Get('raft')
  sendRequest(): object {

    this.heroService.leaderRequest({message: "HOLA MUNDO"}).subscribe(response => {
      console.log("El mensaje de vuelta esssss: ");
      console.log(response);
    });
    return {message: "Proceso correcto"};
  }

  @Get('raft2')
  sendRequest2(): object {

    this.raftService.leaderRequest({message: "HOLA PUTITA"}).subscribe(response => {
      console.log("El mensaje de vuelta esssss: ");
      console.log(response);
    });
    return {message: "PUTOOO"};
  }



  @Get(':id')
  getById(@Param('id') id: string): Observable<Hero> {
    return this.heroService.findOne({ id: +id });
  }
}
