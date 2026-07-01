// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Execute a task.
 */
export class Runs extends APIResource {
  /**
   * <p>Retrieve a run by its ID.</p>
   */
  retrieve(runID: string, options?: RequestOptions): APIPromise<Run> {
    return this._client.get(path`/v1beta/runs/${runID}`, options);
  }

  /**
   * <p>List runs for a given task.</p>
   */
  list(query: RunListParams, options?: RequestOptions): APIPromise<RunListResponse> {
    return this._client.get('/v1beta/runs', { query, ...options });
  }

  /**
   * <p>Retrieve the combined logs for a run.</p>
   */
  logs(runID: string, options?: RequestOptions): APIPromise<RunLogsResponse> {
    return this._client.get(path`/v1beta/runs/${runID}/logs`, options);
  }

  /**
   * <p>Execute a task that has already been created.</p>
   */
  run(body: RunRunParams, options?: RequestOptions): APIPromise<Run> {
    return this._client.post('/v1beta/runs', { body, ...options });
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
   * Whether the run has associated logs
   */
  has_logs: boolean;

  /**
   * Execution result of the run. In JSON, matching the task's output schema.
   */
  result_json: string | null;

  /**
   * Whether the run was successful.
   */
  success: boolean;

  /**
   * ID of the task executed in this run.
   */
  task_id: string;

  /**
   * Secrets to use for this run. This dict must be a mapping of secret slot names to
   * secret IDs.
   */
  secret_bindings?: { [key: string]: string };
}

export interface RunListResponse {
  /**
   * Runs for the requested page, ordered newest first.
   */
  data: Array<Run>;

  /**
   * Whether more runs exist after this page.
   */
  has_more: boolean;

  /**
   * Pass as the `cursor` query parameter to fetch the next page. Null when has_more
   * is false.
   */
  next_cursor: string | null;
}

export interface RunLogsResponse {
  /**
   * Run execution logs.
   */
  logs: string;
}

export interface RunListParams {
  /**
   * The ID of the task to list runs for.
   */
  task_id: string;

  /**
   * Cursor from a previous response's `next_cursor`, to fetch the next page.
   */
  cursor?: string | null;

  /**
   * Maximum number of runs to return.
   */
  limit?: number;
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

  /**
   * Mapping of secret slot names to secret IDs. Each slot defined in the task's
   * required_secrets must be mapped to a user-owned secret.
   */
  secret_bindings?: { [key: string]: string };
}

export declare namespace Runs {
  export {
    type Run as Run,
    type RunListResponse as RunListResponse,
    type RunLogsResponse as RunLogsResponse,
    type RunListParams as RunListParams,
    type RunRunParams as RunRunParams,
  };
}
