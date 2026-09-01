// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Execute a connector.
 */
export class Runs extends APIResource {
  /**
   * <p>Retrieve a run by its ID.</p>
   */
  retrieve(runID: string, options?: RequestOptions): APIPromise<Run> {
    return this._client.get(path`/v1beta/runs/${runID}`, options);
  }

  /**
   * <p>List runs of a given connector.</p>
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
   * <p>Execute a connector. By default the call blocks until the run finishes. Pass <code>async: true</code> to return immediately, in which case you should poll <code>GET /runs</code> to retrieve the result once it's ready.</p>
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
   * Arguments in this run for the connector's input parameters.
   */
  arguments: { [key: string]: unknown };

  /**
   * ID of the connector executed in this run.
   */
  connector_id: string;

  /**
   * Timestamp when the object was created.
   */
  created_at: string;

  /**
   * Why the run failed. Present iff `status` is `connector_error`; for platform
   * failures the status itself is the reason.
   */
  error: RunError | null;

  /**
   * Timestamp when the object was last updated.
   */
  finished_at: string | null;

  /**
   * Whether the run has associated logs
   */
  has_logs: boolean;

  /**
   * Execution result of the run, matching the connector's output schema. Present iff
   * `status` is `success`. Limited to 100MB; results above 100MB are not stored and
   * the run ends with `result_too_large`.
   */
  result: { [key: string]: unknown } | null;

  /**
   * Lifecycle status of the run: `pending`, `running`, `success`, `connector_error`,
   * `timed_out`, `result_too_large`, or `internal_error`. `connector_error` means
   * the connector's code failed (see `error`); `timed_out` and `internal_error` are
   * platform outcomes worth retrying; `result_too_large` is not retryable as-is.
   */
  status:
    | 'pending'
    | 'running'
    | 'success'
    | 'connector_error'
    | 'timed_out'
    | 'result_too_large'
    | 'internal_error';

  /**
   * Secrets to use for this run. This dict must be a mapping of secret slot names to
   * secret IDs.
   */
  secret_bindings?: { [key: string]: string };
}

export interface RunError {
  /**
   * Structured context reported by the connector.
   */
  details: { [key: string]: unknown } | null;

  /**
   * Exception class name, when the failure came from a raised exception.
   */
  exception: string | null;

  /**
   * Human-readable description of the failure.
   */
  message: string;

  /**
   * Whether retrying the run with the same arguments is expected to succeed. Null
   * when unknown.
   */
  retryable: boolean | null;

  /**
   * Machine-readable failure type: `auth_required`, `invalid_input`,
   * `site_unavailable`, `anti_bot`, `site_changed`, `internal_error`, `crash`, or
   * `unhandled`.
   */
  type: string;
}

export interface RunLogsResponse {
  /**
   * Run execution logs.
   */
  logs: string;
}

export interface RunListParams extends CursorPageParams {
  /**
   * The ID of the connector to list runs for.
   */
  connector_id: string;
}

export interface RunRunParams {
  /**
   * ID of the connector to execute.
   */
  connector_id: string;

  /**
   * Arguments to pass to the connector. Optional if the connector does not require
   * any arguments.
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
   * Mapping of secret slot names to secret IDs. Each slot defined in the connector's
   * required_secrets must be mapped to a user-owned secret.
   */
  secret_bindings?: { [key: string]: string };
}

export declare namespace Runs {
  export {
    type Run as Run,
    type RunError as RunError,
    type RunLogsResponse as RunLogsResponse,
    type RunsCursorPage as RunsCursorPage,
    type RunListParams as RunListParams,
    type RunRunParams as RunRunParams,
  };
}
