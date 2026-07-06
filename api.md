# Tasks

Types:

- <code><a href="./src/resources/tasks.ts">SecretSlotDefinition</a></code>
- <code><a href="./src/resources/tasks.ts">Task</a></code>
- <code><a href="./src/resources/tasks.ts">TaskCreation</a></code>
- <code><a href="./src/resources/tasks.ts">TaskFailureInfo</a></code>
- <code><a href="./src/resources/tasks.ts">TaskListResponse</a></code>
- <code><a href="./src/resources/tasks.ts">TaskDeleteResponse</a></code>
- <code><a href="./src/resources/tasks.ts">TaskStartManualSessionResponse</a></code>

Methods:

- <code title="post /v1beta/tasks">client.tasks.<a href="./src/resources/tasks.ts">create</a>({ ...params }) -> Task</code>
- <code title="get /v1beta/tasks/{id}">client.tasks.<a href="./src/resources/tasks.ts">retrieve</a>(id) -> Task</code>
- <code title="get /v1beta/tasks">client.tasks.<a href="./src/resources/tasks.ts">list</a>() -> TaskListResponse</code>
- <code title="delete /v1beta/tasks/{id}">client.tasks.<a href="./src/resources/tasks.ts">delete</a>(id) -> TaskDeleteResponse</code>
- <code title="post /v1beta/tasks/{id}/complete-manual-session">client.tasks.<a href="./src/resources/tasks.ts">completeManualSession</a>(id) -> Task</code>
- <code title="post /v1beta/tasks/{id}/start-manual-session">client.tasks.<a href="./src/resources/tasks.ts">startManualSession</a>(id, { ...params }) -> TaskStartManualSessionResponse</code>

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
- <code><a href="./src/resources/files.ts">FileDeleteResponse</a></code>
- <code><a href="./src/resources/files.ts">FileGetDownloadURLResponse</a></code>

Methods:

- <code title="get /v1beta/files/{file_id}">client.files.<a href="./src/resources/files.ts">retrieve</a>(fileID) -> File</code>
- <code title="get /v1beta/files">client.files.<a href="./src/resources/files.ts">list</a>({ ...params }) -> FilesCursorPage</code>
- <code title="delete /v1beta/files/{file_id}">client.files.<a href="./src/resources/files.ts">delete</a>(fileID) -> FileDeleteResponse</code>
- <code title="get /v1beta/files/{file_id}/download">client.files.<a href="./src/resources/files.ts">download</a>(fileID) -> void</code>
- <code title="get /v1beta/files/{file_id}/download_url">client.files.<a href="./src/resources/files.ts">getDownloadURL</a>(fileID) -> FileGetDownloadURLResponse</code>
