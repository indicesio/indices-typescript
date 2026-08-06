// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * Record a browser session; a completed capture is a reusable input for task generation.
 */
export class CaptureSessions extends APIResource {
  /**
   * <p>Spawn a browser session that records the network traffic of everything done in it.</p><p>Once completed, the capture session is a reusable recording: attach it to a task to generate an API from it.</p>
   */
  create(
    body: CaptureSessionCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CaptureSession> {
    return this._client.post('/v1beta/capture_sessions', { body, ...options });
  }

  /**
   * <p>Retrieve a capture session by its ID.</p><p>Poll this after requesting completion: the session is a usable recording once <code>state</code> is <code>completed</code>.</p>
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<CaptureSession> {
    return this._client.get(path`/v1beta/capture_sessions/${id}`, options);
  }

  /**
   * <p>List all capture sessions, newest first.</p>
   */
  list(options?: RequestOptions): APIPromise<CaptureSessionListResponse> {
    return this._client.get('/v1beta/capture_sessions', options);
  }

  /**
   * <p>Discard an in-progress capture session and release its browser.</p>
   */
  abandon(id: string, options?: RequestOptions): APIPromise<CaptureSession> {
    return this._client.post(path`/v1beta/capture_sessions/${id}/abandon`, options);
  }

  /**
   * <p>Stop recording and finalize the capture session.</p><p>Completion is asynchronous: the browser uploads its recording and the session then transitions to <code>completed</code>. Poll <code>retrieveCaptureSession</code> to observe the transition.</p>
   */
  complete(id: string, options?: RequestOptions): APIPromise<CaptureSession> {
    return this._client.post(path`/v1beta/capture_sessions/${id}/complete`, options);
  }
}

export interface CaptureSession {
  /**
   * Unique identifier for the capture session.
   */
  id: string;

  /**
   * Opaque identifier for the spawned browser session. Null once the browser is
   * gone.
   */
  browser_session_id: string | null;

  /**
   * Timestamp when the object was created.
   */
  created_at: string;

  /**
   * URL to embed in an iframe to control the browser. Only usable while the session
   * is active.
   */
  iframe_url: string | null;

  /**
   * Current state of the capture session. A session records while active, is
   * completing once completion is requested, and becomes a reusable recording once
   * completed.
   */
  state: CaptureSessionState;

  /**
   * Timestamp when the object was last updated.
   */
  updated_at: string;
}

export type CaptureSessionState = 'active' | 'completing' | 'completed' | 'abandoned' | 'failed';

/**
 * A cookie to set in the browser session.
 */
export interface SessionCookie {
  /**
   * The name of the cookie.
   */
  name: string;

  /**
   * The value of the cookie.
   */
  value: string;

  /**
   * The domain of the cookie.
   */
  domain?: string | null;

  /**
   * Whether the cookie is HTTP only.
   */
  http_only?: boolean | null;

  /**
   * The path of the cookie.
   */
  path?: string | null;

  /**
   * Whether the cookie is secure.
   */
  secure?: boolean | null;
}

export type CaptureSessionListResponse = Array<CaptureSession>;

export interface CaptureSessionCreateParams {
  /**
   * Initial cookies to set in the browser session.
   */
  cookies?: Array<SessionCookie>;

  /**
   * If true, spawn the browser session using a proxy.
   */
  use_proxy?: boolean;
}

export declare namespace CaptureSessions {
  export {
    type CaptureSession as CaptureSession,
    type CaptureSessionState as CaptureSessionState,
    type SessionCookie as SessionCookie,
    type CaptureSessionListResponse as CaptureSessionListResponse,
    type CaptureSessionCreateParams as CaptureSessionCreateParams,
  };
}
