import { ModusFileDropzone } from '@trimble-oss/modus-react-components';

export default function ModusFileDropzoneExamples() {
  return (
    <>
      <h3>File upload dropzone</h3>
      <ModusFileDropzone
        ariaLabel="dropzone"
        description="File dropzone description"
        dropzone-Height="175px"
        dropzone-Width="400px"
        label="Dropzone Label"
        multiple={true}
        onFiles={(event) => {
          const [files] = event.detail;
          alert(`Files Upload: ${files.map((f) => f.name).toString()}`);
        }}></ModusFileDropzone>
    </>
  );
}
