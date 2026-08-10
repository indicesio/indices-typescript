// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Manage connectors.
 */
export class Connectors extends APIResource {
  /**
   * <p>Retrieve a connector by its ID.</p>
   */
  retrieve(connectorID: string, options?: RequestOptions): APIPromise<Connector> {
    return this._client.get(path`/v1beta/connectors/${connectorID}`, options);
  }

  /**
   * <p>List the connectors in your catalog.</p>
   */
  list(
    query: ConnectorListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<ConnectorsCursorPage, Connector> {
    return this._client.getAPIList('/v1beta/connectors', CursorPage<Connector>, { query, ...options });
  }

  /**
   * <p>Delete a connector by its ID. Its past runs are kept, but it can no longer be run.</p>
   */
  delete(connectorID: string, options?: RequestOptions): APIPromise<ConnectorDeleteResponse> {
    return this._client.delete(path`/v1beta/connectors/${connectorID}`, options);
  }

  /**
   * <p>List the full revision lineage of a connector, newest first.</p>
   */
  listRevisions(connectorID: string, options?: RequestOptions): APIPromise<ConnectorListRevisionsResponse> {
    return this._client.get(path`/v1beta/connectors/${connectorID}/revisions`, options);
  }
}

export type ConnectorsCursorPage = CursorPage<Connector>;

export interface Connector {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * Timestamp when the object was created.
   */
  created_at: string;

  /**
   * Short human-readable name of the connector.
   */
  display_name: string;

  /**
   * JSON Schema for the connector's run arguments.
   */
  input_schema: { [key: string]: unknown };

  /**
   * JSON Schema for the connector's run results.
   */
  output_schema: { [key: string]: unknown };

  /**
   * What the connector does, as specified at publish time.
   */
  purpose: string;

  /**
   * Connector this one revised (if any).
   */
  revised_from_connector_id: string | null;

  /**
   * Website the connector operates against.
   */
  website: string | null;

  /**
   * Secret slots that must be bound when running the connector.
   */
  required_secrets?: Array<SecretSlotDefinition>;
}

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

export interface ConnectorDeleteResponse {
  /**
   * Unique identifier for the deleted connector.
   */
  id: string;

  /**
   * Whether the connector was deleted.
   */
  deleted: boolean;
}

export interface ConnectorListRevisionsResponse {
  /**
   * The connector's full revision history, most recent first. The first entry is the
   * current revision.
   */
  data: Array<Connector>;
}

export interface ConnectorListParams extends CursorPageParams {}

export declare namespace Connectors {
  export {
    type Connector as Connector,
    type SecretSlotDefinition as SecretSlotDefinition,
    type ConnectorDeleteResponse as ConnectorDeleteResponse,
    type ConnectorListRevisionsResponse as ConnectorListRevisionsResponse,
    type ConnectorsCursorPage as ConnectorsCursorPage,
    type ConnectorListParams as ConnectorListParams,
  };
}
