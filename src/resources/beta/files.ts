// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Files extends APIResource {
  /**
   * <p>Create a pending file and get a signed URL to PUT the bytes to.</p>
   */
  create(body: FileCreateParams, options?: RequestOptions): APIPromise<FileCreateResponse> {
    return this._client.post('/v1beta/files', { body, ...options });
  }

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
   * <p>Confirm the bytes were uploaded; the file becomes available for use.</p>
   */
  finalize(fileID: string, options?: RequestOptions): APIPromise<FileFinalizeResponse> {
    return this._client.post(path`/v1beta/files/${fileID}/complete`, options);
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
  source: 'UPLOAD' | 'RUN_OUTPUT';

  /**
   * ID of the task whose run produced this file. Null for uploaded files.
   */
  task_id: string | null;
}

export interface FileCreateResponse {
  /**
   * When the upload URL stops being valid.
   */
  expires_at: string;

  /**
   * Server-assigned ID of the pending file.
   */
  file_id: string;

  /**
   * Headers that must be sent verbatim with the PUT; they are covered by the URL
   * signature.
   */
  upload_headers: { [key: string]: string };

  /**
   * Signed URL the sandbox must PUT the file bytes to.
   */
  upload_url: string;
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

export interface FileFinalizeResponse {
  /**
   * MIME type of the stored file.
   */
  content_type: string;

  /**
   * Base64-encoded CRC32C checksum reported by storage.
   */
  crc32c: string;

  /**
   * ID of the finalized file.
   */
  file_id: string;

  /**
   * User-facing filename.
   */
  name: string;

  /**
   * Size of the stored file in bytes, as reported by storage.
   */
  size_bytes: number;
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

export interface FileCreateParams {
  /**
   * MIME type of the file content.
   */
  content_type: string;

  /**
   * User-facing filename, e.g. 'report.pdf'.
   */
  name: string;

  /**
   * Exact size of the file in bytes. Enforced by the signed upload URL.
   */
  size_bytes: number;
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
  source?: 'UPLOAD' | 'RUN_OUTPUT';

  /**
   * Only files produced by runs of this task.
   */
  task_id?: string;
}

export declare namespace Files {
  export {
    type File as File,
    type FileCreateResponse as FileCreateResponse,
    type FileDeleteResponse as FileDeleteResponse,
    type FileFinalizeResponse as FileFinalizeResponse,
    type FileGetDownloadURLResponse as FileGetDownloadURLResponse,
    type FilesCursorPage as FilesCursorPage,
    type FileCreateParams as FileCreateParams,
    type FileListParams as FileListParams,
  };
}
