import { Module } from '@nestjs/common';
import { RaftController } from './raft.controller';
import { RaftService } from './raft.service';
import { ITimerFactory, Timer, timerType } from './raft/timer';

enum ServiceState {
  OFF,
  ON
}
enum RaftStatus {
  FOLLOWER,
  CANDIDATE,
  LEADER
}

@Module({
  controllers: [RaftController],
  providers: [RaftService]
})
export class RaftModule {
  private _raftStatus: RaftStatus;
  private _votingTo: number;
  private _leader: number;
  private _stepDownCounter: number;
  private _validatorId: number;
  private _validatorPeerHashes: object;
  private _state: ServiceState;
  private _timerFactory: ITimerFactory;
  private _candidateTimer: Timer;
  private _electionFailedTimer: Timer;

  constructor(timerFactory: ITimerFactory) {
    this._raftStatus = RaftStatus.FOLLOWER;
    this._votingTo = null;
    this._leader = null;
    this._stepDownCounter = 0;
    this._validatorId = null;
    this._validatorPeerHashes = {};
    this._state = ServiceState.OFF;
  }

  private _resetRaftState(): void {
    // Sets the initial status to the service.
    this._raftStatus = RaftStatus.FOLLOWER;
    this._votingTo = null;
    this._leader = null;
    this._stepDownCounter = 0;
    this._validatorId = null;
    this._validatorPeerHashes = {};
  }

  private _setRaftStatus(status: RaftStatus): void {
    // """Sets this to a given status.
    //
    // Args:
    //   status: New raft status to be established.
    // """
    if (this._state !== ServiceState.ON)
      return;
    else {
      this._endStatus();
      this._raftStatus = status;
      this._startStatus();
    }
  }

  private _startFollowerStatus(): void {
    if (this._state !== ServiceState.ON)
      return;
    this._candidateTimer = this._timerFactory.create(timerType.RESETEABLE);
    this._candidateTimer.start();
  }

  private _startCandidateStatus(): void {
    if (this._state !== ServiceState.ON)
      return;
    this._votingTo = this._validatorId;
    this._electionFailedTimer = this._timerFactory.create(timerType.NORMAL);
    this._electionFailedTimer.daemon = true;
    this._electionFailedTimer.start();
    if (this._requestVote())
      this._setRaftStatus(RaftStatus.LEADER);
    else
      this._setRaftStatus(RaftStatus.FOLLOWER);
  }

  private _startStatus(): void {
    // Starts the timers according to the current status.
    switch (this._raftStatus) {
      case RaftStatus.FOLLOWER:
        this._startFollowerStatus();
        break;
      case RaftStatus.CANDIDATE:
        this._startCandidateStatus();
        break;
      case RaftStatus.LEADER:
        this._startLeaderStatus();
        break;
      default:
        break;
    }
  }

  private _endStatus(): void {
    // """Stops the timers according to the status."""
    if (this._state !== ServiceState.ON)
      return;
    else {
      switch (this._raftStatus) {
        case RaftStatus.FOLLOWER:
          this._timerHandler.cancel(this._candidateTimer);
          break;
        case RaftStatus.CANDIDATE:
          this._votingTo = null;
          this._timerHandler.cancel(this._electionFailedTimer);
          break;
        case RaftStatus.LEADER:
          this._timerHandler.cancel(this._heartbeatInterval);
          break;
        default:
          break;
      }
    }
  }

}