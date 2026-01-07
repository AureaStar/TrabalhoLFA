# Jogo da Vida - Autômato Celular em JavaScript/Canvas 2D

Este projeto implementa o Jogo da Vida de Conway, um autômato celular, usando JavaScript e Canvas 2D para renderização. Inspirado em https://playgameoflife.com/, mas com uma grade infinita para uma experiência mais expansiva.

## Regras do Jogo
- Qualquer célula viva com menos de duas vizinhas vivas morre por subpopulação.
- Qualquer célula viva com duas ou três vizinhas vivas sobrevive para a próxima geração.
- Qualquer célula viva com mais de três vizinhas vivas morre por superpopulação.
- Qualquer célula morta com exatamente três vizinhas vivas se torna viva por reprodução.

## Como Executar
1. Abra `index.html` em um navegador web moderno.
2. Clique em espaços vazios para colocar células vivas.
3. Clique em "Iniciar Simulação" para iniciar a evolução.
4. Use "Pausar" para parar e "Resetar" para limpar a grade.

## Funcionalidades
- Grade infinita usando um mapa esparso (apenas células vivas são armazenadas).
- Zoom in/out com a roda do mouse.
- Pan arrastando o mouse.
- Clique para alternar estado das células (apenas quando pausado).
- Controles de Iniciar/Pausar/Resetar.
- Velocidade ajustável (atualiza a cada 5 frames).
- Botão muda de "Iniciar Simulação" para "Em Simulação" durante a execução.

## Controles
- **Arrastar**: Move a visão (pan).
- **Roda do Mouse**: Zoom in/out.
- **Clique na Grade**: Alterna estado da célula (quando pausado).
- **Botões**: Controlam a simulação.

## Arquivos do Projeto

### `index.html`
- **Descrição**: Arquivo HTML principal que define a estrutura da página web.
- **Conteúdo**:
  - Declaração DOCTYPE e metadados básicos (charset, viewport, título).
  - Estilos CSS inline para layout: corpo sem margens, canvas em tela cheia, controles posicionados no canto superior esquerdo, botões estilizados.
  - Corpo HTML: Div com controles (botões para iniciar, pausar e resetar), canvas para renderização, e inclusão do script.js.
- **Função**: Serve como a interface base da aplicação web, hospedando o canvas e os controles interativos.

### `script.js`
- **Descrição**: Arquivo JavaScript que contém toda a lógica do Jogo da Vida, renderização e interações do usuário.
- **Conteúdo e Funcionalidades**:
  - **Inicialização**: Obtém o canvas e contexto 2D; define variáveis globais como `grid` (Map esparso para células vivas), `running` (estado da simulação), `scale` (zoom), `offsetX/Y` (posição da câmera), etc.
  - **Interações do Mouse**:
    - `mousedown/mousemove/mouseup`: Permite arrastar para pan.
    - `wheel`: Zoom com roda do mouse, centrado no cursor.
    - `click`: Alterna estado da célula na posição clicada (apenas quando pausado), usando coordenadas transformadas.
  - **Controles da Simulação**:
    - Botão "Iniciar": Define `running = true` e muda texto para "Em Simulação".
    - Botão "Pausar": Define `running = false` e volta texto para "Iniciar Simulação".
    - Botão "Resetar": Para simulação, limpa o grid (novo Map) e volta texto.
  - **Lógica do Jogo**:
    - `countNeighbors(x, y)`: Conta vizinhos vivos em torno de uma célula (8 direções).
    - `updateGrid()`: Calcula a próxima geração usando um Set de candidatos (células vivas + vizinhos), aplicando regras de Conway. Usa Map para eficiência em grade infinita.
  - **Renderização**:
    - `render()`: Limpa canvas, calcula área visível, desenha linhas de grade infinitas, e preenche retângulos pretos para células vivas no Map.
  - **Loop Principal**:
    - `loop()`: Função recursiva com `requestAnimationFrame`, incrementa frameCount, atualiza grade se running e frame múltiplo de updateInterval, e renderiza sempre.
- **Estrutura de Dados**: Grade infinita via Map (`key: "x,y"`) para armazenar apenas células vivas, economizando memória.
- **Função Geral**: Gerencia o estado do jogo, entrada do usuário e saída visual em tempo real.

### `README.md`
- **Descrição**: Este arquivo de documentação em Markdown.
- **Conteúdo**: Descrições do projeto, regras, instruções de uso, funcionalidades, controles e detalhes de cada arquivo.
- **Função**: Fornece informações para usuários e desenvolvedores entenderem o projeto.

### `.venv/`
- **Descrição**: Pasta do ambiente virtual Python (Virtual Environment) criado para isolar dependências e versões de Python do sistema global, evitando conflitos entre projetos.
- **Como Foi Montado**: Criado executando `python -m venv .venv` no terminal PowerShell dentro da pasta do projeto. O módulo `venv` do Python gera toda a estrutura automaticamente. Baseado em `pyvenv.cfg`, o comando foi: `C:\Users\84398\AppData\Local\Microsoft\WindowsApps\PythonSoftwareFoundation.Python.3.13_qbz5n2kfra8p0\python.exe -m venv c:\Users\84398\Documents\UFJF\TrabalhoLFA\.venv`.
- **Conteúdo Detalhado**:
  - **`.gitignore`** (manual): Arquivo de configuração Git para ignorar a pasta .venv no versionamento, evitando commits desnecessários.
  - **`Lib/`** (automático): Pasta com bibliotecas Python.
    - `site-packages/`: Subpasta onde pacotes instalados via pip são armazenados (inicialmente vazia ou com mínimos como pip/setuptools).
  - **`pyvenv.cfg`** (automático): Arquivo de configuração com metadados (home do Python base, versão 3.13.9, comando de criação, etc.).
  - **`Scripts/`** (automático): Executáveis e scripts para gerenciar o ambiente.
    - `Activate.ps1`, `activate.bat`, etc.: Scripts para ativar o .venv (modificam PATH para isolamento).
    - `deactivate.bat`: Script para desativar e restaurar o ambiente global.
    - `pip.exe`, `python.exe`, etc.: Versões isoladas do pip e Python.
- **O Que É Pronto vs. Manual**:
  - **Pronto**: Estrutura base (Lib/, pyvenv.cfg, Scripts/) gerada automaticamente pelo `venv`.
  - **Manual**: Criação do comando, adição de .gitignore, ativação/desativação, e instalações de pacotes via pip.
- **Como Funciona**: Ativação isola o Python (ex.: `& .venv\Scripts\Activate.ps1`), permitindo instalar pacotes sem afetar o sistema. Pacotes vão para `Lib/site-packages/`. Desativação restaura o global. Usado para ferramentas Python no desenvolvimento, não parte da app web.
- **Função Geral**: Mantém dependências Python separadas, facilitando gerenciamento e evitando conflitos.

### `.git/`
- **Descrição**: Pasta do repositório Git para controle de versão.
- **Conteúdo**: Histórico de commits, branches, configuração do repositório.
- **Função**: Permite versionamento do código, colaboração e rastreamento de mudanças nos arquivos do projeto.

## Solução de Problemas
- Se o canvas não renderizar, verifique o console do navegador por erros.
- Certifique-se de que JavaScript está habilitado.
- Para grade infinita, a performance depende do número de células vivas; evite padrões muito densos.

## Notas Técnicas
- **Grade Infinita**: Implementada com Map esparso para evitar limites e uso excessivo de memória.
- **Renderização**: Usa Canvas 2D para desenhar linhas de grade e células em tempo real.
- **Performance**: Atualizações ocorrem a cada 5 frames para suavidade; zoom e pan são fluidos.
- **Compatibilidade**: Funciona em navegadores modernos com suporte a Canvas 2D e ES6+.