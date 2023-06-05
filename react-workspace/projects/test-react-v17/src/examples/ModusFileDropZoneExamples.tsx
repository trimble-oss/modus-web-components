import { ModusFileDropzone } from '@trimble-oss/modus-react-components';

export default function ModusFileDropzoneExamples() {
  return (
    <>
      <h3>File upload dropzone</h3>
      <ModusFileDropzone
        aria-Label="dropzone"
        description="File dropzone description"
        dropzone-Height="175px"
        dropzone-Width="400px"
        label="Dropzone Label"
        multiple={true}
        onFiles={(event) => {
          const [files, error] = event.detail;
          alert(`Files Uplaod: ${files.map((f) => f.name).toString()}`);
        }}></ModusFileDropzone>
    </>
  );
}
