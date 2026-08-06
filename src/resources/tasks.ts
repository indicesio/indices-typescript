// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Create a task to repeatedly perform an action on an external website.
 */
export class Tasks extends APIResource {
  /**
   * <p>Create a new task to repeatedly perform an action on an external website.</p><p>Once created and ready, it can be repeatedly executed using the <code>run</code> endpoint.</p>
   *
   * @example
   * ```ts
   * const task = await client.tasks.create({
   *   creation_params: {},
   *   display_name: 'display_name',
   *   task: 'task',
   * });
   * ```
   */
  create(body: TaskCreateParams, options?: RequestOptions): APIPromise<Task> {
    return this._client.post('/v1beta/tasks', { body, ...options });
  }

  /**
   * <p>Retrieve a task by its ID.</p><p>For tasks that are still being generated, <code>input_schema</code> and <code>output_schema</code> may be <code>null</code>. They are guaranteed to be present once the task reaches the ready state.</p>
   *
   * @example
   * ```ts
   * const task = await client.tasks.retrieve('id');
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<Task> {
    return this._client.get(path`/v1beta/tasks/${id}`, options);
  }

  /**
   * <p>List all tasks that have been created.</p><p>For tasks that are still being generated, <code>input_schema</code> and <code>output_schema</code> may be <code>null</code>. They are guaranteed to be present once the task reaches the ready state.</p>
   *
   * @example
   * ```ts
   * const tasks = await client.tasks.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<TaskListResponse> {
    return this._client.get('/v1beta/tasks', options);
  }

  /**
   * <p>Delete a task by its ID.</p>
   *
   * @example
   * ```ts
   * const task = await client.tasks.delete('id');
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<TaskDeleteResponse> {
    return this._client.delete(path`/v1beta/tasks/${id}`, options);
  }

  /**
   * <p>Use a completed capture session as this task's recording and kick off API generation from it.</p><p>A capture session can be attached to several tasks: each task filters and consumes the recording independently.</p>
   *
   * @example
   * ```ts
   * const task = await client.tasks.attachCaptureSession('id', {
   *   capture_session_id: 'cap_0R3kPq8mWxYz1aBcDeFgHi',
   * });
   * ```
   */
  attachCaptureSession(
    id: string,
    body: TaskAttachCaptureSessionParams,
    options?: RequestOptions,
  ): APIPromise<Task> {
    return this._client.post(path`/v1beta/tasks/${id}/attach_capture_session`, { body, ...options });
  }
}

export interface SecretSlotDefinition {
  /**
   * Name of the secret slot. Use this name as the identifier when binding secrets to
   * a slot.
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

export interface Task {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * The connector executed when this task is run; pass it to the runs endpoints.
   * Null until the task is ready. Changes when a revision publishes a new connector.
   */
  connector_id: string | null;

  /**
   * Timestamp when the object was created.
   */
  created_at: string;

  /**
   * Parameters set during the creation of this task.
   */
  creation: TaskCreation;

  /**
   * Current state of the task, in particular whether it is ready to use.
   */
  current_state: 'not_ready' | 'waiting_for_manual_completion' | 'ready' | 'failed';

  /**
   * Short title shown in the dashboard. Informational only.
   */
  display_name: string;

  /**
   * Task input schema as a JSON Schema object. May be null while the task is not
   * ready (e.g. schema generation in progress). Guaranteed non-null when
   * current_state is ready.
   */
  input_schema: { [key: string]: unknown } | null;

  /**
   * Task output schema as a JSON Schema object. May be null while the task is not
   * ready (e.g. schema generation in progress). Guaranteed non-null when
   * current_state is ready.
   */
  output_schema: { [key: string]: unknown } | null;

  /**
   * Detailed explanation of the task to be performed.
   */
  task: string;

  /**
   * Timestamp when the object was last updated.
   */
  updated_at: string;

  /**
   * The primary URL the task targets. May be null while the task is not ready;
   * non-null once generation completes.
   */
  website: string | null;

  /**
   * Information about why a task failed, for user display.
   */
  failure_info?: TaskFailureInfo | null;

  /**
   * List of secrets that must be provided when running this task.
   */
  required_secrets?: Array<SecretSlotDefinition>;
}

/**
 * Creation-related task data.
 */
export interface TaskCreation {
  /**
   * Mapping of required secret slot names to secret IDs bound during task creation.
   */
  secret_bindings?: { [key: string]: string };

  /**
   * List of secrets provided during task creation.
   */
  secrets?: Array<TaskCreation.Secret>;
}

export namespace TaskCreation {
  /**
   * A secret provided during task creation
   */
  export interface Secret {
    /**
     * ID of the secret to bind.
     */
    secret_id: string;

    /**
     * Optional description of what this secret is used for (helps generate meaningful
     * slot names).
     */
    description?: string | null;
  }
}

/**
 * Information about why a task failed, for user display.
 */
export interface TaskFailureInfo {
  /**
   * Primary failure category
   */
  category: string;

  /**
   * Summary of the failure cause
   */
  message: string;
}

export type TaskListResponse = Array<Task>;

export interface TaskDeleteResponse {
  /**
   * ID of the deleted task.
   */
  id: string;

  /**
   * Always true when the task was deleted.
   */
  deleted: boolean;
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
   * Detailed explanation of the task to be performed.
   */
  task: string;
}

export namespace TaskCreateParams {
  /**
   * Information used during task creation.
   */
  export interface CreationParams {
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
       * ID of the secret to bind.
       */
      secret_id: string;

      /**
       * Optional description of what this secret is used for (helps generate meaningful
       * slot names).
       */
      description?: string | null;
    }
  }
}

export interface TaskAttachCaptureSessionParams {
  /**
   * ID of a completed capture session to use as this task's recording. Attaching
   * kicks off API generation from it.
   */
  capture_session_id: string;
}

export declare namespace Tasks {
  export {
    type SecretSlotDefinition as SecretSlotDefinition,
    type Task as Task,
    type TaskCreation as TaskCreation,
    type TaskFailureInfo as TaskFailureInfo,
    type TaskListResponse as TaskListResponse,
    type TaskDeleteResponse as TaskDeleteResponse,
    type TaskCreateParams as TaskCreateParams,
    type TaskAttachCaptureSessionParams as TaskAttachCaptureSessionParams,
  };
}
