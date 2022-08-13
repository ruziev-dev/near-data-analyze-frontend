export type TBaseData = {
  network: string;
  epochs: IEpoch[];
  pools: IPoolname[];
};

export interface IEpoch {
  ID: string;
  TIMESTAMP: number;
  HEIGHT: number;
  START_BLOCK: number;
  LAST_BLOCK: number;
  VALIDATORS: number;
  PROPOSALS: number;
  SEAT_PRICE: number;
  AVERAGE_STAKE: number;
  MEDIAN_STAKE: number;
  MODE: number;
  GAS_PRICE: number;
  KICKED_OUT: number;
}

export interface IPoolname {
  POOLNAME: string;
}

export type TEpochValidators = {
  epoch: string;
  validators: IValidator[];
};

export interface IValidator {
  POOLNAME: string;
  EPOCH_ID: string;
  EXPECTED_BLOCKS: number;
  PRODUCED_BLOCKS: number;
  EXPECTED_CHUNKS: number;
  PRODUCED_CHUNKS: number;
  STAKE: number;
  KICKEDOUT: number;
}

export type TPoolHistory = {
  name: string;
  history: IHistory[];
};

export interface IHistory {
  TIMESTAMP: number;
  STAKE: number;
  EXPECTED_BLOCKS: number;
  PRODUCED_BLOCKS: number;
  EXPECTED_CHUNKS: number;
  PRODUCED_CHUNKS: number;
  KICKEDOUT: number;
  ID: string;
  HEIGHT: number;
}
