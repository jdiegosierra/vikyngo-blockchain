import { Controller } from '@nestjs/common';
import {
  GrpcMethod,
  GrpcStreamMethod,
} from '@nestjs/microservices';
// import { Observable, Subject } from 'rxjs';
//
// import { HeroById } from './interfaces/hero-by-id.interface';
// import { Hero } from './interfaces/hero.interface';

// @Controller('hero')
// export class RpcController {
//   private readonly items: Hero[] = [
//     { id: 1, name: 'John' },
//     { id: 2, name: 'Doe' },
//   ];
//
//   @GrpcMethod('HeroService')
//   findOne(data: HeroById): Hero {
//     return this.items.find(({ id }) => id === data.id);
//   }
//
//   @GrpcStreamMethod('HeroService')
//   findMany(data$: Observable<HeroById>): Observable<Hero> {
//     console.log("ESTO ES RPC MI ARMA");
//     const hero$ = new Subject<Hero>();
//
//     const onNext = (heroById: HeroById) => {
//       const item = this.items.find(({ id }) => id === heroById.id);
//       hero$.next(item);
//     };
//     const onComplete = () => hero$.complete();
//     data$.subscribe(onNext, null, onComplete);
//
//     return hero$.asObservable();
//   }
//
//   @GrpcMethod('HeroService')
//   ConsensusLeaderRequest(message: string): void {
//     console.log("mensaje recibido " + message);
//   }
// }

@Controller('raft')
export class RpcController {

  @GrpcMethod('RaftService')
  ConsensusLeaderRequest(message: string): object {
    console.log("mensaje recibido " + message);
    return Object.create(null);
  }
}
