// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
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
   * <p>List your files: uploads and run outputs. Default order is newest first.</p>
   */
  list(
    query: FileListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<FilesCursorPage, File> {
    return this._client.getAPIList('/v1beta/files', CursorPage<File>, { query, ...options });
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

export type FilesCursorPage = CursorPage<File>;

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
   * ID of the run that produced this file. Null for uploaded files.
   */
  run_id: string | null;

  /**
   * Size of the file in bytes.
   */
  size_bytes: number;

  /**
   * How the file came to exist: uploaded by the user or produced by a run.
   */
  source: 'UPLOAD' | 'RUN_OUTPUT' | 'GENERATION';

  /**
   * ID of the task whose run produced this file. Null for uploaded files.
   */
  task_id: string | null;
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

export interface FileListParams extends CursorPageParams {
  /**
   * Only files whose name contains this text.
   */
  filename?: string;

  /**
   * Sort direction.
   */
  order?: 'asc' | 'desc';

  /**
   * Only files produced by this run.
   */
  run_id?: string;

  /**
   * Column to sort by: name, created_at, size_bytes, or source.
   */
  sort?: 'name' | 'created_at' | 'size_bytes' | 'source';

  /**
   * Only files from this source.
   */
  source?: 'UPLOAD' | 'RUN_OUTPUT' | 'GENERATION';

  /**
   * Only files produced by runs of this task.
   */
  task_id?: string;
}

export declare namespace Files {
  export {
    type File as File,
    type FileDeleteResponse as FileDeleteResponse,
    type FileGetDownloadURLResponse as FileGetDownloadURLResponse,
    type FilesCursorPage as FilesCursorPage,
    type FileListParams as FileListParams,
  };
}
