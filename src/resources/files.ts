// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Files extends APIResource {
  /**
   * <p>Retrieve a file's metadata by its ID.</p>
   */
  retrieve(fileID: string, options?: RequestOptions): APIPromise<File> {
    return this._client.get(path`/v1beta/files/${fileID}`, options);
  }

  /**
   * <p>List the files produced by a run.</p>
   */
  list(query: FileListParams, options?: RequestOptions): APIPromise<FileListResponse> {
    return this._client.get('/v1beta/files', { query, ...options });
  }

  /**
   * <p>Delete a file and its stored bytes.</p>
   */
  delete(fileID: string, options?: RequestOptions): APIPromise<FileDeleteResponse> {
    return this._client.delete(path`/v1beta/files/${fileID}`, options);
  }

  /**
   * <p>Redirect to a short-lived signed URL that serves the file bytes.</p>
   */
  download(fileID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.get(path`/v1beta/files/${fileID}/download`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * <p>Get a short-lived signed URL to download the file bytes directly from storage.</p>
   */
  getDownloadURL(fileID: string, options?: RequestOptions): APIPromise<FileGetDownloadURLResponse> {
    return this._client.get(path`/v1beta/files/${fileID}/download_url`, options);
  }
}

export interface File {
  /**
   * Unique identifier for the object.
   */
  id: string;

  /**
   * MIME type of the file.
   */
  content_type: string;

  /**
   * Base64-encoded CRC32C checksum of the file content.
   */
  crc32c: string;

  /**
   * Timestamp when the file was created.
   */
  created_at: string;

  /**
   * User-facing filename.
   */
  name: string;

  /**
   * ID of the run that produced this file.
   */
  run_id: string;

  /**
   * Size of the file in bytes.
   */
  size_bytes: number;
}

export interface FileListResponse {
  /**
   * Files for the requested page, ordered newest first.
   */
  data: Array<File>;

  /**
   * Whether more files exist after this page.
   */
  has_more: boolean;

  /**
   * Pass as the `cursor` query parameter to fetch the next page. Null when has_more
   * is false.
   */
  next_cursor: string | null;
}

export interface FileDeleteResponse {
  /**
   * ID of the deleted file.
   */
  id: string;

  /**
   * Always true when the file was deleted.
   */
  deleted: boolean;
}

export interface FileGetDownloadURLResponse {
  /**
   * When the download URL stops being valid.
   */
  expires_at: string;

  /**
   * Short-lived signed URL to download the file bytes directly from storage.
   */
  url: string;
}

export interface FileListParams {
  /**
   * The ID of the run whose files to list.
   */
  run_id: string;

  /**
   * Cursor from a previous response's `next_cursor`, to fetch the next page.
   */
  cursor?: string | null;

  /**
   * Maximum number of files to return.
   */
  limit?: number;
}

export declare namespace Files {
  export {
    type File as File,
    type FileListResponse as FileListResponse,
    type FileDeleteResponse as FileDeleteResponse,
    type FileGetDownloadURLResponse as FileGetDownloadURLResponse,
    type FileListParams as FileListParams,
  };
}
