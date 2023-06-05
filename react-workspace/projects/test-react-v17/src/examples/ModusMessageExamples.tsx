import { ModusMessage } from '@trimble-oss/modus-react-components';

export default function ModusMessageExamples() {
  return (
    <>
      <h3>Message</h3>
      <ModusMessage type="info">Info message.</ModusMessage>
      <ModusMessage type="question">Question message?</ModusMessage>
    </>
  );
}
