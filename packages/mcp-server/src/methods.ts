// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.beta.connectors.retrieve',
    fullyQualifiedName: 'beta.connectors.retrieve',
    httpMethod: 'get',
    httpPath: '/v1beta/connectors/{connector_id}',
  },
  {
    clientCallName: 'client.beta.connectors.list',
    fullyQualifiedName: 'beta.connectors.list',
    httpMethod: 'get',
    httpPath: '/v1beta/connectors',
  },
  {
    clientCallName: 'client.beta.connectors.delete',
    fullyQualifiedName: 'beta.connectors.delete',
    httpMethod: 'delete',
    httpPath: '/v1beta/connectors/{connector_id}',
  },
  {
    clientCallName: 'client.beta.connectors.listRevisions',
    fullyQualifiedName: 'beta.connectors.listRevisions',
    httpMethod: 'get',
    httpPath: '/v1beta/connectors/{connector_id}/revisions',
  },
  {
    clientCallName: 'client.beta.runs.retrieve',
    fullyQualifiedName: 'beta.runs.retrieve',
    httpMethod: 'get',
    httpPath: '/v1beta/runs/{run_id}',
  },
  {
    clientCallName: 'client.beta.runs.list',
    fullyQualifiedName: 'beta.runs.list',
    httpMethod: 'get',
    httpPath: '/v1beta/runs',
  },
  {
    clientCallName: 'client.beta.runs.logs',
    fullyQualifiedName: 'beta.runs.logs',
    httpMethod: 'get',
    httpPath: '/v1beta/runs/{run_id}/logs',
  },
  {
    clientCallName: 'client.beta.runs.run',
    fullyQualifiedName: 'beta.runs.run',
    httpMethod: 'post',
    httpPath: '/v1beta/runs',
  },
  {
    clientCallName: 'client.beta.secrets.create',
    fullyQualifiedName: 'beta.secrets.create',
    httpMethod: 'post',
    httpPath: '/v1beta/secrets',
  },
  {
    clientCallName: 'client.beta.secrets.list',
    fullyQualifiedName: 'beta.secrets.list',
    httpMethod: 'get',
    httpPath: '/v1beta/secrets',
  },
  {
    clientCallName: 'client.beta.secrets.delete',
    fullyQualifiedName: 'beta.secrets.delete',
    httpMethod: 'delete',
    httpPath: '/v1beta/secrets/{id}',
  },
  {
    clientCallName: 'client.beta.secrets.getTotp',
    fullyQualifiedName: 'beta.secrets.getTotp',
    httpMethod: 'post',
    httpPath: '/v1beta/secrets/{id}/totp',
  },
  {
    clientCallName: 'client.beta.files.create',
    fullyQualifiedName: 'beta.files.create',
    httpMethod: 'post',
    httpPath: '/v1beta/files',
  },
  {
    clientCallName: 'client.beta.files.retrieve',
    fullyQualifiedName: 'beta.files.retrieve',
    httpMethod: 'get',
    httpPath: '/v1beta/files/{file_id}',
  },
  {
    clientCallName: 'client.beta.files.list',
    fullyQualifiedName: 'beta.files.list',
    httpMethod: 'get',
    httpPath: '/v1beta/files',
  },
  {
    clientCallName: 'client.beta.files.delete',
    fullyQualifiedName: 'beta.files.delete',
    httpMethod: 'delete',
    httpPath: '/v1beta/files/{file_id}',
  },
  {
    clientCallName: 'client.beta.files.download',
    fullyQualifiedName: 'beta.files.download',
    httpMethod: 'get',
    httpPath: '/v1beta/files/{file_id}/download',
  },
  {
    clientCallName: 'client.beta.files.finalize',
    fullyQualifiedName: 'beta.files.finalize',
    httpMethod: 'post',
    httpPath: '/v1beta/files/{file_id}/complete',
  },
  {
    clientCallName: 'client.beta.files.getDownloadURL',
    fullyQualifiedName: 'beta.files.getDownloadURL',
    httpMethod: 'get',
    httpPath: '/v1beta/files/{file_id}/download_url',
  },
  {
    clientCallName: 'client.beta.captureSessions.create',
    fullyQualifiedName: 'beta.captureSessions.create',
    httpMethod: 'post',
    httpPath: '/v1beta/capture_sessions',
  },
  {
    clientCallName: 'client.beta.captureSessions.retrieve',
    fullyQualifiedName: 'beta.captureSessions.retrieve',
    httpMethod: 'get',
    httpPath: '/v1beta/capture_sessions/{id}',
  },
  {
    clientCallName: 'client.beta.captureSessions.list',
    fullyQualifiedName: 'beta.captureSessions.list',
    httpMethod: 'get',
    httpPath: '/v1beta/capture_sessions',
  },
  {
    clientCallName: 'client.beta.captureSessions.abandon',
    fullyQualifiedName: 'beta.captureSessions.abandon',
    httpMethod: 'post',
    httpPath: '/v1beta/capture_sessions/{id}/abandon',
  },
  {
    clientCallName: 'client.beta.captureSessions.complete',
    fullyQualifiedName: 'beta.captureSessions.complete',
    httpMethod: 'post',
    httpPath: '/v1beta/capture_sessions/{id}/complete',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
