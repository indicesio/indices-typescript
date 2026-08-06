// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
  perLanguage?: Record<string, PerLanguageData>;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'list',
    endpoint: '/v1beta/tasks',
    httpMethod: 'get',
    summary: 'List all tasks',
    description:
      '<p>List all tasks that have been created.</p><p>For tasks that are still being generated, <code>input_schema</code> and <code>output_schema</code> may be <code>null</code>. They are guaranteed to be present once the task reaches the ready state.</p>',
    stainlessPath: '(resource) tasks > (method) list',
    qualified: 'client.tasks.list',
    response:
      "{ id: string; connector_id: string; created_at: string; creation: object; current_state: 'not_ready' | 'waiting_for_manual_completion' | 'ready' | 'failed'; display_name: string; input_schema: object; output_schema: object; task: string; updated_at: string; website: string; failure_info?: object; required_secrets?: object[]; }[]",
    markdown:
      "## list\n\n`client.tasks.list(): object[]`\n\n**get** `/v1beta/tasks`\n\n<p>List all tasks that have been created.</p><p>For tasks that are still being generated, <code>input_schema</code> and <code>output_schema</code> may be <code>null</code>. They are guaranteed to be present once the task reaches the ready state.</p>\n\n### Returns\n\n- `{ id: string; connector_id: string; created_at: string; creation: object; current_state: 'not_ready' | 'waiting_for_manual_completion' | 'ready' | 'failed'; display_name: string; input_schema: object; output_schema: object; task: string; updated_at: string; website: string; failure_info?: object; required_secrets?: object[]; }[]`\n\n### Example\n\n```typescript\nimport Indices from 'indicesio';\n\nconst client = new Indices();\n\nconst tasks = await client.tasks.list();\n\nconsole.log(tasks);\n```",
    perLanguage: {
      typescript: {
        method: 'client.tasks.list',
        example:
          "import Indices from 'indicesio';\n\nconst client = new Indices({\n  apiKey: process.env['INDICES_API_KEY'], // This is the default and can be omitted\n});\n\nconst tasks = await client.tasks.list();\n\nconsole.log(tasks);",
      },
      python: {
        method: 'tasks.list',
        example:
          'import os\nfrom indices import Indices\n\nclient = Indices(\n    api_key=os.environ.get("INDICES_API_KEY"),  # This is the default and can be omitted\n)\ntasks = client.tasks.list()\nprint(tasks)',
      },
      http: {
        example:
          'curl https://api.indices.io/v1beta/tasks \\\n    -H "Authorization: Bearer $INDICES_API_KEY"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1beta/tasks',
    httpMethod: 'post',
    summary: 'Create a task',
    description:
      '<p>Create a new task to repeatedly perform an action on an external website.</p><p>Once created and ready, it can be repeatedly executed using the <code>run</code> endpoint.</p>',
    stainlessPath: '(resource) tasks > (method) create',
    qualified: 'client.tasks.create',
    params: [
      'creation_params: { secrets?: { secret_id: string; description?: string; }[]; };',
      'display_name: string;',
      'task: string;',
    ],
    response:
      "{ id: string; connector_id: string; created_at: string; creation: { secret_bindings?: object; secrets?: object[]; }; current_state: 'not_ready' | 'waiting_for_manual_completion' | 'ready' | 'failed'; display_name: string; input_schema: object; output_schema: object; task: string; updated_at: string; website: string; failure_info?: { category: string; message: string; }; required_secrets?: { name: string; type: 'login' | 'string'; supports_totp?: boolean; }[]; }",
    markdown:
      "## create\n\n`client.tasks.create(creation_params: { secrets?: { secret_id: string; description?: string; }[]; }, display_name: string, task: string): { id: string; connector_id: string; created_at: string; creation: task_creation; current_state: 'not_ready' | 'waiting_for_manual_completion' | 'ready' | 'failed'; display_name: string; input_schema: object; output_schema: object; task: string; updated_at: string; website: string; failure_info?: task_failure_info; required_secrets?: secret_slot_definition[]; }`\n\n**post** `/v1beta/tasks`\n\n<p>Create a new task to repeatedly perform an action on an external website.</p><p>Once created and ready, it can be repeatedly executed using the <code>run</code> endpoint.</p>\n\n### Parameters\n\n- `creation_params: { secrets?: { secret_id: string; description?: string; }[]; }`\n  Information used during task creation.\n  - `secrets?: { secret_id: string; description?: string; }[]`\n    List of secrets to use for this task. \n\n- `display_name: string`\n  Short title shown in the dashboard. Informational only; not used to generate the task.\n\n- `task: string`\n  Detailed explanation of the task to be performed.\n\n### Returns\n\n- `{ id: string; connector_id: string; created_at: string; creation: { secret_bindings?: object; secrets?: object[]; }; current_state: 'not_ready' | 'waiting_for_manual_completion' | 'ready' | 'failed'; display_name: string; input_schema: object; output_schema: object; task: string; updated_at: string; website: string; failure_info?: { category: string; message: string; }; required_secrets?: { name: string; type: 'login' | 'string'; supports_totp?: boolean; }[]; }`\n\n  - `id: string`\n  - `connector_id: string`\n  - `created_at: string`\n  - `creation: { secret_bindings?: object; secrets?: { secret_id: string; description?: string; }[]; }`\n  - `current_state: 'not_ready' | 'waiting_for_manual_completion' | 'ready' | 'failed'`\n  - `display_name: string`\n  - `input_schema: object`\n  - `output_schema: object`\n  - `task: string`\n  - `updated_at: string`\n  - `website: string`\n  - `failure_info?: { category: string; message: string; }`\n  - `required_secrets?: { name: string; type: 'login' | 'string'; supports_totp?: boolean; }[]`\n\n### Example\n\n```typescript\nimport Indices from 'indicesio';\n\nconst client = new Indices();\n\nconst task = await client.tasks.create({\n  creation_params: {},\n  display_name: 'display_name',\n  task: 'task',\n});\n\nconsole.log(task);\n```",
    perLanguage: {
      typescript: {
        method: 'client.tasks.create',
        example:
          "import Indices from 'indicesio';\n\nconst client = new Indices({\n  apiKey: process.env['INDICES_API_KEY'], // This is the default and can be omitted\n});\n\nconst task = await client.tasks.create({\n  creation_params: {},\n  display_name: 'display_name',\n  task: 'task',\n});\n\nconsole.log(task.id);",
      },
      python: {
        method: 'tasks.create',
        example:
          'import os\nfrom indices import Indices\n\nclient = Indices(\n    api_key=os.environ.get("INDICES_API_KEY"),  # This is the default and can be omitted\n)\ntask = client.tasks.create(\n    creation_params={},\n    display_name="display_name",\n    task="task",\n)\nprint(task.id)',
      },
      http: {
        example:
          'curl https://api.indices.io/v1beta/tasks \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $INDICES_API_KEY" \\\n    -d \'{\n          "creation_params": {},\n          "display_name": "display_name",\n          "task": "task"\n        }\'',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1beta/tasks/{id}',
    httpMethod: 'get',
    summary: 'Retrieve a task',
    description:
      '<p>Retrieve a task by its ID.</p><p>For tasks that are still being generated, <code>input_schema</code> and <code>output_schema</code> may be <code>null</code>. They are guaranteed to be present once the task reaches the ready state.</p>',
    stainlessPath: '(resource) tasks > (method) retrieve',
    qualified: 'client.tasks.retrieve',
    params: ['id: string;'],
    response:
      "{ id: string; connector_id: string; created_at: string; creation: { secret_bindings?: object; secrets?: object[]; }; current_state: 'not_ready' | 'waiting_for_manual_completion' | 'ready' | 'failed'; display_name: string; input_schema: object; output_schema: object; task: string; updated_at: string; website: string; failure_info?: { category: string; message: string; }; required_secrets?: { name: string; type: 'login' | 'string'; supports_totp?: boolean; }[]; }",
    markdown:
      "## retrieve\n\n`client.tasks.retrieve(id: string): { id: string; connector_id: string; created_at: string; creation: task_creation; current_state: 'not_ready' | 'waiting_for_manual_completion' | 'ready' | 'failed'; display_name: string; input_schema: object; output_schema: object; task: string; updated_at: string; website: string; failure_info?: task_failure_info; required_secrets?: secret_slot_definition[]; }`\n\n**get** `/v1beta/tasks/{id}`\n\n<p>Retrieve a task by its ID.</p><p>For tasks that are still being generated, <code>input_schema</code> and <code>output_schema</code> may be <code>null</code>. They are guaranteed to be present once the task reaches the ready state.</p>\n\n### Parameters\n\n- `id: string`\n  The ID of the task to retrieve.\n\n### Returns\n\n- `{ id: string; connector_id: string; created_at: string; creation: { secret_bindings?: object; secrets?: object[]; }; current_state: 'not_ready' | 'waiting_for_manual_completion' | 'ready' | 'failed'; display_name: string; input_schema: object; output_schema: object; task: string; updated_at: string; website: string; failure_info?: { category: string; message: string; }; required_secrets?: { name: string; type: 'login' | 'string'; supports_totp?: boolean; }[]; }`\n\n  - `id: string`\n  - `connector_id: string`\n  - `created_at: string`\n  - `creation: { secret_bindings?: object; secrets?: { secret_id: string; description?: string; }[]; }`\n  - `current_state: 'not_ready' | 'waiting_for_manual_completion' | 'ready' | 'failed'`\n  - `display_name: string`\n  - `input_schema: object`\n  - `output_schema: object`\n  - `task: string`\n  - `updated_at: string`\n  - `website: string`\n  - `failure_info?: { category: string; message: string; }`\n  - `required_secrets?: { name: string; type: 'login' | 'string'; supports_totp?: boolean; }[]`\n\n### Example\n\n```typescript\nimport Indices from 'indicesio';\n\nconst client = new Indices();\n\nconst task = await client.tasks.retrieve('id');\n\nconsole.log(task);\n```",
    perLanguage: {
      typescript: {
        method: 'client.tasks.retrieve',
        example:
          "import Indices from 'indicesio';\n\nconst client = new Indices({\n  apiKey: process.env['INDICES_API_KEY'], // This is the default and can be omitted\n});\n\nconst task = await client.tasks.retrieve('id');\n\nconsole.log(task.id);",
      },
      python: {
        method: 'tasks.retrieve',
        example:
          'import os\nfrom indices import Indices\n\nclient = Indices(\n    api_key=os.environ.get("INDICES_API_KEY"),  # This is the default and can be omitted\n)\ntask = client.tasks.retrieve(\n    "id",\n)\nprint(task.id)',
      },
      http: {
        example:
          'curl https://api.indices.io/v1beta/tasks/$ID \\\n    -H "Authorization: Bearer $INDICES_API_KEY"',
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1beta/tasks/{id}',
    httpMethod: 'delete',
    summary: 'Delete a task',
    description: '<p>Delete a task by its ID.</p>',
    stainlessPath: '(resource) tasks > (method) delete',
    qualified: 'client.tasks.delete',
    params: ['id: string;'],
    response: '{ id: string; deleted: boolean; }',
    markdown:
      "## delete\n\n`client.tasks.delete(id: string): { id: string; deleted: boolean; }`\n\n**delete** `/v1beta/tasks/{id}`\n\n<p>Delete a task by its ID.</p>\n\n### Parameters\n\n- `id: string`\n  The ID of the task to delete.\n\n### Returns\n\n- `{ id: string; deleted: boolean; }`\n\n  - `id: string`\n  - `deleted: boolean`\n\n### Example\n\n```typescript\nimport Indices from 'indicesio';\n\nconst client = new Indices();\n\nconst task = await client.tasks.delete('id');\n\nconsole.log(task);\n```",
    perLanguage: {
      typescript: {
        method: 'client.tasks.delete',
        example:
          "import Indices from 'indicesio';\n\nconst client = new Indices({\n  apiKey: process.env['INDICES_API_KEY'], // This is the default and can be omitted\n});\n\nconst task = await client.tasks.delete('id');\n\nconsole.log(task.id);",
      },
      python: {
        method: 'tasks.delete',
        example:
          'import os\nfrom indices import Indices\n\nclient = Indices(\n    api_key=os.environ.get("INDICES_API_KEY"),  # This is the default and can be omitted\n)\ntask = client.tasks.delete(\n    "id",\n)\nprint(task.id)',
      },
      http: {
        example:
          'curl https://api.indices.io/v1beta/tasks/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $INDICES_API_KEY"',
      },
    },
  },
  {
    name: 'attach_capture_session',
    endpoint: '/v1beta/tasks/{id}/attach_capture_session',
    httpMethod: 'post',
    summary: 'Attach a capture session',
    description:
      "<p>Use a completed capture session as this task's recording and kick off API generation from it.</p><p>A capture session can be attached to several tasks: each task filters and consumes the recording independently.</p>",
    stainlessPath: '(resource) tasks > (method) attach_capture_session',
    qualified: 'client.tasks.attachCaptureSession',
    params: ['id: string;', 'capture_session_id: string;'],
    response:
      "{ id: string; connector_id: string; created_at: string; creation: { secret_bindings?: object; secrets?: object[]; }; current_state: 'not_ready' | 'waiting_for_manual_completion' | 'ready' | 'failed'; display_name: string; input_schema: object; output_schema: object; task: string; updated_at: string; website: string; failure_info?: { category: string; message: string; }; required_secrets?: { name: string; type: 'login' | 'string'; supports_totp?: boolean; }[]; }",
    markdown:
      "## attach_capture_session\n\n`client.tasks.attachCaptureSession(id: string, capture_session_id: string): { id: string; connector_id: string; created_at: string; creation: task_creation; current_state: 'not_ready' | 'waiting_for_manual_completion' | 'ready' | 'failed'; display_name: string; input_schema: object; output_schema: object; task: string; updated_at: string; website: string; failure_info?: task_failure_info; required_secrets?: secret_slot_definition[]; }`\n\n**post** `/v1beta/tasks/{id}/attach_capture_session`\n\n<p>Use a completed capture session as this task's recording and kick off API generation from it.</p><p>A capture session can be attached to several tasks: each task filters and consumes the recording independently.</p>\n\n### Parameters\n\n- `id: string`\n  The ID of the task to attach the capture session to.\n\n- `capture_session_id: string`\n  ID of a completed capture session to use as this task's recording. Attaching kicks off API generation from it.\n\n### Returns\n\n- `{ id: string; connector_id: string; created_at: string; creation: { secret_bindings?: object; secrets?: object[]; }; current_state: 'not_ready' | 'waiting_for_manual_completion' | 'ready' | 'failed'; display_name: string; input_schema: object; output_schema: object; task: string; updated_at: string; website: string; failure_info?: { category: string; message: string; }; required_secrets?: { name: string; type: 'login' | 'string'; supports_totp?: boolean; }[]; }`\n\n  - `id: string`\n  - `connector_id: string`\n  - `created_at: string`\n  - `creation: { secret_bindings?: object; secrets?: { secret_id: string; description?: string; }[]; }`\n  - `current_state: 'not_ready' | 'waiting_for_manual_completion' | 'ready' | 'failed'`\n  - `display_name: string`\n  - `input_schema: object`\n  - `output_schema: object`\n  - `task: string`\n  - `updated_at: string`\n  - `website: string`\n  - `failure_info?: { category: string; message: string; }`\n  - `required_secrets?: { name: string; type: 'login' | 'string'; supports_totp?: boolean; }[]`\n\n### Example\n\n```typescript\nimport Indices from 'indicesio';\n\nconst client = new Indices();\n\nconst task = await client.tasks.attachCaptureSession('id', { capture_session_id: 'cap_0R3kPq8mWxYz1aBcDeFgHi' });\n\nconsole.log(task);\n```",
    perLanguage: {
      typescript: {
        method: 'client.tasks.attachCaptureSession',
        example:
          "import Indices from 'indicesio';\n\nconst client = new Indices({\n  apiKey: process.env['INDICES_API_KEY'], // This is the default and can be omitted\n});\n\nconst task = await client.tasks.attachCaptureSession('id', {\n  capture_session_id: 'cap_0R3kPq8mWxYz1aBcDeFgHi',\n});\n\nconsole.log(task.id);",
      },
      python: {
        method: 'tasks.attach_capture_session',
        example:
          'import os\nfrom indices import Indices\n\nclient = Indices(\n    api_key=os.environ.get("INDICES_API_KEY"),  # This is the default and can be omitted\n)\ntask = client.tasks.attach_capture_session(\n    id="id",\n    capture_session_id="cap_0R3kPq8mWxYz1aBcDeFgHi",\n)\nprint(task.id)',
      },
      http: {
        example:
          'curl https://api.indices.io/v1beta/tasks/$ID/attach_capture_session \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $INDICES_API_KEY" \\\n    -d \'{\n          "capture_session_id": "cap_0R3kPq8mWxYz1aBcDeFgHi"\n        }\'',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1beta/connectors',
    httpMethod: 'get',
    summary: 'List connectors',
    description: '<p>List the connectors in your catalog.</p>',
    stainlessPath: '(resource) connectors > (method) list',
    qualified: 'client.connectors.list',
    params: ['cursor?: string;', 'limit?: number;'],
    response:
      "{ id: string; created_at: string; display_name: string; input_schema: object; output_schema: object; purpose: string; revised_from_connector_id: string; task_id: string; website: string; required_secrets?: { name: string; type: 'login' | 'string'; supports_totp?: boolean; }[]; }",
    markdown:
      "## list\n\n`client.connectors.list(cursor?: string, limit?: number): { id: string; created_at: string; display_name: string; input_schema: object; output_schema: object; purpose: string; revised_from_connector_id: string; task_id: string; website: string; required_secrets?: secret_slot_definition[]; }`\n\n**get** `/v1beta/connectors`\n\n<p>List the connectors in your catalog.</p>\n\n### Parameters\n\n- `cursor?: string`\n  Cursor from a previous response's `next_cursor`, to fetch the next page.\n\n- `limit?: number`\n  Maximum number of connectors to return.\n\n### Returns\n\n- `{ id: string; created_at: string; display_name: string; input_schema: object; output_schema: object; purpose: string; revised_from_connector_id: string; task_id: string; website: string; required_secrets?: { name: string; type: 'login' | 'string'; supports_totp?: boolean; }[]; }`\n\n  - `id: string`\n  - `created_at: string`\n  - `display_name: string`\n  - `input_schema: object`\n  - `output_schema: object`\n  - `purpose: string`\n  - `revised_from_connector_id: string`\n  - `task_id: string`\n  - `website: string`\n  - `required_secrets?: { name: string; type: 'login' | 'string'; supports_totp?: boolean; }[]`\n\n### Example\n\n```typescript\nimport Indices from 'indicesio';\n\nconst client = new Indices();\n\n// Automatically fetches more pages as needed.\nfor await (const connector of client.connectors.list()) {\n  console.log(connector);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.connectors.list',
        example:
          "import Indices from 'indicesio';\n\nconst client = new Indices({\n  apiKey: process.env['INDICES_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const connector of client.connectors.list()) {\n  console.log(connector.id);\n}",
      },
      python: {
        method: 'connectors.list',
        example:
          'import os\nfrom indices import Indices\n\nclient = Indices(\n    api_key=os.environ.get("INDICES_API_KEY"),  # This is the default and can be omitted\n)\npage = client.connectors.list()\npage = page.data[0]\nprint(page.id)',
      },
      http: {
        example:
          'curl https://api.indices.io/v1beta/connectors \\\n    -H "Authorization: Bearer $INDICES_API_KEY"',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1beta/connectors/{connector_id}',
    httpMethod: 'get',
    summary: 'Retrieve a connector',
    description: '<p>Retrieve a connector by its ID.</p>',
    stainlessPath: '(resource) connectors > (method) retrieve',
    qualified: 'client.connectors.retrieve',
    params: ['connector_id: string;'],
    response:
      "{ id: string; created_at: string; display_name: string; input_schema: object; output_schema: object; purpose: string; revised_from_connector_id: string; task_id: string; website: string; required_secrets?: { name: string; type: 'login' | 'string'; supports_totp?: boolean; }[]; }",
    markdown:
      "## retrieve\n\n`client.connectors.retrieve(connector_id: string): { id: string; created_at: string; display_name: string; input_schema: object; output_schema: object; purpose: string; revised_from_connector_id: string; task_id: string; website: string; required_secrets?: secret_slot_definition[]; }`\n\n**get** `/v1beta/connectors/{connector_id}`\n\n<p>Retrieve a connector by its ID.</p>\n\n### Parameters\n\n- `connector_id: string`\n  The ID of the connector to retrieve.\n\n### Returns\n\n- `{ id: string; created_at: string; display_name: string; input_schema: object; output_schema: object; purpose: string; revised_from_connector_id: string; task_id: string; website: string; required_secrets?: { name: string; type: 'login' | 'string'; supports_totp?: boolean; }[]; }`\n\n  - `id: string`\n  - `created_at: string`\n  - `display_name: string`\n  - `input_schema: object`\n  - `output_schema: object`\n  - `purpose: string`\n  - `revised_from_connector_id: string`\n  - `task_id: string`\n  - `website: string`\n  - `required_secrets?: { name: string; type: 'login' | 'string'; supports_totp?: boolean; }[]`\n\n### Example\n\n```typescript\nimport Indices from 'indicesio';\n\nconst client = new Indices();\n\nconst connector = await client.connectors.retrieve('connector_id');\n\nconsole.log(connector);\n```",
    perLanguage: {
      typescript: {
        method: 'client.connectors.retrieve',
        example:
          "import Indices from 'indicesio';\n\nconst client = new Indices({\n  apiKey: process.env['INDICES_API_KEY'], // This is the default and can be omitted\n});\n\nconst connector = await client.connectors.retrieve('connector_id');\n\nconsole.log(connector.id);",
      },
      python: {
        method: 'connectors.retrieve',
        example:
          'import os\nfrom indices import Indices\n\nclient = Indices(\n    api_key=os.environ.get("INDICES_API_KEY"),  # This is the default and can be omitted\n)\nconnector = client.connectors.retrieve(\n    "connector_id",\n)\nprint(connector.id)',
      },
      http: {
        example:
          'curl https://api.indices.io/v1beta/connectors/$CONNECTOR_ID \\\n    -H "Authorization: Bearer $INDICES_API_KEY"',
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1beta/connectors/{connector_id}',
    httpMethod: 'delete',
    summary: 'Delete a connector',
    description:
      '<p>Delete a connector by its ID.</p><p>A legacy task that generated the connector is kept, but is detached and no longer runnable.</p>',
    stainlessPath: '(resource) connectors > (method) delete',
    qualified: 'client.connectors.delete',
    params: ['connector_id: string;'],
    response: '{ id: string; deleted: boolean; }',
    markdown:
      "## delete\n\n`client.connectors.delete(connector_id: string): { id: string; deleted: boolean; }`\n\n**delete** `/v1beta/connectors/{connector_id}`\n\n<p>Delete a connector by its ID.</p><p>A legacy task that generated the connector is kept, but is detached and no longer runnable.</p>\n\n### Parameters\n\n- `connector_id: string`\n  The ID of the connector to delete.\n\n### Returns\n\n- `{ id: string; deleted: boolean; }`\n\n  - `id: string`\n  - `deleted: boolean`\n\n### Example\n\n```typescript\nimport Indices from 'indicesio';\n\nconst client = new Indices();\n\nconst connector = await client.connectors.delete('connector_id');\n\nconsole.log(connector);\n```",
    perLanguage: {
      typescript: {
        method: 'client.connectors.delete',
        example:
          "import Indices from 'indicesio';\n\nconst client = new Indices({\n  apiKey: process.env['INDICES_API_KEY'], // This is the default and can be omitted\n});\n\nconst connector = await client.connectors.delete('connector_id');\n\nconsole.log(connector.id);",
      },
      python: {
        method: 'connectors.delete',
        example:
          'import os\nfrom indices import Indices\n\nclient = Indices(\n    api_key=os.environ.get("INDICES_API_KEY"),  # This is the default and can be omitted\n)\nconnector = client.connectors.delete(\n    "connector_id",\n)\nprint(connector.id)',
      },
      http: {
        example:
          'curl https://api.indices.io/v1beta/connectors/$CONNECTOR_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $INDICES_API_KEY"',
      },
    },
  },
  {
    name: 'list_revisions',
    endpoint: '/v1beta/connectors/{connector_id}/revisions',
    httpMethod: 'get',
    summary: "List a connector's revisions",
    description: '<p>List the full revision lineage of a connector, newest first.</p>',
    stainlessPath: '(resource) connectors > (method) list_revisions',
    qualified: 'client.connectors.listRevisions',
    params: ['connector_id: string;'],
    response:
      '{ data: { id: string; created_at: string; display_name: string; input_schema: object; output_schema: object; purpose: string; revised_from_connector_id: string; task_id: string; website: string; required_secrets?: secret_slot_definition[]; }[]; }',
    markdown:
      "## list_revisions\n\n`client.connectors.listRevisions(connector_id: string): { data: connector[]; }`\n\n**get** `/v1beta/connectors/{connector_id}/revisions`\n\n<p>List the full revision lineage of a connector, newest first.</p>\n\n### Parameters\n\n- `connector_id: string`\n  The ID of the connector whose revisions to list.\n\n### Returns\n\n- `{ data: { id: string; created_at: string; display_name: string; input_schema: object; output_schema: object; purpose: string; revised_from_connector_id: string; task_id: string; website: string; required_secrets?: secret_slot_definition[]; }[]; }`\n\n  - `data: { id: string; created_at: string; display_name: string; input_schema: object; output_schema: object; purpose: string; revised_from_connector_id: string; task_id: string; website: string; required_secrets?: { name: string; type: 'login' | 'string'; supports_totp?: boolean; }[]; }[]`\n\n### Example\n\n```typescript\nimport Indices from 'indicesio';\n\nconst client = new Indices();\n\nconst response = await client.connectors.listRevisions('connector_id');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.connectors.listRevisions',
        example:
          "import Indices from 'indicesio';\n\nconst client = new Indices({\n  apiKey: process.env['INDICES_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.connectors.listRevisions('connector_id');\n\nconsole.log(response.data);",
      },
      python: {
        method: 'connectors.list_revisions',
        example:
          'import os\nfrom indices import Indices\n\nclient = Indices(\n    api_key=os.environ.get("INDICES_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.connectors.list_revisions(\n    "connector_id",\n)\nprint(response.data)',
      },
      http: {
        example:
          'curl https://api.indices.io/v1beta/connectors/$CONNECTOR_ID/revisions \\\n    -H "Authorization: Bearer $INDICES_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1beta/runs',
    httpMethod: 'get',
    summary: 'List runs',
    description: '<p>List runs of a given connector.</p>',
    stainlessPath: '(resource) runs > (method) list',
    qualified: 'client.runs.list',
    params: ['connector_id: string;', 'cursor?: string;', 'limit?: number;'],
    response:
      "{ id: string; arguments: object; connector_id: string; created_at: string; finished_at: string; has_logs: boolean; result_json: string; status: 'pending' | 'running' | 'success' | 'failed' | 'timed_out' | 'result_too_large' | 'internal_error'; task_id: string; secret_bindings?: object; }",
    markdown:
      "## list\n\n`client.runs.list(connector_id: string, cursor?: string, limit?: number): { id: string; arguments: object; connector_id: string; created_at: string; finished_at: string; has_logs: boolean; result_json: string; status: 'pending' | 'running' | 'success' | 'failed' | 'timed_out' | 'result_too_large' | 'internal_error'; task_id: string; secret_bindings?: object; }`\n\n**get** `/v1beta/runs`\n\n<p>List runs of a given connector.</p>\n\n### Parameters\n\n- `connector_id: string`\n  The ID of the connector to list runs for.\n\n- `cursor?: string`\n  Cursor from a previous response's `next_cursor`, to fetch the next page.\n\n- `limit?: number`\n  Maximum number of runs to return.\n\n### Returns\n\n- `{ id: string; arguments: object; connector_id: string; created_at: string; finished_at: string; has_logs: boolean; result_json: string; status: 'pending' | 'running' | 'success' | 'failed' | 'timed_out' | 'result_too_large' | 'internal_error'; task_id: string; secret_bindings?: object; }`\n\n  - `id: string`\n  - `arguments: object`\n  - `connector_id: string`\n  - `created_at: string`\n  - `finished_at: string`\n  - `has_logs: boolean`\n  - `result_json: string`\n  - `status: 'pending' | 'running' | 'success' | 'failed' | 'timed_out' | 'result_too_large' | 'internal_error'`\n  - `task_id: string`\n  - `secret_bindings?: object`\n\n### Example\n\n```typescript\nimport Indices from 'indicesio';\n\nconst client = new Indices();\n\n// Automatically fetches more pages as needed.\nfor await (const run of client.runs.list({ connector_id: 'connector_id' })) {\n  console.log(run);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.runs.list',
        example:
          "import Indices from 'indicesio';\n\nconst client = new Indices({\n  apiKey: process.env['INDICES_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const run of client.runs.list({ connector_id: 'connector_id' })) {\n  console.log(run.id);\n}",
      },
      python: {
        method: 'runs.list',
        example:
          'import os\nfrom indices import Indices\n\nclient = Indices(\n    api_key=os.environ.get("INDICES_API_KEY"),  # This is the default and can be omitted\n)\npage = client.runs.list(\n    connector_id="connector_id",\n)\npage = page.data[0]\nprint(page.id)',
      },
      http: {
        example:
          'curl https://api.indices.io/v1beta/runs \\\n    -H "Authorization: Bearer $INDICES_API_KEY"',
      },
    },
  },
  {
    name: 'run',
    endpoint: '/v1beta/runs',
    httpMethod: 'post',
    summary: 'Run a connector',
    description:
      "<p>Execute a connector. By default the call blocks until the run finishes. Pass <code>async: true</code> to return immediately, in which case you should poll <code>GET /runs</code> to retrieve the result once it's ready.</p>",
    stainlessPath: '(resource) runs > (method) run',
    qualified: 'client.runs.run',
    params: [
      'connector_id: string;',
      'arguments?: object;',
      'async?: boolean;',
      'max_timeout_s?: number;',
      'secret_bindings?: object;',
    ],
    response:
      "{ id: string; arguments: object; connector_id: string; created_at: string; finished_at: string; has_logs: boolean; result_json: string; status: 'pending' | 'running' | 'success' | 'failed' | 'timed_out' | 'result_too_large' | 'internal_error'; task_id: string; secret_bindings?: object; }",
    markdown:
      "## run\n\n`client.runs.run(connector_id: string, arguments?: object, async?: boolean, max_timeout_s?: number, secret_bindings?: object): { id: string; arguments: object; connector_id: string; created_at: string; finished_at: string; has_logs: boolean; result_json: string; status: 'pending' | 'running' | 'success' | 'failed' | 'timed_out' | 'result_too_large' | 'internal_error'; task_id: string; secret_bindings?: object; }`\n\n**post** `/v1beta/runs`\n\n<p>Execute a connector. By default the call blocks until the run finishes. Pass <code>async: true</code> to return immediately, in which case you should poll <code>GET /runs</code> to retrieve the result once it's ready.</p>\n\n### Parameters\n\n- `connector_id: string`\n  ID of the connector to execute.\n\n- `arguments?: object`\n  Arguments to pass to the connector. Optional if the connector does not require any arguments.\n\n- `async?: boolean`\n  When true, return immediately with a pending run; poll retrieveRun for the result.\n\n- `max_timeout_s?: number`\n  Maximum execution time in seconds before the run is timed out.\n\n- `secret_bindings?: object`\n  Mapping of secret slot names to secret IDs. Each slot defined in the connector's required_secrets must be mapped to a user-owned secret.\n\n### Returns\n\n- `{ id: string; arguments: object; connector_id: string; created_at: string; finished_at: string; has_logs: boolean; result_json: string; status: 'pending' | 'running' | 'success' | 'failed' | 'timed_out' | 'result_too_large' | 'internal_error'; task_id: string; secret_bindings?: object; }`\n\n  - `id: string`\n  - `arguments: object`\n  - `connector_id: string`\n  - `created_at: string`\n  - `finished_at: string`\n  - `has_logs: boolean`\n  - `result_json: string`\n  - `status: 'pending' | 'running' | 'success' | 'failed' | 'timed_out' | 'result_too_large' | 'internal_error'`\n  - `task_id: string`\n  - `secret_bindings?: object`\n\n### Example\n\n```typescript\nimport Indices from 'indicesio';\n\nconst client = new Indices();\n\nconst run = await client.runs.run({ connector_id: 'connector_id' });\n\nconsole.log(run);\n```",
    perLanguage: {
      typescript: {
        method: 'client.runs.run',
        example:
          "import Indices from 'indicesio';\n\nconst client = new Indices({\n  apiKey: process.env['INDICES_API_KEY'], // This is the default and can be omitted\n});\n\nconst run = await client.runs.run({ connector_id: 'connector_id' });\n\nconsole.log(run.id);",
      },
      python: {
        method: 'runs.run',
        example:
          'import os\nfrom indices import Indices\n\nclient = Indices(\n    api_key=os.environ.get("INDICES_API_KEY"),  # This is the default and can be omitted\n)\nrun = client.runs.run(\n    connector_id="connector_id",\n)\nprint(run.id)',
      },
      http: {
        example:
          'curl https://api.indices.io/v1beta/runs \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $INDICES_API_KEY" \\\n    -d \'{\n          "connector_id": "connector_id"\n        }\'',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1beta/runs/{run_id}',
    httpMethod: 'get',
    summary: 'Retrieve a run',
    description: '<p>Retrieve a run by its ID.</p>',
    stainlessPath: '(resource) runs > (method) retrieve',
    qualified: 'client.runs.retrieve',
    params: ['run_id: string;'],
    response:
      "{ id: string; arguments: object; connector_id: string; created_at: string; finished_at: string; has_logs: boolean; result_json: string; status: 'pending' | 'running' | 'success' | 'failed' | 'timed_out' | 'result_too_large' | 'internal_error'; task_id: string; secret_bindings?: object; }",
    markdown:
      "## retrieve\n\n`client.runs.retrieve(run_id: string): { id: string; arguments: object; connector_id: string; created_at: string; finished_at: string; has_logs: boolean; result_json: string; status: 'pending' | 'running' | 'success' | 'failed' | 'timed_out' | 'result_too_large' | 'internal_error'; task_id: string; secret_bindings?: object; }`\n\n**get** `/v1beta/runs/{run_id}`\n\n<p>Retrieve a run by its ID.</p>\n\n### Parameters\n\n- `run_id: string`\n  The ID of the run to retrieve.\n\n### Returns\n\n- `{ id: string; arguments: object; connector_id: string; created_at: string; finished_at: string; has_logs: boolean; result_json: string; status: 'pending' | 'running' | 'success' | 'failed' | 'timed_out' | 'result_too_large' | 'internal_error'; task_id: string; secret_bindings?: object; }`\n\n  - `id: string`\n  - `arguments: object`\n  - `connector_id: string`\n  - `created_at: string`\n  - `finished_at: string`\n  - `has_logs: boolean`\n  - `result_json: string`\n  - `status: 'pending' | 'running' | 'success' | 'failed' | 'timed_out' | 'result_too_large' | 'internal_error'`\n  - `task_id: string`\n  - `secret_bindings?: object`\n\n### Example\n\n```typescript\nimport Indices from 'indicesio';\n\nconst client = new Indices();\n\nconst run = await client.runs.retrieve('run_id');\n\nconsole.log(run);\n```",
    perLanguage: {
      typescript: {
        method: 'client.runs.retrieve',
        example:
          "import Indices from 'indicesio';\n\nconst client = new Indices({\n  apiKey: process.env['INDICES_API_KEY'], // This is the default and can be omitted\n});\n\nconst run = await client.runs.retrieve('run_id');\n\nconsole.log(run.id);",
      },
      python: {
        method: 'runs.retrieve',
        example:
          'import os\nfrom indices import Indices\n\nclient = Indices(\n    api_key=os.environ.get("INDICES_API_KEY"),  # This is the default and can be omitted\n)\nrun = client.runs.retrieve(\n    "run_id",\n)\nprint(run.id)',
      },
      http: {
        example:
          'curl https://api.indices.io/v1beta/runs/$RUN_ID \\\n    -H "Authorization: Bearer $INDICES_API_KEY"',
      },
    },
  },
  {
    name: 'logs',
    endpoint: '/v1beta/runs/{run_id}/logs',
    httpMethod: 'get',
    summary: 'Get run logs',
    description: '<p>Retrieve the combined logs for a run.</p>',
    stainlessPath: '(resource) runs > (method) logs',
    qualified: 'client.runs.logs',
    params: ['run_id: string;'],
    response: '{ logs: string; }',
    markdown:
      "## logs\n\n`client.runs.logs(run_id: string): { logs: string; }`\n\n**get** `/v1beta/runs/{run_id}/logs`\n\n<p>Retrieve the combined logs for a run.</p>\n\n### Parameters\n\n- `run_id: string`\n  The ID of the run to get logs for.\n\n### Returns\n\n- `{ logs: string; }`\n\n  - `logs: string`\n\n### Example\n\n```typescript\nimport Indices from 'indicesio';\n\nconst client = new Indices();\n\nconst response = await client.runs.logs('run_id');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.runs.logs',
        example:
          "import Indices from 'indicesio';\n\nconst client = new Indices({\n  apiKey: process.env['INDICES_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.runs.logs('run_id');\n\nconsole.log(response.logs);",
      },
      python: {
        method: 'runs.logs',
        example:
          'import os\nfrom indices import Indices\n\nclient = Indices(\n    api_key=os.environ.get("INDICES_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.runs.logs(\n    "run_id",\n)\nprint(response.logs)',
      },
      http: {
        example:
          'curl https://api.indices.io/v1beta/runs/$RUN_ID/logs \\\n    -H "Authorization: Bearer $INDICES_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1beta/secrets',
    httpMethod: 'get',
    summary: 'List secrets',
    description: '<p>List all your secrets. Returns metadata only, not the actual credentials.</p>',
    stainlessPath: '(resource) secrets > (method) list',
    qualified: 'client.secrets.list',
    response:
      "{ id: string; created_at: string; has_totp: boolean; name: string; secret_type: 'login' | 'string'; updated_at: string; website: string; }[]",
    markdown:
      "## list\n\n`client.secrets.list(): object[]`\n\n**get** `/v1beta/secrets`\n\n<p>List all your secrets. Returns metadata only, not the actual credentials.</p>\n\n### Returns\n\n- `{ id: string; created_at: string; has_totp: boolean; name: string; secret_type: 'login' | 'string'; updated_at: string; website: string; }[]`\n\n### Example\n\n```typescript\nimport Indices from 'indicesio';\n\nconst client = new Indices();\n\nconst secrets = await client.secrets.list();\n\nconsole.log(secrets);\n```",
    perLanguage: {
      typescript: {
        method: 'client.secrets.list',
        example:
          "import Indices from 'indicesio';\n\nconst client = new Indices({\n  apiKey: process.env['INDICES_API_KEY'], // This is the default and can be omitted\n});\n\nconst secrets = await client.secrets.list();\n\nconsole.log(secrets);",
      },
      python: {
        method: 'secrets.list',
        example:
          'import os\nfrom indices import Indices\n\nclient = Indices(\n    api_key=os.environ.get("INDICES_API_KEY"),  # This is the default and can be omitted\n)\nsecrets = client.secrets.list()\nprint(secrets)',
      },
      http: {
        example:
          'curl https://api.indices.io/v1beta/secrets \\\n    -H "Authorization: Bearer $INDICES_API_KEY"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1beta/secrets',
    httpMethod: 'post',
    summary: 'Create secret',
    description: '<p>Create a new secret. Credentials are stored securely in 1Password.</p>',
    stainlessPath: '(resource) secrets > (method) create',
    qualified: 'client.secrets.create',
    params: [
      'name: string;',
      "secret_type: 'login' | 'string';",
      'password?: string;',
      'totp_secret?: string;',
      'username?: string;',
      'value?: string;',
      'website?: string;',
    ],
    response:
      "{ id: string; created_at: string; has_totp: boolean; name: string; secret_type: 'login' | 'string'; updated_at: string; website: string; }",
    markdown:
      "## create\n\n`client.secrets.create(name: string, secret_type: 'login' | 'string', password?: string, totp_secret?: string, username?: string, value?: string, website?: string): { id: string; created_at: string; has_totp: boolean; name: string; secret_type: 'login' | 'string'; updated_at: string; website: string; }`\n\n**post** `/v1beta/secrets`\n\n<p>Create a new secret. Credentials are stored securely in 1Password.</p>\n\n### Parameters\n\n- `name: string`\n  Human-readable name for the secret.\n\n- `secret_type: 'login' | 'string'`\n  Type of secret: 'login' for credentials, 'string' for simple values.\n\n- `password?: string`\n  Login password. Required for 'login' type.\n\n- `totp_secret?: string`\n  Optional TOTP secret (base32 encoded). Only for 'login' type.\n\n- `username?: string`\n  Login username. Required for 'login' type.\n\n- `value?: string`\n  Secret value. Required for 'string' type.\n\n- `website?: string`\n  Optional website URL for context.\n\n### Returns\n\n- `{ id: string; created_at: string; has_totp: boolean; name: string; secret_type: 'login' | 'string'; updated_at: string; website: string; }`\n\n  - `id: string`\n  - `created_at: string`\n  - `has_totp: boolean`\n  - `name: string`\n  - `secret_type: 'login' | 'string'`\n  - `updated_at: string`\n  - `website: string`\n\n### Example\n\n```typescript\nimport Indices from 'indicesio';\n\nconst client = new Indices();\n\nconst secret = await client.secrets.create({ name: 'name', secret_type: 'login' });\n\nconsole.log(secret);\n```",
    perLanguage: {
      typescript: {
        method: 'client.secrets.create',
        example:
          "import Indices from 'indicesio';\n\nconst client = new Indices({\n  apiKey: process.env['INDICES_API_KEY'], // This is the default and can be omitted\n});\n\nconst secret = await client.secrets.create({ name: 'name', secret_type: 'login' });\n\nconsole.log(secret.id);",
      },
      python: {
        method: 'secrets.create',
        example:
          'import os\nfrom indices import Indices\n\nclient = Indices(\n    api_key=os.environ.get("INDICES_API_KEY"),  # This is the default and can be omitted\n)\nsecret = client.secrets.create(\n    name="name",\n    secret_type="login",\n)\nprint(secret.id)',
      },
      http: {
        example:
          'curl https://api.indices.io/v1beta/secrets \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $INDICES_API_KEY" \\\n    -d \'{\n          "name": "name",\n          "secret_type": "login"\n        }\'',
      },
    },
  },
  {
    name: 'get_totp',
    endpoint: '/v1beta/secrets/{id}/totp',
    httpMethod: 'post',
    summary: 'Generate TOTP code',
    description: '<p>Generate a current TOTP code for a login secret that has 2FA configured.</p>',
    stainlessPath: '(resource) secrets > (method) get_totp',
    qualified: 'client.secrets.getTotp',
    params: ['id: string;'],
    response: '{ id: string; code: string; }',
    markdown:
      "## get_totp\n\n`client.secrets.getTotp(id: string): { id: string; code: string; }`\n\n**post** `/v1beta/secrets/{id}/totp`\n\n<p>Generate a current TOTP code for a login secret that has 2FA configured.</p>\n\n### Parameters\n\n- `id: string`\n  The ID of the secret.\n\n### Returns\n\n- `{ id: string; code: string; }`\n\n  - `id: string`\n  - `code: string`\n\n### Example\n\n```typescript\nimport Indices from 'indicesio';\n\nconst client = new Indices();\n\nconst response = await client.secrets.getTotp('id');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.secrets.getTotp',
        example:
          "import Indices from 'indicesio';\n\nconst client = new Indices({\n  apiKey: process.env['INDICES_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.secrets.getTotp('id');\n\nconsole.log(response.id);",
      },
      python: {
        method: 'secrets.get_totp',
        example:
          'import os\nfrom indices import Indices\n\nclient = Indices(\n    api_key=os.environ.get("INDICES_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.secrets.get_totp(\n    "id",\n)\nprint(response.id)',
      },
      http: {
        example:
          'curl https://api.indices.io/v1beta/secrets/$ID/totp \\\n    -X POST \\\n    -H "Authorization: Bearer $INDICES_API_KEY"',
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1beta/secrets/{id}',
    httpMethod: 'delete',
    summary: 'Delete secret',
    description: '<p>Delete a secret. This removes it from both the database and 1Password.</p>',
    stainlessPath: '(resource) secrets > (method) delete',
    qualified: 'client.secrets.delete',
    params: ['id: string;'],
    response: '{ id: string; deleted: boolean; }',
    markdown:
      "## delete\n\n`client.secrets.delete(id: string): { id: string; deleted: boolean; }`\n\n**delete** `/v1beta/secrets/{id}`\n\n<p>Delete a secret. This removes it from both the database and 1Password.</p>\n\n### Parameters\n\n- `id: string`\n  The ID of the secret to delete.\n\n### Returns\n\n- `{ id: string; deleted: boolean; }`\n\n  - `id: string`\n  - `deleted: boolean`\n\n### Example\n\n```typescript\nimport Indices from 'indicesio';\n\nconst client = new Indices();\n\nconst secret = await client.secrets.delete('id');\n\nconsole.log(secret);\n```",
    perLanguage: {
      typescript: {
        method: 'client.secrets.delete',
        example:
          "import Indices from 'indicesio';\n\nconst client = new Indices({\n  apiKey: process.env['INDICES_API_KEY'], // This is the default and can be omitted\n});\n\nconst secret = await client.secrets.delete('id');\n\nconsole.log(secret.id);",
      },
      python: {
        method: 'secrets.delete',
        example:
          'import os\nfrom indices import Indices\n\nclient = Indices(\n    api_key=os.environ.get("INDICES_API_KEY"),  # This is the default and can be omitted\n)\nsecret = client.secrets.delete(\n    "id",\n)\nprint(secret.id)',
      },
      http: {
        example:
          'curl https://api.indices.io/v1beta/secrets/$ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $INDICES_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1beta/files',
    httpMethod: 'get',
    summary: 'List files',
    description: '<p>List your files: uploads and run outputs. Default order is newest first.</p>',
    stainlessPath: '(resource) files > (method) list',
    qualified: 'client.files.list',
    params: [
      'cursor?: string;',
      'filename?: string;',
      'limit?: number;',
      "order?: 'asc' | 'desc';",
      'run_id?: string;',
      "sort?: 'name' | 'created_at' | 'size_bytes' | 'source';",
      "source?: 'UPLOAD' | 'RUN_OUTPUT';",
      'task_id?: string;',
    ],
    response:
      "{ id: string; content_type: string; crc32c: string; created_at: string; name: string; run_id: string; size_bytes: number; source: 'UPLOAD' | 'RUN_OUTPUT'; task_id: string; }",
    markdown:
      "## list\n\n`client.files.list(cursor?: string, filename?: string, limit?: number, order?: 'asc' | 'desc', run_id?: string, sort?: 'name' | 'created_at' | 'size_bytes' | 'source', source?: 'UPLOAD' | 'RUN_OUTPUT', task_id?: string): { id: string; content_type: string; crc32c: string; created_at: string; name: string; run_id: string; size_bytes: number; source: 'UPLOAD' | 'RUN_OUTPUT'; task_id: string; }`\n\n**get** `/v1beta/files`\n\n<p>List your files: uploads and run outputs. Default order is newest first.</p>\n\n### Parameters\n\n- `cursor?: string`\n  Cursor from a previous response's `next_cursor`, to fetch the next page.\n\n- `filename?: string`\n  Only files whose name contains this text.\n\n- `limit?: number`\n  Maximum number of files to return.\n\n- `order?: 'asc' | 'desc'`\n  Sort direction.\n\n- `run_id?: string`\n  Only files produced by this run.\n\n- `sort?: 'name' | 'created_at' | 'size_bytes' | 'source'`\n  Column to sort by: name, created_at, size_bytes, or source.\n\n- `source?: 'UPLOAD' | 'RUN_OUTPUT'`\n  Only files from this source.\n\n- `task_id?: string`\n  Only files produced by runs of this task.\n\n### Returns\n\n- `{ id: string; content_type: string; crc32c: string; created_at: string; name: string; run_id: string; size_bytes: number; source: 'UPLOAD' | 'RUN_OUTPUT'; task_id: string; }`\n\n  - `id: string`\n  - `content_type: string`\n  - `crc32c: string`\n  - `created_at: string`\n  - `name: string`\n  - `run_id: string`\n  - `size_bytes: number`\n  - `source: 'UPLOAD' | 'RUN_OUTPUT'`\n  - `task_id: string`\n\n### Example\n\n```typescript\nimport Indices from 'indicesio';\n\nconst client = new Indices();\n\n// Automatically fetches more pages as needed.\nfor await (const file of client.files.list()) {\n  console.log(file);\n}\n```",
    perLanguage: {
      typescript: {
        method: 'client.files.list',
        example:
          "import Indices from 'indicesio';\n\nconst client = new Indices({\n  apiKey: process.env['INDICES_API_KEY'], // This is the default and can be omitted\n});\n\n// Automatically fetches more pages as needed.\nfor await (const file of client.files.list()) {\n  console.log(file.id);\n}",
      },
      python: {
        method: 'files.list',
        example:
          'import os\nfrom indices import Indices\n\nclient = Indices(\n    api_key=os.environ.get("INDICES_API_KEY"),  # This is the default and can be omitted\n)\npage = client.files.list()\npage = page.data[0]\nprint(page.id)',
      },
      http: {
        example:
          'curl https://api.indices.io/v1beta/files \\\n    -H "Authorization: Bearer $INDICES_API_KEY"',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1beta/files/{file_id}',
    httpMethod: 'get',
    summary: 'Retrieve a file',
    description: "<p>Retrieve a file's metadata by its ID.</p>",
    stainlessPath: '(resource) files > (method) retrieve',
    qualified: 'client.files.retrieve',
    params: ['file_id: string;'],
    response:
      "{ id: string; content_type: string; crc32c: string; created_at: string; name: string; run_id: string; size_bytes: number; source: 'UPLOAD' | 'RUN_OUTPUT'; task_id: string; }",
    markdown:
      "## retrieve\n\n`client.files.retrieve(file_id: string): { id: string; content_type: string; crc32c: string; created_at: string; name: string; run_id: string; size_bytes: number; source: 'UPLOAD' | 'RUN_OUTPUT'; task_id: string; }`\n\n**get** `/v1beta/files/{file_id}`\n\n<p>Retrieve a file's metadata by its ID.</p>\n\n### Parameters\n\n- `file_id: string`\n  The ID of the file to retrieve.\n\n### Returns\n\n- `{ id: string; content_type: string; crc32c: string; created_at: string; name: string; run_id: string; size_bytes: number; source: 'UPLOAD' | 'RUN_OUTPUT'; task_id: string; }`\n\n  - `id: string`\n  - `content_type: string`\n  - `crc32c: string`\n  - `created_at: string`\n  - `name: string`\n  - `run_id: string`\n  - `size_bytes: number`\n  - `source: 'UPLOAD' | 'RUN_OUTPUT'`\n  - `task_id: string`\n\n### Example\n\n```typescript\nimport Indices from 'indicesio';\n\nconst client = new Indices();\n\nconst file = await client.files.retrieve('file_id');\n\nconsole.log(file);\n```",
    perLanguage: {
      typescript: {
        method: 'client.files.retrieve',
        example:
          "import Indices from 'indicesio';\n\nconst client = new Indices({\n  apiKey: process.env['INDICES_API_KEY'], // This is the default and can be omitted\n});\n\nconst file = await client.files.retrieve('file_id');\n\nconsole.log(file.id);",
      },
      python: {
        method: 'files.retrieve',
        example:
          'import os\nfrom indices import Indices\n\nclient = Indices(\n    api_key=os.environ.get("INDICES_API_KEY"),  # This is the default and can be omitted\n)\nfile = client.files.retrieve(\n    "file_id",\n)\nprint(file.id)',
      },
      http: {
        example:
          'curl https://api.indices.io/v1beta/files/$FILE_ID \\\n    -H "Authorization: Bearer $INDICES_API_KEY"',
      },
    },
  },
  {
    name: 'get_download_url',
    endpoint: '/v1beta/files/{file_id}/download_url',
    httpMethod: 'get',
    summary: 'Get a file download URL',
    description: '<p>Get a short-lived signed URL to download the file bytes directly from storage.</p>',
    stainlessPath: '(resource) files > (method) get_download_url',
    qualified: 'client.files.getDownloadURL',
    params: ['file_id: string;'],
    response: '{ expires_at: string; url: string; }',
    markdown:
      "## get_download_url\n\n`client.files.getDownloadURL(file_id: string): { expires_at: string; url: string; }`\n\n**get** `/v1beta/files/{file_id}/download_url`\n\n<p>Get a short-lived signed URL to download the file bytes directly from storage.</p>\n\n### Parameters\n\n- `file_id: string`\n  The ID of the file to download.\n\n### Returns\n\n- `{ expires_at: string; url: string; }`\n\n  - `expires_at: string`\n  - `url: string`\n\n### Example\n\n```typescript\nimport Indices from 'indicesio';\n\nconst client = new Indices();\n\nconst response = await client.files.getDownloadURL('file_id');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.files.getDownloadURL',
        example:
          "import Indices from 'indicesio';\n\nconst client = new Indices({\n  apiKey: process.env['INDICES_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.files.getDownloadURL('file_id');\n\nconsole.log(response.expires_at);",
      },
      python: {
        method: 'files.get_download_url',
        example:
          'import os\nfrom indices import Indices\n\nclient = Indices(\n    api_key=os.environ.get("INDICES_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.files.get_download_url(\n    "file_id",\n)\nprint(response.expires_at)',
      },
      http: {
        example:
          'curl https://api.indices.io/v1beta/files/$FILE_ID/download_url \\\n    -H "Authorization: Bearer $INDICES_API_KEY"',
      },
    },
  },
  {
    name: 'download',
    endpoint: '/v1beta/files/{file_id}/download',
    httpMethod: 'get',
    summary: 'Download a file',
    description: '<p>Redirect to a short-lived signed URL that serves the file bytes.</p>',
    stainlessPath: '(resource) files > (method) download',
    qualified: 'client.files.download',
    params: ['file_id: string;'],
    markdown:
      "## download\n\n`client.files.download(file_id: string): void`\n\n**get** `/v1beta/files/{file_id}/download`\n\n<p>Redirect to a short-lived signed URL that serves the file bytes.</p>\n\n### Parameters\n\n- `file_id: string`\n  The ID of the file to download.\n\n### Example\n\n```typescript\nimport Indices from 'indicesio';\n\nconst client = new Indices();\n\nawait client.files.download('file_id')\n```",
    perLanguage: {
      typescript: {
        method: 'client.files.download',
        example:
          "import Indices from 'indicesio';\n\nconst client = new Indices({\n  apiKey: process.env['INDICES_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.files.download('file_id');",
      },
      python: {
        method: 'files.download',
        example:
          'import os\nfrom indices import Indices\n\nclient = Indices(\n    api_key=os.environ.get("INDICES_API_KEY"),  # This is the default and can be omitted\n)\nclient.files.download(\n    "file_id",\n)',
      },
      http: {
        example:
          'curl https://api.indices.io/v1beta/files/$FILE_ID/download \\\n    -H "Authorization: Bearer $INDICES_API_KEY"',
      },
    },
  },
  {
    name: 'delete',
    endpoint: '/v1beta/files/{file_id}',
    httpMethod: 'delete',
    summary: 'Delete a file',
    description: '<p>Delete a file and its stored bytes.</p>',
    stainlessPath: '(resource) files > (method) delete',
    qualified: 'client.files.delete',
    params: ['file_id: string;'],
    response: '{ id: string; deleted: boolean; }',
    markdown:
      "## delete\n\n`client.files.delete(file_id: string): { id: string; deleted: boolean; }`\n\n**delete** `/v1beta/files/{file_id}`\n\n<p>Delete a file and its stored bytes.</p>\n\n### Parameters\n\n- `file_id: string`\n  The ID of the file to delete.\n\n### Returns\n\n- `{ id: string; deleted: boolean; }`\n\n  - `id: string`\n  - `deleted: boolean`\n\n### Example\n\n```typescript\nimport Indices from 'indicesio';\n\nconst client = new Indices();\n\nconst file = await client.files.delete('file_id');\n\nconsole.log(file);\n```",
    perLanguage: {
      typescript: {
        method: 'client.files.delete',
        example:
          "import Indices from 'indicesio';\n\nconst client = new Indices({\n  apiKey: process.env['INDICES_API_KEY'], // This is the default and can be omitted\n});\n\nconst file = await client.files.delete('file_id');\n\nconsole.log(file.id);",
      },
      python: {
        method: 'files.delete',
        example:
          'import os\nfrom indices import Indices\n\nclient = Indices(\n    api_key=os.environ.get("INDICES_API_KEY"),  # This is the default and can be omitted\n)\nfile = client.files.delete(\n    "file_id",\n)\nprint(file.id)',
      },
      http: {
        example:
          'curl https://api.indices.io/v1beta/files/$FILE_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $INDICES_API_KEY"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1beta/files',
    httpMethod: 'post',
    summary: 'Initiate a file upload',
    description: '<p>Create a pending file and get a signed URL to PUT the bytes to.</p>',
    stainlessPath: '(resource) files > (method) create',
    qualified: 'client.files.create',
    params: ['content_type: string;', 'name: string;', 'size_bytes: number;'],
    response: '{ expires_at: string; file_id: string; upload_headers: object; upload_url: string; }',
    markdown:
      "## create\n\n`client.files.create(content_type: string, name: string, size_bytes: number): { expires_at: string; file_id: string; upload_headers: object; upload_url: string; }`\n\n**post** `/v1beta/files`\n\n<p>Create a pending file and get a signed URL to PUT the bytes to.</p>\n\n### Parameters\n\n- `content_type: string`\n  MIME type of the file content.\n\n- `name: string`\n  User-facing filename, e.g. 'report.pdf'.\n\n- `size_bytes: number`\n  Exact size of the file in bytes. Enforced by the signed upload URL.\n\n### Returns\n\n- `{ expires_at: string; file_id: string; upload_headers: object; upload_url: string; }`\n\n  - `expires_at: string`\n  - `file_id: string`\n  - `upload_headers: object`\n  - `upload_url: string`\n\n### Example\n\n```typescript\nimport Indices from 'indicesio';\n\nconst client = new Indices();\n\nconst file = await client.files.create({\n  content_type: 'x',\n  name: 'x',\n  size_bytes: 0,\n});\n\nconsole.log(file);\n```",
    perLanguage: {
      typescript: {
        method: 'client.files.create',
        example:
          "import Indices from 'indicesio';\n\nconst client = new Indices({\n  apiKey: process.env['INDICES_API_KEY'], // This is the default and can be omitted\n});\n\nconst file = await client.files.create({\n  content_type: 'x',\n  name: 'x',\n  size_bytes: 0,\n});\n\nconsole.log(file.file_id);",
      },
      python: {
        method: 'files.create',
        example:
          'import os\nfrom indices import Indices\n\nclient = Indices(\n    api_key=os.environ.get("INDICES_API_KEY"),  # This is the default and can be omitted\n)\nfile = client.files.create(\n    content_type="x",\n    name="x",\n    size_bytes=0,\n)\nprint(file.file_id)',
      },
      http: {
        example:
          'curl https://api.indices.io/v1beta/files \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $INDICES_API_KEY" \\\n    -d \'{\n          "content_type": "x",\n          "name": "x",\n          "size_bytes": 0\n        }\'',
      },
    },
  },
  {
    name: 'finalize',
    endpoint: '/v1beta/files/{file_id}/complete',
    httpMethod: 'post',
    summary: 'Finalize a file upload',
    description: '<p>Confirm the bytes were uploaded; the file becomes available for use.</p>',
    stainlessPath: '(resource) files > (method) finalize',
    qualified: 'client.files.finalize',
    params: ['file_id: string;'],
    response: '{ content_type: string; crc32c: string; file_id: string; name: string; size_bytes: number; }',
    markdown:
      "## finalize\n\n`client.files.finalize(file_id: string): { content_type: string; crc32c: string; file_id: string; name: string; size_bytes: number; }`\n\n**post** `/v1beta/files/{file_id}/complete`\n\n<p>Confirm the bytes were uploaded; the file becomes available for use.</p>\n\n### Parameters\n\n- `file_id: string`\n  The ID of the pending file to finalize.\n\n### Returns\n\n- `{ content_type: string; crc32c: string; file_id: string; name: string; size_bytes: number; }`\n\n  - `content_type: string`\n  - `crc32c: string`\n  - `file_id: string`\n  - `name: string`\n  - `size_bytes: number`\n\n### Example\n\n```typescript\nimport Indices from 'indicesio';\n\nconst client = new Indices();\n\nconst response = await client.files.finalize('file_id');\n\nconsole.log(response);\n```",
    perLanguage: {
      typescript: {
        method: 'client.files.finalize',
        example:
          "import Indices from 'indicesio';\n\nconst client = new Indices({\n  apiKey: process.env['INDICES_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.files.finalize('file_id');\n\nconsole.log(response.file_id);",
      },
      python: {
        method: 'files.finalize',
        example:
          'import os\nfrom indices import Indices\n\nclient = Indices(\n    api_key=os.environ.get("INDICES_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.files.finalize(\n    "file_id",\n)\nprint(response.file_id)',
      },
      http: {
        example:
          'curl https://api.indices.io/v1beta/files/$FILE_ID/complete \\\n    -X POST \\\n    -H "Authorization: Bearer $INDICES_API_KEY"',
      },
    },
  },
  {
    name: 'list',
    endpoint: '/v1beta/capture_sessions',
    httpMethod: 'get',
    summary: 'List capture sessions',
    description: '<p>List all capture sessions, newest first.</p>',
    stainlessPath: '(resource) capture_sessions > (method) list',
    qualified: 'client.captureSessions.list',
    response:
      "{ id: string; browser_session_id: string; created_at: string; iframe_url: string; state: 'active' | 'completing' | 'completed' | 'abandoned' | 'failed'; updated_at: string; }[]",
    markdown:
      "## list\n\n`client.captureSessions.list(): object[]`\n\n**get** `/v1beta/capture_sessions`\n\n<p>List all capture sessions, newest first.</p>\n\n### Returns\n\n- `{ id: string; browser_session_id: string; created_at: string; iframe_url: string; state: 'active' | 'completing' | 'completed' | 'abandoned' | 'failed'; updated_at: string; }[]`\n\n### Example\n\n```typescript\nimport Indices from 'indicesio';\n\nconst client = new Indices();\n\nconst captureSessions = await client.captureSessions.list();\n\nconsole.log(captureSessions);\n```",
    perLanguage: {
      typescript: {
        method: 'client.captureSessions.list',
        example:
          "import Indices from 'indicesio';\n\nconst client = new Indices({\n  apiKey: process.env['INDICES_API_KEY'], // This is the default and can be omitted\n});\n\nconst captureSessions = await client.captureSessions.list();\n\nconsole.log(captureSessions);",
      },
      python: {
        method: 'capture_sessions.list',
        example:
          'import os\nfrom indices import Indices\n\nclient = Indices(\n    api_key=os.environ.get("INDICES_API_KEY"),  # This is the default and can be omitted\n)\ncapture_sessions = client.capture_sessions.list()\nprint(capture_sessions)',
      },
      http: {
        example:
          'curl https://api.indices.io/v1beta/capture_sessions \\\n    -H "Authorization: Bearer $INDICES_API_KEY"',
      },
    },
  },
  {
    name: 'create',
    endpoint: '/v1beta/capture_sessions',
    httpMethod: 'post',
    summary: 'Start a capture session',
    description:
      '<p>Spawn a browser session that records the network traffic of everything done in it.</p><p>Once completed, the capture session is a reusable recording: attach it to a task to generate an API from it.</p>',
    stainlessPath: '(resource) capture_sessions > (method) create',
    qualified: 'client.captureSessions.create',
    params: [
      'cookies?: { name: string; value: string; domain?: string; http_only?: boolean; path?: string; secure?: boolean; }[];',
      'use_proxy?: boolean;',
    ],
    response:
      "{ id: string; browser_session_id: string; created_at: string; iframe_url: string; state: 'active' | 'completing' | 'completed' | 'abandoned' | 'failed'; updated_at: string; }",
    markdown:
      "## create\n\n`client.captureSessions.create(cookies?: { name: string; value: string; domain?: string; http_only?: boolean; path?: string; secure?: boolean; }[], use_proxy?: boolean): { id: string; browser_session_id: string; created_at: string; iframe_url: string; state: capture_session_state; updated_at: string; }`\n\n**post** `/v1beta/capture_sessions`\n\n<p>Spawn a browser session that records the network traffic of everything done in it.</p><p>Once completed, the capture session is a reusable recording: attach it to a task to generate an API from it.</p>\n\n### Parameters\n\n- `cookies?: { name: string; value: string; domain?: string; http_only?: boolean; path?: string; secure?: boolean; }[]`\n  Initial cookies to set in the browser session.\n\n- `use_proxy?: boolean`\n  If true, spawn the browser session using a proxy.\n\n### Returns\n\n- `{ id: string; browser_session_id: string; created_at: string; iframe_url: string; state: 'active' | 'completing' | 'completed' | 'abandoned' | 'failed'; updated_at: string; }`\n\n  - `id: string`\n  - `browser_session_id: string`\n  - `created_at: string`\n  - `iframe_url: string`\n  - `state: 'active' | 'completing' | 'completed' | 'abandoned' | 'failed'`\n  - `updated_at: string`\n\n### Example\n\n```typescript\nimport Indices from 'indicesio';\n\nconst client = new Indices();\n\nconst captureSession = await client.captureSessions.create();\n\nconsole.log(captureSession);\n```",
    perLanguage: {
      typescript: {
        method: 'client.captureSessions.create',
        example:
          "import Indices from 'indicesio';\n\nconst client = new Indices({\n  apiKey: process.env['INDICES_API_KEY'], // This is the default and can be omitted\n});\n\nconst captureSession = await client.captureSessions.create();\n\nconsole.log(captureSession.id);",
      },
      python: {
        method: 'capture_sessions.create',
        example:
          'import os\nfrom indices import Indices\n\nclient = Indices(\n    api_key=os.environ.get("INDICES_API_KEY"),  # This is the default and can be omitted\n)\ncapture_session = client.capture_sessions.create()\nprint(capture_session.id)',
      },
      http: {
        example:
          'curl https://api.indices.io/v1beta/capture_sessions \\\n    -X POST \\\n    -H "Authorization: Bearer $INDICES_API_KEY"',
      },
    },
  },
  {
    name: 'retrieve',
    endpoint: '/v1beta/capture_sessions/{id}',
    httpMethod: 'get',
    summary: 'Retrieve a capture session',
    description:
      '<p>Retrieve a capture session by its ID.</p><p>Poll this after requesting completion: the session is a usable recording once <code>state</code> is <code>completed</code>.</p>',
    stainlessPath: '(resource) capture_sessions > (method) retrieve',
    qualified: 'client.captureSessions.retrieve',
    params: ['id: string;'],
    response:
      "{ id: string; browser_session_id: string; created_at: string; iframe_url: string; state: 'active' | 'completing' | 'completed' | 'abandoned' | 'failed'; updated_at: string; }",
    markdown:
      "## retrieve\n\n`client.captureSessions.retrieve(id: string): { id: string; browser_session_id: string; created_at: string; iframe_url: string; state: capture_session_state; updated_at: string; }`\n\n**get** `/v1beta/capture_sessions/{id}`\n\n<p>Retrieve a capture session by its ID.</p><p>Poll this after requesting completion: the session is a usable recording once <code>state</code> is <code>completed</code>.</p>\n\n### Parameters\n\n- `id: string`\n  The ID of the capture session to retrieve.\n\n### Returns\n\n- `{ id: string; browser_session_id: string; created_at: string; iframe_url: string; state: 'active' | 'completing' | 'completed' | 'abandoned' | 'failed'; updated_at: string; }`\n\n  - `id: string`\n  - `browser_session_id: string`\n  - `created_at: string`\n  - `iframe_url: string`\n  - `state: 'active' | 'completing' | 'completed' | 'abandoned' | 'failed'`\n  - `updated_at: string`\n\n### Example\n\n```typescript\nimport Indices from 'indicesio';\n\nconst client = new Indices();\n\nconst captureSession = await client.captureSessions.retrieve('id');\n\nconsole.log(captureSession);\n```",
    perLanguage: {
      typescript: {
        method: 'client.captureSessions.retrieve',
        example:
          "import Indices from 'indicesio';\n\nconst client = new Indices({\n  apiKey: process.env['INDICES_API_KEY'], // This is the default and can be omitted\n});\n\nconst captureSession = await client.captureSessions.retrieve('id');\n\nconsole.log(captureSession.id);",
      },
      python: {
        method: 'capture_sessions.retrieve',
        example:
          'import os\nfrom indices import Indices\n\nclient = Indices(\n    api_key=os.environ.get("INDICES_API_KEY"),  # This is the default and can be omitted\n)\ncapture_session = client.capture_sessions.retrieve(\n    "id",\n)\nprint(capture_session.id)',
      },
      http: {
        example:
          'curl https://api.indices.io/v1beta/capture_sessions/$ID \\\n    -H "Authorization: Bearer $INDICES_API_KEY"',
      },
    },
  },
  {
    name: 'complete',
    endpoint: '/v1beta/capture_sessions/{id}/complete',
    httpMethod: 'post',
    summary: 'Complete a capture session',
    description:
      '<p>Stop recording and finalize the capture session.</p><p>Completion is asynchronous: the browser uploads its recording and the session then transitions to <code>completed</code>. Poll <code>retrieveCaptureSession</code> to observe the transition.</p>',
    stainlessPath: '(resource) capture_sessions > (method) complete',
    qualified: 'client.captureSessions.complete',
    params: ['id: string;'],
    response:
      "{ id: string; browser_session_id: string; created_at: string; iframe_url: string; state: 'active' | 'completing' | 'completed' | 'abandoned' | 'failed'; updated_at: string; }",
    markdown:
      "## complete\n\n`client.captureSessions.complete(id: string): { id: string; browser_session_id: string; created_at: string; iframe_url: string; state: capture_session_state; updated_at: string; }`\n\n**post** `/v1beta/capture_sessions/{id}/complete`\n\n<p>Stop recording and finalize the capture session.</p><p>Completion is asynchronous: the browser uploads its recording and the session then transitions to <code>completed</code>. Poll <code>retrieveCaptureSession</code> to observe the transition.</p>\n\n### Parameters\n\n- `id: string`\n  The ID of the capture session to complete.\n\n### Returns\n\n- `{ id: string; browser_session_id: string; created_at: string; iframe_url: string; state: 'active' | 'completing' | 'completed' | 'abandoned' | 'failed'; updated_at: string; }`\n\n  - `id: string`\n  - `browser_session_id: string`\n  - `created_at: string`\n  - `iframe_url: string`\n  - `state: 'active' | 'completing' | 'completed' | 'abandoned' | 'failed'`\n  - `updated_at: string`\n\n### Example\n\n```typescript\nimport Indices from 'indicesio';\n\nconst client = new Indices();\n\nconst captureSession = await client.captureSessions.complete('id');\n\nconsole.log(captureSession);\n```",
    perLanguage: {
      typescript: {
        method: 'client.captureSessions.complete',
        example:
          "import Indices from 'indicesio';\n\nconst client = new Indices({\n  apiKey: process.env['INDICES_API_KEY'], // This is the default and can be omitted\n});\n\nconst captureSession = await client.captureSessions.complete('id');\n\nconsole.log(captureSession.id);",
      },
      python: {
        method: 'capture_sessions.complete',
        example:
          'import os\nfrom indices import Indices\n\nclient = Indices(\n    api_key=os.environ.get("INDICES_API_KEY"),  # This is the default and can be omitted\n)\ncapture_session = client.capture_sessions.complete(\n    "id",\n)\nprint(capture_session.id)',
      },
      http: {
        example:
          'curl https://api.indices.io/v1beta/capture_sessions/$ID/complete \\\n    -X POST \\\n    -H "Authorization: Bearer $INDICES_API_KEY"',
      },
    },
  },
  {
    name: 'abandon',
    endpoint: '/v1beta/capture_sessions/{id}/abandon',
    httpMethod: 'post',
    summary: 'Abandon a capture session',
    description: '<p>Discard an in-progress capture session and release its browser.</p>',
    stainlessPath: '(resource) capture_sessions > (method) abandon',
    qualified: 'client.captureSessions.abandon',
    params: ['id: string;'],
    response:
      "{ id: string; browser_session_id: string; created_at: string; iframe_url: string; state: 'active' | 'completing' | 'completed' | 'abandoned' | 'failed'; updated_at: string; }",
    markdown:
      "## abandon\n\n`client.captureSessions.abandon(id: string): { id: string; browser_session_id: string; created_at: string; iframe_url: string; state: capture_session_state; updated_at: string; }`\n\n**post** `/v1beta/capture_sessions/{id}/abandon`\n\n<p>Discard an in-progress capture session and release its browser.</p>\n\n### Parameters\n\n- `id: string`\n  The ID of the capture session to abandon.\n\n### Returns\n\n- `{ id: string; browser_session_id: string; created_at: string; iframe_url: string; state: 'active' | 'completing' | 'completed' | 'abandoned' | 'failed'; updated_at: string; }`\n\n  - `id: string`\n  - `browser_session_id: string`\n  - `created_at: string`\n  - `iframe_url: string`\n  - `state: 'active' | 'completing' | 'completed' | 'abandoned' | 'failed'`\n  - `updated_at: string`\n\n### Example\n\n```typescript\nimport Indices from 'indicesio';\n\nconst client = new Indices();\n\nconst captureSession = await client.captureSessions.abandon('id');\n\nconsole.log(captureSession);\n```",
    perLanguage: {
      typescript: {
        method: 'client.captureSessions.abandon',
        example:
          "import Indices from 'indicesio';\n\nconst client = new Indices({\n  apiKey: process.env['INDICES_API_KEY'], // This is the default and can be omitted\n});\n\nconst captureSession = await client.captureSessions.abandon('id');\n\nconsole.log(captureSession.id);",
      },
      python: {
        method: 'capture_sessions.abandon',
        example:
          'import os\nfrom indices import Indices\n\nclient = Indices(\n    api_key=os.environ.get("INDICES_API_KEY"),  # This is the default and can be omitted\n)\ncapture_session = client.capture_sessions.abandon(\n    "id",\n)\nprint(capture_session.id)',
      },
      http: {
        example:
          'curl https://api.indices.io/v1beta/capture_sessions/$ID/abandon \\\n    -X POST \\\n    -H "Authorization: Bearer $INDICES_API_KEY"',
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'python',
    content:
      '# Indices Python API library\n\n<!-- prettier-ignore -->\n[![PyPI version](https://img.shields.io/pypi/v/indices.svg?label=pypi%20(stable))](https://pypi.org/project/indices/)\n\nThe Indices Python library provides convenient access to the Indices REST API from any Python 3.9+\napplication. The library includes type definitions for all request params and response fields,\nand offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Indices MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=indicesio-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImluZGljZXNpby1tY3AiXSwiZW52Ijp7IklORElDRVNfQVBJX0tFWSI6Ik15IEFQSSBLZXkifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22indicesio-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22indicesio-mcp%22%5D%2C%22env%22%3A%7B%22INDICES_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\nThe REST API documentation can be found on [docs.indices.io](https://docs.indices.io). The full API of this library can be found in [api.md](api.md).\n\n## Installation\n\n```sh\n# install from PyPI\npip install indices\n```\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```python\nimport os\nfrom indices import Indices\n\nclient = Indices(\n    api_key=os.environ.get("INDICES_API_KEY"),  # This is the default and can be omitted\n)\n\nrun = client.runs.run(\n    connector_id="conn_8kPq2mWxYz1aBcDeFgHi3J",\n    arguments={\n        "...": None\n    },\n)\nprint(run.result_json)\n```\n\nWhile you can provide an `api_key` keyword argument,\nwe recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)\nto add `INDICES_API_KEY="My API Key"` to your `.env` file\nso that your API Key is not stored in source control.\n\n## Async usage\n\nSimply import `AsyncIndices` instead of `Indices` and use `await` with each API call:\n\n```python\nimport os\nimport asyncio\nfrom indices import AsyncIndices\n\nclient = AsyncIndices(\n    api_key=os.environ.get("INDICES_API_KEY"),  # This is the default and can be omitted\n)\n\nasync def main() -> None:\n  run = await client.runs.run(\n      connector_id="conn_8kPq2mWxYz1aBcDeFgHi3J",\n      arguments={\n          "...": None\n      },\n  )\n  print(run.result_json)\n\nasyncio.run(main())\n```\n\nFunctionality between the synchronous and asynchronous clients is otherwise identical.\n\n### With aiohttp\n\nBy default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.\n\nYou can enable this by installing `aiohttp`:\n\n```sh\n# install from PyPI\npip install indices[aiohttp]\n```\n\nThen you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()`:\n\n```python\nimport os\nimport asyncio\nfrom indices import DefaultAioHttpClient\nfrom indices import AsyncIndices\n\nasync def main() -> None:\n  async with AsyncIndices(\n    api_key=os.environ.get("INDICES_API_KEY"),  # This is the default and can be omitted\n    http_client=DefaultAioHttpClient(),\n) as client:\n    run = await client.runs.run(\n        connector_id="conn_8kPq2mWxYz1aBcDeFgHi3J",\n        arguments={\n            "...": None\n        },\n    )\n    print(run.result_json)\n\nasyncio.run(main())\n```\n\n\n\n## Using types\n\nNested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html#typing.TypedDict). Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:\n\n- Serializing back into JSON, `model.to_json()`\n- Converting to a dictionary, `model.to_dict()`\n\nTyped requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic`.\n\n## Pagination\n\nList methods in the Indices API are paginated.\n\nThis library provides auto-paginating iterators with each list response, so you do not have to request successive pages manually:\n\n```python\nfrom indices import Indices\n\nclient = Indices()\n\nall_connectors = []\n# Automatically fetches more pages as needed.\nfor connector in client.connectors.list():\n    # Do something with connector here\n    all_connectors.append(connector)\nprint(all_connectors)\n```\n\nOr, asynchronously:\n\n```python\nimport asyncio\nfrom indices import AsyncIndices\n\nclient = AsyncIndices()\n\nasync def main() -> None:\n    all_connectors = []\n    # Iterate through items across all pages, issuing requests as needed.\n    async for connector in client.connectors.list():\n        all_connectors.append(connector)\n    print(all_connectors)\n\nasyncio.run(main())\n```\n\nAlternatively, you can use the `.has_next_page()`, `.next_page_info()`, or  `.get_next_page()` methods for more granular control working with pages:\n\n```python\nfirst_page = await client.connectors.list()\nif first_page.has_next_page():\n    print(f"will fetch next page using these details: {first_page.next_page_info()}")\n    next_page = await first_page.get_next_page()\n    print(f"number of items we just fetched: {len(next_page.data)}")\n\n# Remove `await` for non-async usage.\n```\n\nOr just work directly with the returned data:\n\n```python\nfirst_page = await client.connectors.list()\n\nprint(f"next page cursor: {first_page.next_cursor}") # => "next page cursor: ..."\nfor connector in first_page.data:\n    print(connector.id)\n\n# Remove `await` for non-async usage.\n```\n\n## Nested params\n\nNested parameters are dictionaries, typed using `TypedDict`, for example:\n\n```python\nfrom indices import Indices\n\nclient = Indices()\n\ntask = client.tasks.create(\n    creation_params={},\n    display_name="display_name",\n    task="task",\n)\nprint(task.creation_params)\n```\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `indices.APIConnectionError` is raised.\n\nWhen the API returns a non-success status code (that is, 4xx or 5xx\nresponse), a subclass of `indices.APIStatusError` is raised, containing `status_code` and `response` properties.\n\nAll errors inherit from `indices.APIError`.\n\n```python\nimport indices\nfrom indices import Indices\n\nclient = Indices()\n\ntry:\n    client.runs.run(\n        connector_id="conn_8kPq2mWxYz1aBcDeFgHi3J",\n        arguments={\n            "...": None\n        },\n    )\nexcept indices.APIConnectionError as e:\n    print("The server could not be reached")\n    print(e.__cause__) # an underlying Exception, likely raised within httpx.\nexcept indices.RateLimitError as e:\n    print("A 429 status code was received; we should back off a bit.")\nexcept indices.APIStatusError as e:\n    print("Another non-200-range status code was received")\n    print(e.status_code)\n    print(e.response)\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors are automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors are all retried by default.\n\nYou can use the `max_retries` option to configure or disable retry settings:\n\n```python\nfrom indices import Indices\n\n# Configure the default for all requests:\nclient = Indices(\n    # default is 2\n    max_retries=0,\n)\n\n# Or, configure per-request:\nclient.with_options(max_retries = 5).runs.run(\n    connector_id="conn_8kPq2mWxYz1aBcDeFgHi3J",\n    arguments={\n        "...": None\n    },\n)\n```\n\n### Timeouts\n\nBy default requests time out after 1 minute. You can configure this with a `timeout` option,\nwhich accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) object:\n\n```python\nfrom indices import Indices\n\n# Configure the default for all requests:\nclient = Indices(\n    # 20 seconds (default is 1 minute)\n    timeout=20.0,\n)\n\n# More granular control:\nclient = Indices(\n    timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),\n)\n\n# Override per-request:\nclient.with_options(timeout = 5.0).runs.run(\n    connector_id="conn_8kPq2mWxYz1aBcDeFgHi3J",\n    arguments={\n        "...": None\n    },\n)\n```\n\nOn timeout, an `APITimeoutError` is thrown.\n\nNote that requests that time out are [retried twice by default](#retries).\n\n\n\n## Advanced\n\n### Logging\n\nWe use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.\n\nYou can enable logging by setting the environment variable `INDICES_LOG` to `info`.\n\n```shell\n$ export INDICES_LOG=info\n```\n\nOr to `debug` for more verbose logging.\n\n### How to tell whether `None` means `null` or missing\n\nIn an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set`:\n\n```py\nif response.my_field is None:\n  if \'my_field\' not in response.model_fields_set:\n    print(\'Got json like {}, without a "my_field" key present at all.\')\n  else:\n    print(\'Got json like {"my_field": null}.\')\n```\n\n### Accessing raw response data (e.g. headers)\n\nThe "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,\n\n```py\nfrom indices import Indices\n\nclient = Indices()\nresponse = client.runs.with_raw_response.run(\n    connector_id="conn_8kPq2mWxYz1aBcDeFgHi3J",\n    arguments={\n        "...": None\n    },\n)\nprint(response.headers.get(\'X-My-Header\'))\n\nrun = response.parse()  # get the object that `runs.run()` would have returned\nprint(run.result_json)\n```\n\nThese methods return an [`APIResponse`](https://github.com/indicesio/indices-python/tree/main/src/indices/_response.py) object.\n\nThe async client returns an [`AsyncAPIResponse`](https://github.com/indicesio/indices-python/tree/main/src/indices/_response.py) with the same structure, the only difference being `await`able methods for reading the response content.\n\n#### `.with_streaming_response`\n\nThe above interface eagerly reads the full response body when you make the request, which may not always be what you want.\n\nTo stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter_bytes()`, `.iter_text()`, `.iter_lines()` or `.parse()`. In the async client, these are async methods.\n\n```python\nwith client.runs.with_streaming_response.run(\n    connector_id="conn_8kPq2mWxYz1aBcDeFgHi3J",\n    arguments={\n        "...": None\n    },\n) as response :\n    print(response.headers.get(\'X-My-Header\'))\n\n    for line in response.iter_lines():\n      print(line)\n```\n\nThe context manager is required so that the response will reliably be closed.\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API.\n\nIf you need to access undocumented endpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other\nhttp verbs. Options on the client will be respected (such as retries) when making this request.\n\n```py\nimport httpx\n\nresponse = client.post(\n    "/foo",\n    cast_to=httpx.Response,\n    body={"my_param": True},\n)\n\nprint(response.headers.get("x-foo"))\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you can access the extra fields like `response.unknown_prop`. You\ncan also get all the extra fields on the Pydantic model as a dict with\n[`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_extra).\n\n### Configuring the HTTP client\n\nYou can directly override the [httpx client](https://www.python-httpx.org/api/#client) to customize it for your use case, including:\n\n- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)\n- Custom [transports](https://www.python-httpx.org/advanced/transports/)\n- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality\n\n```python\nimport httpx\nfrom indices import Indices, DefaultHttpxClient\n\nclient = Indices(\n    # Or use the `INDICES_BASE_URL` env var\n    base_url="http://my.test.server.example.com:8083",\n    http_client=DefaultHttpxClient(proxy="http://my.test.proxy.example.com", transport=httpx.HTTPTransport(local_address="0.0.0.0")),\n)\n```\n\nYou can also customize the client on a per-request basis by using `with_options()`:\n\n```python\nclient.with_options(http_client=DefaultHttpxClient(...))\n```\n\n### Managing HTTP resources\n\nBy default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html#object.__del__). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.\n\n```py\nfrom indices import Indices\n\nwith Indices() as client:\n  # make requests here\n  ...\n\n# HTTP client is now closed\n```\n\n## Versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/indicesio/indices-python/issues) with questions, bugs, or suggestions.\n\n### Determining the installed version\n\nIf you\'ve upgraded to the latest version but aren\'t seeing any new features you were expecting then your python environment is likely still using an older version.\n\nYou can determine the version that is being used at runtime with:\n\n```py\nimport indices\nprint(indices.__version__)\n```\n\n## Requirements\n\nPython 3.9 or higher.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# Indices TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/indicesio.svg?label=npm%20(stable))](https://npmjs.org/package/indicesio) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/indicesio)\n\nThis library provides convenient access to the Indices REST API from server-side TypeScript or JavaScript.\n\n\n\nThe REST API documentation can be found on [docs.indices.io](https://docs.indices.io). The full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Indices MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=indicesio-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImluZGljZXNpby1tY3AiXSwiZW52Ijp7IklORElDRVNfQVBJX0tFWSI6Ik15IEFQSSBLZXkifX0)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22indicesio-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22indicesio-mcp%22%5D%2C%22env%22%3A%7B%22INDICES_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install indicesio\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport Indices from 'indicesio';\n\nconst client = new Indices({\n  apiKey: process.env['INDICES_API_KEY'], // This is the default and can be omitted\n});\n\nconst run = await client.runs.run({\n  connector_id: 'conn_8kPq2mWxYz1aBcDeFgHi3J',\n  arguments: { '...': null },\n});\n\nconsole.log(run.result_json);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport Indices from 'indicesio';\n\nconst client = new Indices({\n  apiKey: process.env['INDICES_API_KEY'], // This is the default and can be omitted\n});\n\nconst params: Indices.RunRunParams = {\n  connector_id: 'conn_8kPq2mWxYz1aBcDeFgHi3J',\n  arguments: { '...': null },\n};\nconst run: Indices.Run = await client.runs.run(params);\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst run = await client.runs\n  .run({\n    connector_id: 'conn_8kPq2mWxYz1aBcDeFgHi3J',\n    arguments: { '...': null },\n  })\n  .catch(async (err) => {\n    if (err instanceof Indices.APIError) {\n      console.log(err.status); // 400\n      console.log(err.name); // BadRequestError\n      console.log(err.headers); // {server: 'nginx', ...}\n    } else {\n      throw err;\n    }\n  });\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new Indices({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.runs.run({\n  connector_id: 'conn_8kPq2mWxYz1aBcDeFgHi3J',\n  arguments: { '...': null },\n}, {\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 1 minute by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new Indices({\n  timeout: 20 * 1000, // 20 seconds (default is 1 minute)\n});\n\n// Override per-request:\nawait client.runs.run({\n  connector_id: 'conn_8kPq2mWxYz1aBcDeFgHi3J',\n  arguments: { '...': null },\n}, {\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n## Auto-pagination\n\nList methods in the Indices API are paginated.\nYou can use the `for await … of` syntax to iterate through items across all pages:\n\n```ts\nasync function fetchAllConnectors(params) {\n  const allConnectors = [];\n  // Automatically fetches more pages as needed.\n  for await (const connector of client.connectors.list()) {\n    allConnectors.push(connector);\n  }\n  return allConnectors;\n}\n```\n\nAlternatively, you can request a single page at a time:\n\n```ts\nlet page = await client.connectors.list();\nfor (const connector of page.data) {\n  console.log(connector);\n}\n\n// Convenience methods are provided for manually paginating:\nwhile (page.hasNextPage()) {\n  page = await page.getNextPage();\n  // ...\n}\n```\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new Indices();\n\nconst response = await client.runs\n  .run({\n    connector_id: 'conn_8kPq2mWxYz1aBcDeFgHi3J',\n    arguments: { '...': null },\n  })\n  .asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: run, response: raw } = await client.runs\n  .run({\n    connector_id: 'conn_8kPq2mWxYz1aBcDeFgHi3J',\n    arguments: { '...': null },\n  })\n  .withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(run.result_json);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `INDICES_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport Indices from 'indicesio';\n\nconst client = new Indices({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport Indices from 'indicesio';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new Indices({\n  logger: logger.child({ name: 'Indices' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.runs.run({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport Indices from 'indicesio';\nimport fetch from 'my-fetch';\n\nconst client = new Indices({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport Indices from 'indicesio';\n\nconst client = new Indices({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport Indices from 'indicesio';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new Indices({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport Indices from 'indicesio';\n\nconst client = new Indices({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport Indices from 'npm:indicesio';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new Indices({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/indicesio/indices-typescript/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
