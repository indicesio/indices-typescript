// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Secrets extends APIResource {
  /**
   * <p>Create a new secret. Credentials are stored securely in 1Password.</p>
   */
  create(body: SecretCreateParams, options?: RequestOptions): APIPromise<Secret> {
    return this._client.post('/v1beta/secrets', { body, ...options });
  }

  /**
   * <p>List all your secrets. Returns metadata only, not the actual credentials.</p>
   */
  list(options?: RequestOptions): APIPromise<SecretListResponse> {
    return this._client.get('/v1beta/secrets', options);
  }

  /**
   * <p>Delete a secret. This removes it from both the database and 1Password.</p>
   */
  delete(uuid: string, options?: RequestOptions): APIPromise<SecretDeleteResponse> {
    return this._client.delete(path`/v1beta/secrets/${uuid}`, options);
  }

  /**
   * <p>Generate a current TOTP code for a login secret that has 2FA configured.</p>
   */
  getTotp(uuid: string, options?: RequestOptions): APIPromise<SecretGetTotpResponse> {
    return this._client.post(path`/v1beta/secrets/${uuid}/totp`, options);
  }
}

export interface Secret {
  /**
   * Timestamp when the secret was created.
   */
  created_at: string;

  /**
   * Whether the secret has a TOTP configured (only applicable for login type).
   */
  has_totp: boolean;

  /**
   * Human-readable name for the secret.
   */
  name: string;

  /**
   * Type of secret: 'login' or 'string'.
   */
  secret_type: 'login' | 'string';

  /**
   * Timestamp when the secret was last updated.
   */
  updated_at: string;

  /**
   * Unique identifier for the secret.
   */
  uuid: string;

  /**
   * Optional website URL.
   */
  website: string | null;
}

export type SecretListResponse = Array<Secret>;

export interface SecretDeleteResponse {
  /**
   * Whether the secret was successfully deleted.
   */
  deleted: boolean;

  /**
   * Unique identifier of the deleted secret.
   */
  uuid: string;
}

export interface SecretGetTotpResponse {
  /**
   * Current 6-digit TOTP code.
   */
  code: string;

  /**
   * Unique identifier of the secret.
   */
  uuid: string;
}

export interface SecretCreateParams {
  /**
   * Human-readable name for the secret.
   */
  name: string;

  /**
   * Type of secret: 'login' for credentials, 'string' for simple values.
   */
  secret_type: 'login' | 'string';

  /**
   * Login password. Required for 'login' type.
   */
  password?: string | null;

  /**
   * Optional TOTP secret (base32 encoded). Only for 'login' type.
   */
  totp_secret?: string | null;

  /**
   * Login username. Required for 'login' type.
   */
  username?: string | null;

  /**
   * Secret value. Required for 'string' type.
   */
  value?: string | null;

  /**
   * Optional website URL for context.
   */
  website?: string | null;
}

export declare namespace Secrets {
  export {
    type Secret as Secret,
    type SecretListResponse as SecretListResponse,
    type SecretDeleteResponse as SecretDeleteResponse,
    type SecretGetTotpResponse as SecretGetTotpResponse,
    type SecretCreateParams as SecretCreateParams,
  };
}
