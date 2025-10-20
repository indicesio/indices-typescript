// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Indices } from '../client';

export abstract class APIResource {
  protected _client: Indices;

  constructor(client: Indices) {
    this._client = client;
  }
}
