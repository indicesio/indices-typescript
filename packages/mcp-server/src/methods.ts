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
    clientCallName: 'client.tasks.create',
    fullyQualifiedName: 'tasks.create',
    httpMethod: 'post',
    httpPath: '/v1beta/tasks',
  },
  {
    clientCallName: 'client.tasks.retrieve',
    fullyQualifiedName: 'tasks.retrieve',
    httpMethod: 'get',
    httpPath: '/v1beta/tasks/{id}',
  },
  {
    clientCallName: 'client.tasks.list',
    fullyQualifiedName: 'tasks.list',
    httpMethod: 'get',
    httpPath: '/v1beta/tasks',
  },
  {
    clientCallName: 'client.tasks.delete',
    fullyQualifiedName: 'tasks.delete',
    httpMethod: 'delete',
    httpPath: '/v1beta/tasks/{id}',
  },
  {
    clientCallName: 'client.runs.retrieve',
    fullyQualifiedName: 'runs.retrieve',
    httpMethod: 'get',
    httpPath: '/v1beta/runs/{run_id}',
  },
  {
    clientCallName: 'client.runs.list',
    fullyQualifiedName: 'runs.list',
    httpMethod: 'get',
    httpPath: '/v1beta/runs',
  },
  {
    clientCallName: 'client.runs.logs',
    fullyQualifiedName: 'runs.logs',
    httpMethod: 'get',
    httpPath: '/v1beta/runs/{run_id}/logs',
  },
  {
    clientCallName: 'client.runs.run',
    fullyQualifiedName: 'runs.run',
    httpMethod: 'post',
    httpPath: '/v1beta/runs',
  },
  {
    clientCallName: 'client.secrets.create',
    fullyQualifiedName: 'secrets.create',
    httpMethod: 'post',
    httpPath: '/v1beta/secrets',
  },
  {
    clientCallName: 'client.secrets.list',
    fullyQualifiedName: 'secrets.list',
    httpMethod: 'get',
    httpPath: '/v1beta/secrets',
  },
  {
    clientCallName: 'client.secrets.delete',
    fullyQualifiedName: 'secrets.delete',
    httpMethod: 'delete',
    httpPath: '/v1beta/secrets/{id}',
  },
  {
    clientCallName: 'client.secrets.getTotp',
    fullyQualifiedName: 'secrets.getTotp',
    httpMethod: 'post',
    httpPath: '/v1beta/secrets/{id}/totp',
  },
  {
    clientCallName: 'client.files.retrieve',
    fullyQualifiedName: 'files.retrieve',
    httpMethod: 'get',
    httpPath: '/v1beta/files/{file_id}',
  },
  {
    clientCallName: 'client.files.list',
    fullyQualifiedName: 'files.list',
    httpMethod: 'get',
    httpPath: '/v1beta/files',
  },
  {
    clientCallName: 'client.files.delete',
    fullyQualifiedName: 'files.delete',
    httpMethod: 'delete',
    httpPath: '/v1beta/files/{file_id}',
  },
  {
    clientCallName: 'client.files.download',
    fullyQualifiedName: 'files.download',
    httpMethod: 'get',
    httpPath: '/v1beta/files/{file_id}/download',
  },
  {
    clientCallName: 'client.files.getDownloadURL',
    fullyQualifiedName: 'files.getDownloadURL',
    httpMethod: 'get',
    httpPath: '/v1beta/files/{file_id}/download_url',
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
