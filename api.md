# Beta

## Connectors

Types:

- <code><a href="./src/resources/beta/connectors.ts">Connector</a></code>
- <code><a href="./src/resources/beta/connectors.ts">SecretSlotDefinition</a></code>
- <code><a href="./src/resources/beta/connectors.ts">ConnectorDeleteResponse</a></code>
- <code><a href="./src/resources/beta/connectors.ts">ConnectorListRevisionsResponse</a></code>

Methods:

- <code title="get /v1beta/connectors/{connector_id}">client.beta.connectors.<a href="./src/resources/beta/connectors.ts">retrieve</a>(connectorID) -> Connector</code>
- <code title="get /v1beta/connectors">client.beta.connectors.<a href="./src/resources/beta/connectors.ts">list</a>({ ...params }) -> ConnectorsCursorPage</code>
- <code title="delete /v1beta/connectors/{connector_id}">client.beta.connectors.<a href="./src/resources/beta/connectors.ts">delete</a>(connectorID) -> ConnectorDeleteResponse</code>
- <code title="get /v1beta/connectors/{connector_id}/revisions">client.beta.connectors.<a href="./src/resources/beta/connectors.ts">listRevisions</a>(connectorID) -> ConnectorListRevisionsResponse</code>

## Runs

Types:

- <code><a href="./src/resources/beta/runs.ts">Run</a></code>
- <code><a href="./src/resources/beta/runs.ts">RunError</a></code>
- <code><a href="./src/resources/beta/runs.ts">RunLogsResponse</a></code>

Methods:

- <code title="get /v1beta/runs/{run_id}">client.beta.runs.<a href="./src/resources/beta/runs.ts">retrieve</a>(runID) -> Run</code>
- <code title="get /v1beta/runs">client.beta.runs.<a href="./src/resources/beta/runs.ts">list</a>({ ...params }) -> RunsCursorPage</code>
- <code title="get /v1beta/runs/{run_id}/logs">client.beta.runs.<a href="./src/resources/beta/runs.ts">logs</a>(runID) -> RunLogsResponse</code>
- <code title="post /v1beta/runs">client.beta.runs.<a href="./src/resources/beta/runs.ts">run</a>({ ...params }) -> Run</code>

## Secrets

Types:

- <code><a href="./src/resources/beta/secrets.ts">Secret</a></code>
- <code><a href="./src/resources/beta/secrets.ts">SecretListResponse</a></code>
- <code><a href="./src/resources/beta/secrets.ts">SecretDeleteResponse</a></code>
- <code><a href="./src/resources/beta/secrets.ts">SecretGetTotpResponse</a></code>

Methods:

- <code title="post /v1beta/secrets">client.beta.secrets.<a href="./src/resources/beta/secrets.ts">create</a>({ ...params }) -> Secret</code>
- <code title="get /v1beta/secrets">client.beta.secrets.<a href="./src/resources/beta/secrets.ts">list</a>() -> SecretListResponse</code>
- <code title="delete /v1beta/secrets/{id}">client.beta.secrets.<a href="./src/resources/beta/secrets.ts">delete</a>(id) -> SecretDeleteResponse</code>
- <code title="post /v1beta/secrets/{id}/totp">client.beta.secrets.<a href="./src/resources/beta/secrets.ts">getTotp</a>(id) -> SecretGetTotpResponse</code>

## Files

Types:

- <code><a href="./src/resources/beta/files.ts">File</a></code>
- <code><a href="./src/resources/beta/files.ts">FileCreateResponse</a></code>
- <code><a href="./src/resources/beta/files.ts">FileDeleteResponse</a></code>
- <code><a href="./src/resources/beta/files.ts">FileFinalizeResponse</a></code>
- <code><a href="./src/resources/beta/files.ts">FileGetDownloadURLResponse</a></code>

Methods:

- <code title="post /v1beta/files">client.beta.files.<a href="./src/resources/beta/files.ts">create</a>({ ...params }) -> FileCreateResponse</code>
- <code title="get /v1beta/files/{file_id}">client.beta.files.<a href="./src/resources/beta/files.ts">retrieve</a>(fileID) -> File</code>
- <code title="get /v1beta/files">client.beta.files.<a href="./src/resources/beta/files.ts">list</a>({ ...params }) -> FilesCursorPage</code>
- <code title="delete /v1beta/files/{file_id}">client.beta.files.<a href="./src/resources/beta/files.ts">delete</a>(fileID) -> FileDeleteResponse</code>
- <code title="get /v1beta/files/{file_id}/download">client.beta.files.<a href="./src/resources/beta/files.ts">download</a>(fileID) -> void</code>
- <code title="post /v1beta/files/{file_id}/complete">client.beta.files.<a href="./src/resources/beta/files.ts">finalize</a>(fileID) -> FileFinalizeResponse</code>
- <code title="get /v1beta/files/{file_id}/download_url">client.beta.files.<a href="./src/resources/beta/files.ts">getDownloadURL</a>(fileID) -> FileGetDownloadURLResponse</code>

## CaptureSessions

Types:

- <code><a href="./src/resources/beta/capture-sessions.ts">CaptureSession</a></code>
- <code><a href="./src/resources/beta/capture-sessions.ts">CaptureSessionState</a></code>
- <code><a href="./src/resources/beta/capture-sessions.ts">SessionCookie</a></code>
- <code><a href="./src/resources/beta/capture-sessions.ts">CaptureSessionListResponse</a></code>

Methods:

- <code title="post /v1beta/capture_sessions">client.beta.captureSessions.<a href="./src/resources/beta/capture-sessions.ts">create</a>({ ...params }) -> CaptureSession</code>
- <code title="get /v1beta/capture_sessions/{id}">client.beta.captureSessions.<a href="./src/resources/beta/capture-sessions.ts">retrieve</a>(id) -> CaptureSession</code>
- <code title="get /v1beta/capture_sessions">client.beta.captureSessions.<a href="./src/resources/beta/capture-sessions.ts">list</a>() -> CaptureSessionListResponse</code>
- <code title="post /v1beta/capture_sessions/{id}/abandon">client.beta.captureSessions.<a href="./src/resources/beta/capture-sessions.ts">abandon</a>(id) -> CaptureSession</code>
- <code title="post /v1beta/capture_sessions/{id}/complete">client.beta.captureSessions.<a href="./src/resources/beta/capture-sessions.ts">complete</a>(id) -> CaptureSession</code>
