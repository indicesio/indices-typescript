// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
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
  list(query: RunListParams, options?: RequestOptions): PagePromise<RunsCursorPage, Run> {
    return this._client.getAPIList('/v1beta/runs', CursorPage<Run>, { query, ...options });
  }

  /**
   * <p>Retrieve the combined logs for a run.</p>
   */
  logs(runID: string, options?: RequestOptions): APIPromise<RunLogsResponse> {
    return this._client.get(path`/v1beta/runs/${runID}/logs`, options);
  }

  /**
   * <p>Execute a task that has already been created. By default the call blocks until the run finishes. Pass <code>async: true</code> to return immediately, in which case you should poll <code>GET /runs</code> to retrieve the result once it's ready.</p>
   */
  run(body: RunRunParams, options?: RequestOptions): APIPromise<Run> {
    return this._client.post('/v1beta/runs', { body, ...options });
  }
}

export type RunsCursorPage = CursorPage<Run>;

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
   * Execution result of the run. In JSON, matching the task's output schema. Limited
   * to 100MB; results above 100MB will be truncated and result in a
   * `result_too_large` status.
   */
  result_json: string | null;

  /**
   * Lifecycle status of the run: `pending`, `running`, `success`, `failed`,
   * `timed_out`, `result_too_large`, or `internal_error`.
   */
  status: 'pending' | 'running' | 'success' | 'failed' | 'timed_out' | 'result_too_large' | 'internal_error';

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

export interface RunLogsResponse {
  /**
   * Run execution logs.
   */
  logs: string;
}

export interface RunListParams extends CursorPageParams {
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

  /**
   * When true, return immediately with a pending run; poll retrieveRun for the
   * result.
   */
  async?: boolean;

  /**
   * Maximum execution time in seconds before the run is timed out.
   */
  max_timeout_s?: number;

  /**
   * Mapping of secret slot names to secret IDs. Each slot defined in the task's
   * required_secrets must be mapped to a user-owned secret.
   */
  secret_bindings?: { [key: string]: string };
}

export declare namespace Runs {
  export {
    type Run as Run,
    type RunLogsResponse as RunLogsResponse,
    type RunsCursorPage as RunsCursorPage,
    type RunListParams as RunListParams,
    type RunRunParams as RunRunParams,
  };
}
