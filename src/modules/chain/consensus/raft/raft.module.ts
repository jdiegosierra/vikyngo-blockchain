// import { Module } from '@nestjs/common';
// import { RaftController } from './raft.controller';
// import { RaftService } from './raft.service';
//
// enum ServiceState {
//   OFF,
//   ON
// }
// enum RaftStatus {
//   FOLLOWER,
//   CANDIDATE,
//   LEADER
// }
//
// @Module({
//   controllers: [RaftController],
//   providers: [RaftService]
// })
// export class RaftModule {
//   private _raftStatus: RaftStatus;
//   private _votingTo: number;
//   private _leader: number;
//   private _stepDownCounter: number;
//   private _validatorId: number;
//   private _validatorPeerHashes: object;
//
//   constructor() {
//   }
//
//   private _resetRaftState(): void {
//     // Sets the initial status to the service.
//     this._raftStatus = RaftStatus.FOLLOWER;
//     this._votingTo = null;
//     this._leader = null;
//     this._stepDownCounter = 0;
//     this._validatorId = null;
//     this._validatorPeerHashes = {};
//     Math.add()
//   }
// }
