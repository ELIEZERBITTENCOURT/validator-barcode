import { useEffect } from 'react';
import { useBarcode } from './hooks/useBarcode';
import Header from './components/Header';
import BarcodeInput from './components/BarcodeInput';
import BarcodeResult from './components/BarcodeResult';
import History from './components/History';
import './App.css';

export default function App() {
  const {
    inputValue,
    setInputValue,
    result,
    error,
    isProcessing,
    history,
    inputRef,
    handleSubmit,
    handleClear,
    handleHistorySelect,
    handleKeyDown,
    processBarcode,
  } = useBarcode();

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleExampleSelect = (code) => {
    setInputValue(code);
    processBarcode(code);
  };

  return (
    <div className="app">
      <Header />

      <div className="app__main">
        <BarcodeInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSubmit={handleSubmit}
          onClear={handleClear}
          onKeyDown={handleKeyDown}
          onExampleSelect={handleExampleSelect}
          inputRef={inputRef}
          error={error}
          isProcessing={isProcessing}
        />

        <div className="app__divider" data-label="resultado" />

        <BarcodeResult result={result} />
      </div>

      <History history={history} onSelect={handleHistorySelect} />
    </div>
  );
}