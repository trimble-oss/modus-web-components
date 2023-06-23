import { ModusButton, ModusCard } from '@trimble-oss/modus-react-components';

export default function ModusCardExamples() {
  return (
    <>
      <h3>Card</h3>
      <ModusCard>
        <div style={{ padding: '10px' }}>
          <h4 id="card-title">Card title</h4>
          <h5 id="card-subtitle">Card subtitle</h5>
          <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <ModusButton color="primary">Go somewhere</ModusButton>
        </div>
      </ModusCard>
    </>
  );
}
