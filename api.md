# Tasks

Types:

- <code><a href="./src/resources/tasks.ts">SecretSlotDefinition</a></code>

# Connectors

Types:

- <code><a href="./src/resources/connectors.ts">Connector</a></code>
- <code><a href="./src/resources/connectors.ts">ConnectorDeleteResponse</a></code>
- <code><a href="./src/resources/connectors.ts">ConnectorListRevisionsResponse</a></code>

Methods:

- <code title="get /v1beta/connectors/{connector_id}">client.connectors.<a href="./src/resources/connectors.ts">retrieve</a>(connectorID) -> Connector</code>
- <code title="get /v1beta/connectors">client.connectors.<a href="./src/resources/connectors.ts">list</a>({ ...params }) -> ConnectorsCursorPage</code>
- <code title="delete /v1beta/connectors/{connector_id}">client.connectors.<a href="./src/resources/connectors.ts">delete</a>(connectorID) -> ConnectorDeleteResponse</code>
- <code title="get /v1beta/connectors/{connector_id}/revisions">client.connectors.<a href="./src/resources/connectors.ts">listRevisions</a>(connectorID) -> ConnectorListRevisionsResponse</code>

# Runs

Types:

- <code><a href="./src/resources/runs.ts">Run</a></code>
- <code><a href="./src/resources/runs.ts">RunLogsResponse</a></code>

Methods:

- <code title="get /v1beta/runs/{run_id}">client.runs.<a href="./src/resources/runs.ts">retrieve</a>(runID) -> Run</code>
- <code title="get /v1beta/runs">client.runs.<a href="./src/resources/runs.ts">list</a>({ ...params }) -> RunsCursorPage</code>
- <code title="get /v1beta/runs/{run_id}/logs">client.runs.<a href="./src/resources/runs.ts">logs</a>(runID) -> RunLogsResponse</code>
- <code title="post /v1beta/runs">client.runs.<a href="./src/resources/runs.ts">run</a>({ ...params }) -> Run</code>

# Secrets

Types:

- <code><a href="./src/resources/secrets.ts">Secret</a></code>
- <code><a href="./src/resources/secrets.ts">SecretListResponse</a></code>
- <code><a href="./src/resources/secrets.ts">SecretDeleteResponse</a></code>
- <code><a href="./src/resources/secrets.ts">SecretGetTotpResponse</a></code>

Methods:

- <code title="post /v1beta/secrets">client.secrets.<a href="./src/resources/secrets.ts">create</a>({ ...params }) -> Secret</code>
- <code title="get /v1beta/secrets">client.secrets.<a href="./src/resources/secrets.ts">list</a>() -> SecretListResponse</code>
- <code title="delete /v1beta/secrets/{id}">client.secrets.<a href="./src/resources/secrets.ts">delete</a>(id) -> SecretDeleteResponse</code>
- <code title="post /v1beta/secrets/{id}/totp">client.secrets.<a href="./src/resources/secrets.ts">getTotp</a>(id) -> SecretGetTotpResponse</code>

# Files

Types:

- <code><a href="./src/resources/files.ts">File</a></code>
- <code><a href="./src/resources/files.ts">FileCreateResponse</a></code>
- <code><a href="./src/resources/files.ts">FileDeleteResponse</a></code>
- <code><a href="./src/resources/files.ts">FileFinalizeResponse</a></code>
- <code><a href="./src/resources/files.ts">FileGetDownloadURLResponse</a></code>

Methods:

- <code title="post /v1beta/files">client.files.<a href="./src/resources/files.ts">create</a>({ ...params }) -> FileCreateResponse</code>
- <code title="get /v1beta/files/{file_id}">client.files.<a href="./src/resources/files.ts">retrieve</a>(fileID) -> File</code>
- <code title="get /v1beta/files">client.files.<a href="./src/resources/files.ts">list</a>({ ...params }) -> FilesCursorPage</code>
- <code title="delete /v1beta/files/{file_id}">client.files.<a href="./src/resources/files.ts">delete</a>(fileID) -> FileDeleteResponse</code>
- <code title="get /v1beta/files/{file_id}/download">client.files.<a href="./src/resources/files.ts">download</a>(fileID) -> void</code>
- <code title="post /v1beta/files/{file_id}/complete">client.files.<a href="./src/resources/files.ts">finalize</a>(fileID) -> FileFinalizeResponse</code>
- <code title="get /v1beta/files/{file_id}/download_url">client.files.<a href="./src/resources/files.ts">getDownloadURL</a>(fileID) -> FileGetDownloadURLResponse</code>

# CaptureSessions

Types:

- <code><a href="./src/resources/capture-sessions.ts">CaptureSession</a></code>
- <code><a href="./src/resources/capture-sessions.ts">CaptureSessionState</a></code>
- <code><a href="./src/resources/capture-sessions.ts">SessionCookie</a></code>
- <code><a href="./src/resources/capture-sessions.ts">CaptureSessionListResponse</a></code>

Methods:

- <code title="post /v1beta/capture_sessions">client.captureSessions.<a href="./src/resources/capture-sessions.ts">create</a>({ ...params }) -> CaptureSession</code>
- <code title="get /v1beta/capture_sessions/{id}">client.captureSessions.<a href="./src/resources/capture-sessions.ts">retrieve</a>(id) -> CaptureSession</code>
- <code title="get /v1beta/capture_sessions">client.captureSessions.<a href="./src/resources/capture-sessions.ts">list</a>() -> CaptureSessionListResponse</code>
- <code title="post /v1beta/capture_sessions/{id}/abandon">client.captureSessions.<a href="./src/resources/capture-sessions.ts">abandon</a>(id) -> CaptureSession</code>
- <code title="post /v1beta/capture_sessions/{id}/complete">client.captureSessions.<a href="./src/resources/capture-sessions.ts">complete</a>(id) -> CaptureSession</code>
