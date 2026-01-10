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
    return this._client.post('/v1beta/tasks', { body, ...options });
  }

  /**
   * <p>Retrieve a task by its ID.</p>
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<Task> {
    return this._client.get(path`/v1beta/tasks/${id}`, options);
  }

  /**
   * <p>List all tasks that have been created.</p>
   */
  list(options?: RequestOptions): APIPromise<TaskListResponse> {
    return this._client.get('/v1beta/tasks', options);
  }

  /**
   * <p>Delete a task by its ID.</p>
   */
  delete(id: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.delete(path`/v1beta/tasks/${id}`, options);
  }

  /**
   * <p>Mark the manual browser session as complete and continue the task workflow.</p>
   */
  completeManualSession(id: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post(path`/v1beta/tasks/${id}/complete-manual-session`, options);
  }

  /**
   * <p>Spawn a browser session for manual task completion. If a session already exists, it will be closed and replaced.</p>
   */
  startManualSession(
    id: string,
    body: TaskStartManualSessionParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TaskStartManualSessionResponse> {
    return this._client.post(path`/v1beta/tasks/${id}/start-manual-session`, { body, ...options });
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
   * List of secrets provided during task creation.
   */
  creation_secrets?: Array<Task.CreationSecret>;

  /**
   * Information about why a task failed, for user display.
   */
  failure_info?: Task.FailureInfo | null;

  /**
   * List of secrets that must be provided when running this task.
   */
  required_secrets?: Array<Task.RequiredSecret>;

  /**
   * Mapping of required secret slot names to secret UUIDs bound during task
   * creation.
   */
  secret_bindings?: { [key: string]: string };
}

export namespace Task {
  /**
   * A secret provided during task creation
   */
  export interface CreationSecret {
    /**
     * UUID of the secret to bind.
     */
    secret_uuid: string;

    /**
     * Optional description of what this secret is used for (helps generate meaningful
     * slot names).
     */
    description?: string | null;
  }

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

  /**
   * Definition of a secret slot that a task requires.
   */
  export interface RequiredSecret {
    /**
     * Name of the secret slot (used as env var prefix, e.g., 'LOGIN' →
     * LOGIN_USERNAME).
     */
    name: string;

    /**
     * Type of secret required: 'login' or 'string'.
     */
    type: 'login' | 'string';

    /**
     * Whether this login slot requires 2FA/TOTP. Only applicable for 'login' type.
     */
    requires_totp?: boolean;
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
   * Information used during task creation.
   */
  creation_params: TaskCreateParams.CreationParams;

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
}

export namespace TaskCreateParams {
  /**
   * Information used during task creation.
   */
  export interface CreationParams {
    /**
     * Initial values for input schema fields, keyed by property name. Used during task
     * creation to demonstrate the task. Especially important for tasks requiring
     * authentication, as initial credentials must be provided.
     */
    initial_input_values?: { [key: string]: unknown };

    /**
     * If true, the server will run the browser task autonomously. If false, the user
     * must complete the task manually in a spawned browser.
     */
    is_fully_autonomous?: boolean;

    /**
     * List of secrets to use for this task.
     */
    secrets?: Array<CreationParams.Secret>;
  }

  export namespace CreationParams {
    /**
     * A secret provided during task creation
     */
    export interface Secret {
      /**
       * UUID of the secret to bind.
       */
      secret_uuid: string;

      /**
       * Optional description of what this secret is used for (helps generate meaningful
       * slot names).
       */
      description?: string | null;
    }
  }
}

export interface TaskStartManualSessionParams {
  /**
   * Initial cookies to set in the browser session.
   */
  cookies?: Array<TaskStartManualSessionParams.Cookie>;

  /**
   * If true, spawn the browser session using a proxy.
   */
  use_proxy?: boolean;
}

export namespace TaskStartManualSessionParams {
  /**
   * A cookie to set in the browser session.
   */
  export interface Cookie {
    /**
     * The name of the cookie.
     */
    name: string;

    /**
     * The value of the cookie.
     */
    value: string;

    /**
     * The domain of the cookie.
     */
    domain?: string | null;

    /**
     * Whether the cookie is HTTP only.
     */
    http_only?: boolean | null;

    /**
     * The path of the cookie.
     */
    path?: string | null;

    /**
     * Whether the cookie is secure.
     */
    secure?: boolean | null;
  }
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
