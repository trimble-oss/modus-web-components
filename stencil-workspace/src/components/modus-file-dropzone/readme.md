# modus-file-dropzone



<!-- Auto Generated Below -->


## Properties

| Property                | Attribute                   | Description                                                  | Type      | Default     |
| ----------------------- | --------------------------- | ------------------------------------------------------------ | --------- | ----------- |
| `acceptFileTypes`       | `accept-file-types`         | (optional) The dropzone's accepted file types                | `string`  | `undefined` |
| `ariaLabel`             | `aria-label`                | (optional) The dropzone's aria-label.                        | `string`  | `undefined` |
| `description`           | `description`               | (optional) The dropzone's description text.                  | `string`  | `undefined` |
| `dropzoneHeight`        | `dropzone-height`           | (optional) The dropzone's height.                            | `string`  | `undefined` |
| `dropzoneWidth`         | `dropzone-width`            | (optional) The dropzone's width.                             | `string`  | `undefined` |
| `includeStateIcon`      | `include-state-icon`        | (optional) Whether to include the upload icon.               | `boolean` | `true`      |
| `label`                 | `label`                     | (optional) The dropzone's label text.                        | `string`  | `undefined` |
| `maxFileCount`          | `max-file-count`            | (optional) The dropzone's max file count.                    | `number`  | `undefined` |
| `maxFileNameLength`     | `max-file-name-length`      | (optional) The dropzone's max file name length of each file. | `number`  | `undefined` |
| `maxTotalFileSizeBytes` | `max-total-file-size-bytes` | (optional) The dropzone's max total file size.               | `number`  | `undefined` |
| `multiple`              | `multiple`                  | (optional) Whether multiple files can be uploaded.           | `boolean` | `true`      |


## Events

| Event   | Description                                                                                     | Type                            |
| ------- | ----------------------------------------------------------------------------------------------- | ------------------------------- |
| `files` | An event that fires when files have been added or removed, regardless of whether they're valid. | `CustomEvent<[File[], string]>` |


## Methods

### `addFile(file: File) => Promise<void>`

Add a file to the dropzone.

#### Parameters

| Name   | Type   | Description |
| ------ | ------ | ----------- |
| `file` | `File` |             |

#### Returns

Type: `Promise<void>`



### `getError() => Promise<string | null>`

Get the dropzone's error.

#### Returns

Type: `Promise<string>`



### `getFiles() => Promise<File[]>`

Get the dropzone's files.

#### Returns

Type: `Promise<File[]>`



### `removeFile(fileName: string) => Promise<void>`

Remove a file from the dropzone.

#### Parameters

| Name       | Type     | Description |
| ---------- | -------- | ----------- |
| `fileName` | `string` |             |

#### Returns

Type: `Promise<void>`




----------------------------------------------


