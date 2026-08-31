// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as CaptureSessionsAPI from './capture-sessions';
import {
  CaptureSession,
  CaptureSessionCreateParams,
  CaptureSessionListResponse,
  CaptureSessionState,
  CaptureSessions,
  SessionCookie,
} from './capture-sessions';
import * as ConnectorsAPI from './connectors';
import {
  Connector,
  ConnectorDeleteResponse,
  ConnectorListParams,
  ConnectorListRevisionsResponse,
  Connectors,
  ConnectorsCursorPage,
  SecretSlotDefinition,
} from './connectors';
import * as FilesAPI from './files';
import {
  File,
  FileCreateParams,
  FileCreateResponse,
  FileDeleteResponse,
  FileFinalizeResponse,
  FileGetDownloadURLResponse,
  FileListParams,
  Files,
  FilesCursorPage,
} from './files';
import * as RunsAPI from './runs';
import { Run, RunError, RunListParams, RunLogsResponse, RunRunParams, Runs, RunsCursorPage } from './runs';
import * as SecretsAPI from './secrets';
import {
  Secret,
  SecretCreateParams,
  SecretDeleteResponse,
  SecretGetTotpResponse,
  SecretListResponse,
  Secrets,
} from './secrets';

export class Beta extends APIResource {
  connectors: ConnectorsAPI.Connectors = new ConnectorsAPI.Connectors(this._client);
  runs: RunsAPI.Runs = new RunsAPI.Runs(this._client);
  secrets: SecretsAPI.Secrets = new SecretsAPI.Secrets(this._client);
  files: FilesAPI.Files = new FilesAPI.Files(this._client);
  captureSessions: CaptureSessionsAPI.CaptureSessions = new CaptureSessionsAPI.CaptureSessions(this._client);
}

Beta.Connectors = Connectors;
Beta.Runs = Runs;
Beta.Secrets = Secrets;
Beta.Files = Files;
Beta.CaptureSessions = CaptureSessions;

export declare namespace Beta {
  export {
    Connectors as Connectors,
    type Connector as Connector,
    type SecretSlotDefinition as SecretSlotDefinition,
    type ConnectorDeleteResponse as ConnectorDeleteResponse,
    type ConnectorListRevisionsResponse as ConnectorListRevisionsResponse,
    type ConnectorsCursorPage as ConnectorsCursorPage,
    type ConnectorListParams as ConnectorListParams,
  };

  export {
    Runs as Runs,
    type Run as Run,
    type RunError as RunError,
    type RunLogsResponse as RunLogsResponse,
    type RunsCursorPage as RunsCursorPage,
    type RunListParams as RunListParams,
    type RunRunParams as RunRunParams,
  };

  export {
    Secrets as Secrets,
    type Secret as Secret,
    type SecretListResponse as SecretListResponse,
    type SecretDeleteResponse as SecretDeleteResponse,
    type SecretGetTotpResponse as SecretGetTotpResponse,
    type SecretCreateParams as SecretCreateParams,
  };

  export {
    Files as Files,
    type File as File,
    type FileCreateResponse as FileCreateResponse,
    type FileDeleteResponse as FileDeleteResponse,
    type FileFinalizeResponse as FileFinalizeResponse,
    type FileGetDownloadURLResponse as FileGetDownloadURLResponse,
    type FilesCursorPage as FilesCursorPage,
    type FileCreateParams as FileCreateParams,
    type FileListParams as FileListParams,
  };

  export {
    CaptureSessions as CaptureSessions,
    type CaptureSession as CaptureSession,
    type CaptureSessionState as CaptureSessionState,
    type SessionCookie as SessionCookie,
    type CaptureSessionListResponse as CaptureSessionListResponse,
    type CaptureSessionCreateParams as CaptureSessionCreateParams,
  };
}
