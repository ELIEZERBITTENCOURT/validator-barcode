import { getTypeIcon } from '../utils/barcodeParser';
import './BarcodeResult.css';

// Generates a deterministic barcode visual strip from code string
function BarcodeVisual({ code }) {
  const bars = [];
  const seed = code || 'placeholder';
  for (let i = 0; i < 60; i++) {
    const charCode = seed.charCodeAt(i % seed.length);
    const width = (charCode % 3) + 1.5;
    const height = 30 + (charCode % 3) * 5;
    bars.push({ width, height, dark: (charCode + i) % 3 !== 0 });
  }

  return (
    <div className="result__barcode-visual" aria-hidden="true">
      {bars.map((bar, i) => (
        <div
          key={i}
          className="result__bar"
          style={{
            width: `${bar.width}px`,
            height: `${bar.height}px`,
            opacity: bar.dark ? 1 : 0.15,
          }}
        />
      ))}
    </div>
  );
}

function EmptyState() {
  const heights = [20, 35, 50, 30, 60, 25, 45, 40, 55, 35, 28, 48];
  return (
    <div className="result__empty">
      <div className="result__empty-visual" aria-hidden="true">
        {heights.map((h, i) => (
          <span key={i} style={{ height: `${h}px` }} />
        ))}
      </div>
      <p className="result__empty-text">Aguardando código de barras</p>
      <p className="result__empty-sub">
        Insira o código acima e pressione Decodificar ou Enter
      </p>
    </div>
  );
}

export default function BarcodeResult({ result }) {
  if (!result) return <EmptyState />;

  const { codigo, tipo, comprimento, valido, detalhes } = result;
  const icon = getTypeIcon(tipo);

  return (
    <section className="result">
      {/* Header */}
      <div className="result__header">
        <div className="result__type-block">
          <span className="result__icon" role="img" aria-label={tipo}>{icon}</span>
          <div className="result__type-info">
            <div className="result__type-name">{tipo}</div>
            <div className="result__type-sub">
              {comprimento} {comprimento === 1 ? 'caractere' : 'caracteres'}
            </div>
          </div>
        </div>

        <div className="result__badges">
          <span className={`result__badge result__badge--${valido ? 'valid' : 'invalid'}`}>
            {valido ? '✓ Checksum válido' : '✗ Checksum inválido'}
          </span>
          <span className="result__badge result__badge--neutral">
            {tipo}
          </span>
        </div>
      </div>

      {/* Raw code display */}
      <div className="result__code-section">
        <div className="result__code-label">Código bruto</div>
        <div className="result__code-value">{codigo}</div>
        <BarcodeVisual code={codigo} />
      </div>

      {/* Details grid */}
      {Object.keys(detalhes).length > 0 && (
        <>
          <div className="result__details-title">Informações decodificadas</div>
          <div className="result__grid">
            {Object.entries(detalhes).map(([key, value]) => (
              <div key={key} className="result__detail-card">
                <div className="result__detail-key">{key}</div>
                <div className="result__detail-value">{String(value)}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}