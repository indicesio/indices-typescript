// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';

export class Tasks extends APIResource {}

export interface SecretSlotDefinition {
  /**
   * Name of the secret slot, used as the key in a run's secret_bindings.
   */
  name: string;

  /**
   * Type of secret required: 'login' or 'string'.
   */
  type: 'login' | 'string';

  /**
   * What the bound secret is used for, when the connector declares it.
   */
  description?: string | null;

  /**
   * Whether the connector can perform 2FA/TOTP when the bound login has it
   * configured. Logins without TOTP remain bindable. Only applicable for 'login'
   * type.
   */
  supports_totp?: boolean;
}

export declare namespace Tasks {
  export { type SecretSlotDefinition as SecretSlotDefinition };
}
