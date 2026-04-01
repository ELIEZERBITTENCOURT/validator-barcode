# Validator-Barcode

Sistema web para decodificação e exibição de informações de códigos de barras. Desenvolvido em **React modular** com CSS puro, sem dependências externas de UI.

---

## Funcionalidades

- **Detecção automática** do formato do código de barras
- **Validação de checksum** para formatos que suportam dígito verificador
- **Extração de informações** específicas por tipo (país de origem, banco, valor, etc.)
- **Visualização gráfica** do código gerada dinamicamente
- **Histórico** das últimas 10 consultas da sessão
- Suporte a entrada via **teclado** (Enter para decodificar)
- Interface **responsiva** para desktop e mobile

---

## Formatos Suportados

| Formato | Descrição | Exemplo |
|---|---|---|
| **EAN-13** | Produto de varejo (padrão mundial) | `7891234567892` |
| **EAN-8** | Produto pequeno (versão compacta) | `12345670` |
| **UPC-A** | Produto de varejo (padrão EUA) | `036000291452` |
| **UPC-E** | UPC comprimido | `01234565` |
| **CODE-128** | Código alfanumérico de uso geral | `BRASIL2024XYZ` |
| **CODE-39** | Código alfanumérico industrial | `ITEM-001` |
| **ITF-14** | Embalagem / logística | `10078000071428` |
| **ISBN-13** | Livros (padrão atual) | `9780306406157` |
| **ISBN-10** | Livros (padrão antigo) | `0306406152` |
| **ISSN** | Periódicos e revistas | `03784754X` |
| **Boleto** | Boleto bancário brasileiro | linha digitável de 44–48 dígitos |

---

## Estrutura do Projeto

```
validator-barcode/
├── index.html                  # Entrada HTML, importa fontes
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                # Bootstrap React
    ├── App.jsx                 # Componente raiz / orquestrador
    ├── App.css                 # Layout geral e responsividade
    │
    ├── styles/
    │   └── global.css          # Variáveis CSS, reset, tema global
    │
    ├── hooks/
    │   └── useBarcode.js       # Hook customizado: estado, parsing, histórico
    │
    ├── utils/
    │   └── barcodeParser.js    # Motor de decodificação (JS puro, sem libs)
    │
    └── components/
        ├── Header.jsx          # Cabeçalho com logo
        ├── Header.css
        ├── BarcodeInput.jsx    # Campo de entrada, exemplos, feedback
        ├── BarcodeInput.css
        ├── BarcodeResult.jsx   # Exibição dos resultados decodificados
        ├── BarcodeResult.css
        ├── History.jsx         # Histórico de consultas da sessão
        └── History.css
```

---

## Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- npm v9 ou superior

### Instalação

```bash
# Clone o repositório
git clone https://github.com/ELIEZERBITTENCOURT/validator-barcode.git
cd validator-barcode

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:5173` no navegador.

### Build para produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

### Preview do build

```bash
npm run preview
```

---

## Arquitetura

O projeto segue uma arquitetura **modular e desacoplada**:

```
App.jsx
 ├── useBarcode.js         ← toda a lógica de estado centralizada aqui
 │    └── barcodeParser.js ← funções puras, sem side effects
 ├── BarcodeInput.jsx      ← componente de entrada (controlado pelo hook)
 ├── BarcodeResult.jsx     ← componente de exibição (apenas renderização)
 └── History.jsx           ← componente de histórico (apenas renderização)
```

**Princípios adotados:**

- **Separação de responsabilidades** — lógica no hook, visual nos componentes
- **CSS por componente** — cada `.jsx` tem seu `.css` correspondente
- **Funções puras** em `utils/` — sem dependência de framework, testáveis isoladamente
- **Estado único** gerenciado pelo `useBarcode` — componentes filhos são stateless

---

## Design

- **Tema:** Industrial / Terminal — dark mode com accent verde-lima `#c8f135`
- **Tipografia:** [Syne](https://fonts.google.com/specimen/Syne) (display) + [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (código)
- **Variáveis CSS** centralizadas em `global.css` para fácil customização
- Sem frameworks CSS externos — estilo 100% manual

---

## Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 18 | Framework de UI |
| Vite | 5 | Bundler e dev server |
| CSS Modules (manual) | — | Estilização por componente |
| Google Fonts | — | Syne + JetBrains Mono |

---

## Licença
MIT