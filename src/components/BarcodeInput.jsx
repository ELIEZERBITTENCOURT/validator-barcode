import './BarcodeInput.css';

export default function BarcodeInput({
  inputValue,
  setInputValue,
  onSubmit,
  onClear,
  onKeyDown,
  onExampleSelect,
  inputRef,
  error,
  isProcessing,
}) {
  return (
    <section className="barcode-input">
      <label className="barcode-input__label" htmlFor="barcode-field">
        <span>›</span> Insira o código de barras
      </label>

      <div className="barcode-input__row">
        <input
          id="barcode-field"
          ref={inputRef}
          className={`barcode-input__field${error ? ' has-error' : ''}`}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Ex: 7891234567892 ou cole o código aqui..."
          autoComplete="off"
          spellCheck={false}
          disabled={isProcessing}
        />
        <button
          className="barcode-input__btn"
          onClick={onSubmit}
          disabled={isProcessing || !inputValue.trim()}
        >
          Decodificar
        </button>
        {inputValue && (
          <button
            className="barcode-input__btn barcode-input__btn--clear"
            onClick={onClear}
            disabled={isProcessing}
            title="Limpar"
          >
            ✕
          </button>
        )}
      </div>

      {error && (
        <div className="barcode-input__error">
          <span>⚠</span> {error}
        </div>
      )}

      {isProcessing && (
        <div className="barcode-input__processing">
          <div className="barcode-input__spinner" />
          Processando código...
        </div>
      )}

    </section>
  );
}