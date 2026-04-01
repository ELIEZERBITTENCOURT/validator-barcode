import { getTypeIcon } from '../utils/barcodeParser';
import './History.css';

export default function History({ history, onSelect }) {
  return (
    <aside className="history">
      <div className="history__title">Histórico recente</div>
      {history.length === 0 ? (
        <p className="history__empty">Nenhum código decodificado ainda.</p>
      ) : (
        <div className="history__list">
          {history.map((item) => (
            <button
              key={item.codigo}
              className="history__item"
              onClick={() => onSelect(item)}
              title={`${item.tipo}: ${item.codigo}`}
            >
              <span className="history__item-icon">{getTypeIcon(item.tipo)}</span>
              <span className="history__item-text">{item.codigo}</span>
              <span className="history__item-type">{item.tipo}</span>
            </button>
          ))}
        </div>
      )}
    </aside>
  );
}