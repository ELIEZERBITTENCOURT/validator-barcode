import { useState, useCallback, useRef } from 'react';
import { parseBarcode } from '../utils/barcodeParser';

export function useBarcode() {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);

  const processBarcode = useCallback((code) => {
    const clean = code.trim().replace(/\s+/g, '');
    if (!clean) {
      setError('Digite ou cole um código de barras.');
      setResult(null);
      return;
    }
    if (clean.length < 6) {
      setError('Código muito curto. Mínimo de 6 caracteres.');
      setResult(null);
      return;
    }

    setIsProcessing(true);
    setError(null);

    // Simulate small processing delay for UX feedback
    setTimeout(() => {
      try {
        const parsed = parseBarcode(clean);
        setResult(parsed);
        setHistory((prev) => {
          const alreadyIn = prev.find((h) => h.codigo === parsed.codigo);
          if (alreadyIn) return prev;
          return [parsed, ...prev].slice(0, 10);
        });
      } catch (e) {
        setError('Erro ao processar o código. Verifique e tente novamente.');
        setResult(null);
      } finally {
        setIsProcessing(false);
      }
    }, 300);
  }, []);

  const handleSubmit = useCallback(() => {
    processBarcode(inputValue);
  }, [inputValue, processBarcode]);

  const handleClear = useCallback(() => {
    setInputValue('');
    setResult(null);
    setError(null);
    inputRef.current?.focus();
  }, []);

  const handleHistorySelect = useCallback((item) => {
    setInputValue(item.codigo);
    setResult(item);
    setError(null);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') handleSubmit();
  }, [handleSubmit]);

  return {
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
  };
}