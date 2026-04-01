function normalize(code) {
  return (code || '').replace(/\s/g, '');
}

/**
 * Detects the barcode type based on length and pattern
 */
export function detectBarcodeType(code) {
  const clean = normalize(code);

  if (/^\d{8}$/.test(clean)) return 'EAN-8';
  if (/^\d{13}$/.test(clean)) return 'EAN-13';
  if (/^\d{12}$/.test(clean)) return 'UPC-A';
  if (/^\d{6}$/.test(clean)) return 'UPC-E';
  if (/^\d{14}$/.test(clean)) return 'ITF-14';
  if (/^\d{47}$/.test(clean) || /^\d{44}$/.test(clean)) return 'BOLETO';
  if (/^\d{48}$/.test(clean)) return 'BOLETO';
  if (/^\d{10}$/.test(clean)) return 'ISBN-10';
  if (/^(978|979)\d{10}$/.test(clean)) return 'ISBN-13';
  if (/^\d{9}[\dX]$/.test(clean)) return 'ISSN';

  if (/^[0-9A-Z\-. *$/+%]{1,}$/.test(clean) && clean.length <= 43) return 'CODE-39';

  if (/^[A-Za-z0-9!"%&'()*+,\-./:;<=>?@[\\\]_`{|}~\s]{1,80}$/.test(clean)) return 'CODE-128';

  return 'DESCONHECIDO';
}

/**
 * ISBN-10 validation
 */
function validateISBN10(code) {
  const clean = normalize(code);

  if (!/^\d{9}[\dX]$/.test(clean)) return false;

  let sum = 0;

  for (let i = 0; i < 10; i++) {
    const value = clean[i] === 'X' ? 10 : Number(clean[i]);
    sum += value * (i + 1);
  }

  return sum % 11 === 0;
}

/**
 * Validates common barcode check digits
 */
export function validateCheckDigit(code, type) {
  const clean = normalize(code);

  if (!/^\d+$/.test(clean)) {
    if (type === 'ISBN-10') return validateISBN10(clean);
    return null;
  }

  const digits = clean.split('').map(Number);

  if (type === 'ISBN-10') {
    return validateISBN10(clean);
  }

  if (type === 'EAN-13' || type === 'EAN-8' || type === 'UPC-A') {
    const len = digits.length;
    const payload = digits.slice(0, len - 1);
    const check = digits[len - 1];

    let sum = 0;

    payload.forEach((d, i) => {
      if (type === 'EAN-8') {
        sum += d * (i % 2 === 0 ? 3 : 1);
      } else {
        sum += d * (i % 2 === 0 ? 1 : 3);
      }
    });

    const calculated = (10 - (sum % 10)) % 10;
    return calculated === check;
  }

  return null;
}

/**
 * Extract GS1 country prefix
 */
export function getCountryFromEAN(code) {
  const clean = normalize(code);

  if (clean.length < 3) return 'Desconhecido';

  const prefix = parseInt(clean.substring(0, 3), 10);
  if (isNaN(prefix)) return 'Desconhecido';

  if (prefix >= 0 && prefix <= 19) return 'Estados Unidos / Canadá';
  if (prefix >= 30 && prefix <= 39) return 'Estados Unidos';
  if (prefix >= 60 && prefix <= 139) return 'Estados Unidos / Canadá';
  if (prefix >= 300 && prefix <= 379) return 'França';
  if (prefix >= 400 && prefix <= 440) return 'Alemanha';
  if ((prefix >= 450 && prefix <= 459) || (prefix >= 490 && prefix <= 499)) return 'Japão';
  if (prefix >= 500 && prefix <= 509) return 'Reino Unido';
  if (prefix >= 520 && prefix <= 521) return 'Grécia';
  if (prefix >= 540 && prefix <= 549) return 'Bélgica / Luxemburgo';
  if (prefix === 560) return 'Portugal';
  if (prefix === 569) return 'Islândia';
  if (prefix >= 570 && prefix <= 579) return 'Dinamarca';
  if (prefix === 590) return 'Polônia';
  if (prefix >= 600 && prefix <= 601) return 'África do Sul';
  if (prefix >= 690 && prefix <= 699) return 'China';
  if (prefix >= 700 && prefix <= 709) return 'Noruega';
  if (prefix === 729) return 'Israel';
  if (prefix >= 730 && prefix <= 739) return 'Suécia';

  if (prefix >= 740 && prefix <= 746) {
    const map = {
      740: 'Guatemala',
      741: 'El Salvador',
      742: 'Honduras',
      743: 'Nicarágua',
      744: 'Costa Rica',
      746: 'República Dominicana',
    };
    return map[prefix] || 'América Central';
  }

  if (prefix === 750) return 'México';
  if (prefix >= 754 && prefix <= 755) return 'Canadá';
  if (prefix === 759) return 'Venezuela';
  if (prefix >= 770 && prefix <= 771) return 'Colômbia';
  if (prefix === 773) return 'Uruguai';
  if (prefix === 775) return 'Peru';
  if (prefix === 777) return 'Bolívia';
  if (prefix >= 778 && prefix <= 779) return 'Argentina';
  if (prefix === 780) return 'Chile';
  if (prefix === 784) return 'Paraguai';
  if (prefix === 786) return 'Equador';
  if (prefix >= 789 && prefix <= 790) return 'Brasil';

  if (prefix >= 800 && prefix <= 839) return 'Itália';
  if (prefix >= 840 && prefix <= 849) return 'Espanha';
  if (prefix === 850) return 'Cuba';
  if (prefix === 858) return 'Eslováquia';
  if (prefix === 859) return 'República Tcheca';
  if (prefix === 860) return 'Sérvia';
  if (prefix === 865) return 'Mongólia';
  if (prefix === 867) return 'Coreia do Norte';
  if (prefix >= 868 && prefix <= 869) return 'Turquia';
  if (prefix >= 870 && prefix <= 879) return 'Países Baixos';
  if (prefix >= 880 && prefix <= 881) return 'Coreia do Sul';
  if (prefix === 885) return 'Tailândia';
  if (prefix === 888) return 'Singapura';
  if (prefix === 890) return 'Índia';
  if (prefix === 893) return 'Vietnã';
  if (prefix === 896) return 'Paquistão';
  if (prefix === 899) return 'Indonésia';
  if (prefix >= 900 && prefix <= 919) return 'Áustria';
  if (prefix >= 930 && prefix <= 939) return 'Austrália';
  if (prefix >= 940 && prefix <= 949) return 'Nova Zelândia';
  if (prefix === 955) return 'Malásia';
  if (prefix === 958) return 'Macau';

  return 'Desconhecido';
}

/**
 * Parses boleto bancário
 */
export function parseBoleto(code) {
  const clean = normalize(code);
  if (clean.length < 44) return null;

  const isConcessionaria = clean.startsWith('8');

  if (isConcessionaria) {
    const valorRaw = clean.slice(4, 15);

    return {
      tipo: 'Boleto de Concessionária / Tributo',
      produto: parseInt(clean[1], 10),
      valorReal: /^\d+$/.test(valorRaw) ? parseInt(valorRaw, 10) / 100 : null,
      vencimento: formatBoletoDate(clean.slice(19, 27)),
    };
  }

  const banco = clean.substring(0, 3);
  const moeda = clean[3];
  const vencimento = clean.substring(5, 9);
  const valorStr = clean.substring(9, 19);

  const valor = /^\d+$/.test(valorStr)
    ? parseInt(valorStr, 10) / 100
    : null;

  const bancos = {
    '001': 'Banco do Brasil', '033': 'Santander', '104': 'Caixa Econômica Federal',
    '237': 'Bradesco', '341': 'Itaú', '399': 'HSBC', '422': 'Safra',
    '745': 'Citibank', '756': 'Sicoob', '748': 'Sicredi', '336': 'C6 Bank',
    '077': 'Inter', '260': 'Nu Pagamentos (Nubank)', '290': 'Pagseguro',
    '380': 'PicPay', '323': 'Mercado Pago',
  };

  const days = parseInt(vencimento, 10);
  const vencDate = calcularDataVencimento(days);

  return {
    banco: bancos[banco] || `Banco ${banco}`,
    codigoBanco: banco,
    moeda: moeda === '9' ? 'Real (BRL)' : `Moeda ${moeda}`,
    valor: valor > 0 ? valor : null,
    vencimento: days > 0
      ? vencDate.toLocaleDateString('pt-BR')
      : 'À vista / Sem vencimento',
  };
}

function calcularDataVencimento(fator) {
  const baseDate = new Date(1997, 9, 7);

  if (fator >= 1000) {
    return new Date(baseDate.getTime() + fator * 86400000);
  }

  const novaBase = new Date(2025, 1, 22);
  return new Date(novaBase.getTime() + fator * 86400000);
}

function formatBoletoDate(str) {
  if (!str || str.length < 8) return 'N/A';
  return `${str.slice(6, 8)}/${str.slice(4, 6)}/${str.slice(0, 4)}`;
}

/**
 * Main function: parse any barcode
 */
export function parseBarcode(rawCode) {
  const code = (rawCode || '').trim();

  if (!code) {
    return {
      codigo: '',
      tipo: 'DESCONHECIDO',
      comprimento: 0,
      valido: 'N/A',
      detalhes: { erro: 'Código vazio' },
    };
  }

  const type = detectBarcodeType(code);
  const isValid = validateCheckDigit(code, type);

  const result = {
    codigo: code,
    tipo: type,
    comprimento: code.length,
    valido: isValid === null ? 'N/A' : isValid,
    detalhes: {},
  };

  const checksumLabel =
    isValid === null ? 'N/A' : isValid ? '✓ Válido' : '✗ Inválido';

  switch (type) {
    case 'EAN-13':
    case 'EAN-8': {
      const pais = getCountryFromEAN(code);

      result.detalhes = {
        'País (GS1)': pais,
        'Fabricante': code.substring(3, 8) || 'N/A',
        'Produto': code.substring(type === 'EAN-13' ? 7 : 4, code.length - 1),
        'Dígito Verificador': code[code.length - 1],
        'Checksum': checksumLabel,
      };
      break;
    }

    case 'UPC-A': {
      result.detalhes = {
        'País (GS1)': 'Estados Unidos / Canadá',
        'Sistema': code[0],
        'Fabricante': code.substring(1, 6),
        'Produto': code.substring(6, 11),
        'Dígito Verificador': code[11],
        'Checksum': checksumLabel,
      };
      break;
    }

    case 'ISBN-13':
    case 'ISBN-10': {
      result.detalhes = {
        'Formato': 'Livro (ISBN)',
        'Prefixo GS1': code.substring(0, 3) || 'N/A',
        'Grupo de Idioma': code.substring(3, 4) || code.substring(0, 1),
        'Editora': code.substring(4, 9) || code.substring(1, 5),
        'Título': code.substring(9, 12) || code.substring(5, 9),
        'Dígito Verificador': code[code.length - 1],
      };
      break;
    }

    case 'BOLETO': {
      const boletoInfo = parseBoleto(code);

      if (boletoInfo) {
        result.detalhes = {
          'Tipo': boletoInfo.tipo || 'Boleto Bancário',
          ...(boletoInfo.banco && { 'Banco': boletoInfo.banco }),
          ...(boletoInfo.codigoBanco && { 'Código do Banco': boletoInfo.codigoBanco }),
          ...(boletoInfo.moeda && { 'Moeda': boletoInfo.moeda }),
          ...(boletoInfo.valor != null && {
            'Valor': `R$ ${boletoInfo.valor.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
            })}`,
          }),
          'Vencimento': boletoInfo.vencimento || 'N/A',
        };
      }
      break;
    }

    case 'ITF-14': {
      result.detalhes = {
        'Formato': 'Caixa / Embalagem',
        'GTIN': code.substring(1, 14),
        'Dígito Verificador': code[13],
        'Uso': 'Logística e estoque',
      };
      break;
    }

    case 'CODE-39':
    case 'CODE-128': {
      result.detalhes = {
        'Formato': 'Código Alfanumérico',
        'Conteúdo': code,
        'Uso': 'Logística, indústria, saúde',
        'Caracteres': code.length,
      };
      break;
    }

    default: {
      result.detalhes = {
        'Conteúdo': code,
        'Caracteres': code.length,
        'Observação': 'Formato não reconhecido ou dados insuficientes',
      };
    }
  }

  return result;
}

/**
 * Returns icon name for each barcode type
 */
export function getTypeIcon(type) {
  const icons = {
    'EAN-13': '🛒',
    'EAN-8': '🛒',
    'UPC-A': '🛍️',
    'UPC-E': '🛍️',
    'CODE-39': '📦',
    'CODE-128': '📦',
    'ITF-14': '🏭',
    'BOLETO': '🏦',
    'ISBN-13': '📚',
    'ISBN-10': '📚',
    'ISSN': '📰',
    'DESCONHECIDO': '❓',
  };
  return icons[type] || '📋';
}
/** 
export const BARCODE_EXAMPLES = [
  { label: 'EAN-13 (produto)', code: '7891234567892' },
  { label: 'EAN-8 (produto pequeno)', code: '12345670' },
  { label: 'UPC-A (EUA)', code: '036000291452' },
  { label: 'ISBN-13 (livro)', code: '9780306406157' },
  { label: 'Boleto Bancário (Itaú)', code: '34191090040104752000300060000-1 38120000013350' },
  { label: 'ITF-14 (caixa)', code: '10078000071428' },
  { label: 'CODE-128', code: 'BRASIL2024XYZ' },
];*/