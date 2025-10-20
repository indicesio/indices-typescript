// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Runs extends APIResource {
  /**
   * <p>Retrieve a run by its ID.</p>
   */
  retrieve(runID: string, options?: RequestOptions): APIPromise<Run> {
    return this._client.get(path`/v1/runs/${runID}`, options);
  }

  /**
   * <p>List all runs for a given task.</p>
   */
  list(query: RunListParams, options?: RequestOptions): APIPromise<RunListResponse> {
    return this._client.get('/v1/runs', { query, ...options });
  }

  /**
   * <p>Execute a task that has already been created.</p>
   */
  run(body: RunRunParams, options?: RequestOptions): APIPromise<Run> {
    return this._client.post('/v1/runs', { body, ...options });
  }
}

export interface Run {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Arguments in this run for the task's input parameters.
   */
  arguments: { [key: string]: unknown };

  /**
   * Timestamp when the object was created.
   */
  created_at: string;

  /**
   * Timestamp when the object was last updated.
   */
  finished_at: string | null;

  /**
   * Execution result of the run. In JSON, matching the task's output schema.
   */
  result_json: string | null;

  /**
   * ID of the task executed in this run.
   */
  task_id: string;
}

export type RunListResponse = Array<Run>;

export interface RunListParams {
  /**
   * The ID of the task to list runs for.
   */
  task_id: string;
}

export interface RunRunParams {
  /**
   * ID of the task to execute.
   */
  task_id: string;

  /**
   * Arguments to pass to the task. Optional if the task does not require any
   * arguments.
   */
  arguments?: { [key: string]: unknown };
}

export declare namespace Runs {
  export {
    type Run as Run,
    type RunListResponse as RunListResponse,
    type RunListParams as RunListParams,
    type RunRunParams as RunRunParams,
  };
}
