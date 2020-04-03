import { Controller } from '@nestjs/common';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable, Subject } from 'rxjs';

import { HeroById } from './interfaces/hero-by-id.interface';
import { Hero } from './interfaces/hero.interface';

export interface RaftRequest {
  message: string;
}

export interface RaftResponse {
  message: string;
}

@Controller('hero')
export class RpcController {
  private readonly items: Hero[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
  ];

  @GrpcMethod('HeroService')
  leaderRequest(message: RaftRequest): RaftResponse {
    console.log("Her recivido el mensaje ");
    console.log(message);
    return { message: "Esta es la respuesta" };
  }

  @GrpcMethod('HeroService')
  findOne(data: HeroById): Hero {
    return this.items.find(({ id }) => id === data.id);
  }

  @GrpcStreamMethod('HeroService')
  FindMany(data$: Observable<HeroById>): Observable<Hero> {
    const hero$ = new Subject<Hero>();

    const onNext = (heroById: HeroById) => {
      const item = this.items.find(({ id }) => id === heroById.id);
      hero$.next(item);
    };
    const onComplete = () => hero$.complete();
    data$.subscribe(onNext, null, onComplete);

    return hero$.asObservable();
  }
}

@Controller('raft')
export class RaftController {
  @GrpcMethod('RaftService')
  leaderRequest(message: RaftRequest): RaftResponse {
    console.log("TU MENSAJE PUTO ES ");
    console.log(message);
    return { message: "TU PUTA RESPUESTA" };
  }
}
