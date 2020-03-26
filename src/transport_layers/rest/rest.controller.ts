import { Controller, Get, OnModuleInit, Param } from '@nestjs/common';
import {
  ClientGrpc, Client
} from '@nestjs/microservices';
import { Observable, ReplaySubject } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { HeroById } from '../rpc/interfaces/hero-by-id.interface';
import { Hero } from '../rpc/interfaces/hero.interface';
import { grpcOptions } from "../../config/transportOptions";


interface HeroService {
  findOne(data: HeroById): Observable<Hero>;
  findMany(upstream: Observable<HeroById>): Observable<Hero>;
}




@Controller('hero')
export class RestController implements OnModuleInit {
  @Client(grpcOptions)
  private client: ClientGrpc;
  private heroService: HeroService;

  onModuleInit() {
    this.heroService = this.client.getService<HeroService>('HeroService');
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

  @Get(':id')
  getById(@Param('id') id: string): Observable<Hero> {
    return this.heroService.findOne({ id: +id });
  }
}
