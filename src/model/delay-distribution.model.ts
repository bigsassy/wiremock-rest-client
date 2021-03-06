/**
 * This file was automatically generated. DO NOT MODIFY IT BY HAND.
 */

export type DelayDistribution = LogNormal | Uniform;

/**
 * Log normal randomly distributed response delay.
 */
export interface LogNormal {
  median?: number;
  sigma?: number;
  type?: 'lognormal';
  [k: string]: any;
}
/**
 * Uniformly distributed random response delay.
 */
export interface Uniform {
  lower?: number;
  type?: 'uniform';
  upper?: number;
  [k: string]: any;
}
