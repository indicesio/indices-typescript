// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Tasks extends APIResource {
  /**
   * <p>Create a new task to repeatedly perform an action on an external website.</p>
   *         <p>Once a task has been created and is ready for usage, it can be repeatedly executed using the `run` endpoint.</p>
   */
  create(body: TaskCreateParams, options?: RequestOptions): APIPromise<Task> {
    return this._client.post('/v1/tasks', { body, ...options });
  }

  /**
   * <p>Retrieve a task by its ID.</p>
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<Task> {
    return this._client.get(path`/v1/tasks/${id}`, options);
  }

  /**
   * <p>List all tasks that have been created.</p>
   */
  list(options?: RequestOptions): APIPromise<TaskListResponse> {
    return this._client.get('/v1/tasks', options);
  }

  /**
   * <p>Delete a task by its ID.</p>
   */
  delete(id: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.delete(path`/v1/tasks/${id}`, options);
  }

  /**
   * <p>Mark the manual browser session as complete and continue the task workflow.</p>
   */
  completeManualSession(id: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post(path`/v1/tasks/${id}/complete-manual-session`, options);
  }

  /**
   * <p>Spawn a browser session for manual task completion. If a session already exists, it will be closed and replaced.</p>
   */
  startManualSession(
    id: string,
    body: TaskStartManualSessionParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TaskStartManualSessionResponse> {
    return this._client.post(path`/v1/tasks/${id}/start-manual-session`, { body, ...options });
  }
}

export interface Task {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Timestamp when the object was created.
   */
  created_at: string;

  /**
   * Current state of the task, in particular whether it is ready to use.
   */
  current_state: 'not_ready' | 'waiting_for_manual_completion' | 'ready' | 'failed';

  /**
   * Short title shown in the dashboard. Informational only.
   */
  display_name: string;

  /**
   * Task input parameters in the form of a JSON schema.
   */
  input_schema: string;

  /**
   * If true, the server will run the browser task autonomously.
   */
  is_fully_autonomous: boolean;

  /**
   * Task output in the form of a JSON schema.
   */
  output_schema: string;

  /**
   * Detailed explanation of the task to be performed.
   */
  task: string;

  /**
   * Timestamp when the object was last updated.
   */
  updated_at: string;

  /**
   * The website to perform the task on.
   */
  website: string;

  /**
   * Information about why a task failed, for user display.
   */
  failure_info?: Task.FailureInfo | null;
}

export namespace Task {
  /**
   * Information about why a task failed, for user display.
   */
  export interface FailureInfo {
    /**
     * Primary failure category
     */
    category: string;

    /**
     * Summary of the failure cause
     */
    message: string;
  }
}

export type TaskListResponse = Array<Task>;

export type TaskDeleteResponse = unknown;

export type TaskCompleteManualSessionResponse = unknown;

export interface TaskStartManualSessionResponse {
  /**
   * URL to embed in an iframe to control the browser.
   */
  iframe_url: string;

  /**
   * Opaque identifier for the spawned browser session.
   */
  session_id: string;
}

export interface TaskCreateParams {
  /**
   * Short title shown in the dashboard. Informational only; not used to generate the
   * task.
   */
  display_name: string;

  /**
   * Task input parameters in the form of a JSON schema.
   */
  input_schema: string;

  /**
   * Task output in the form of a JSON schema.
   */
  output_schema: string;

  /**
   * Detailed explanation of the task to be performed.
   */
  task: string;

  /**
   * The website to perform the task on.
   */
  website: string;

  /**
   * If true, the server will run the browser task autonomously. If false, the user
   * must complete the task manually in a spawned browser.
   */
  is_fully_autonomous?: boolean;
}

export interface TaskStartManualSessionParams {
  /**
   * If true, spawn the browser session using a proxy.
   */
  use_proxy?: boolean;
}

export declare namespace Tasks {
  export {
    type Task as Task,
    type TaskListResponse as TaskListResponse,
    type TaskDeleteResponse as TaskDeleteResponse,
    type TaskCompleteManualSessionResponse as TaskCompleteManualSessionResponse,
    type TaskStartManualSessionResponse as TaskStartManualSessionResponse,
    type TaskCreateParams as TaskCreateParams,
    type TaskStartManualSessionParams as TaskStartManualSessionParams,
  };
}
