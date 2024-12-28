export enum Role {
  UNASSIGNED = 0,
  MEDIATOR = 1,
  THESIS = 2,
  ANTITHESIS = 3,
  JUDGE = 4,
}

export type RoleCode = `${Role}` extends `${infer T extends number}`
  ? T
  : never;

export enum Vote {
  ABSTAIN = 0,
  THESIS = 1,
  ANTITHESIS = 2,
}

export type VoteCode = `${Vote}` extends `${infer T extends number}`
  ? T
  : never;

export default class Player {
  public isConnected: boolean = true;
  public points: number = 0;
  public role: Role = Role.UNASSIGNED;
  public vote: Vote = Vote.ABSTAIN;

  constructor(readonly id: string, readonly name: string) {}

  addPoints(points: number) {
    this.points += points;
  }

  resetPoints() {
    this.points = 0;
  }
}
