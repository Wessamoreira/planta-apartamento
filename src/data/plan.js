// ============================================================
//  APTO "FINAL 02" — Gran Conquista, Goiânia/GO           REV 04
//  Medidas em CENTÍMETROS. Origem (0,0) = canto superior
//  esquerdo da projeção externa.
//  Referencial: FACHADA embaixo (porta de entrada + janela da
//  sala + janela da cozinha), COZINHA à direita, QUARTOS em cima.
// ============================================================

export const SHEET = { w: 743, h: 641, wall: 15, pd: 250 }

export const ROOMS = [
  { id: 'quarto1', nome: 'Quarto 1', x: 15,  y: 15,  w: 320, h: 344, dims: '3,20 × 3,44', area: 11.01,
    nota: 'Comporta cama King (1,93 × 2,03) com 63 e 64 cm de passagem lateral e 81 cm até o guarda-roupa.' },
  { id: 'banho',   nome: 'Banho', x: 350, y: 15,  w: 123, h: 228, dims: '1,23 × 2,28', area: 2.80,
    nota: 'Enfileirado: bancada, vaso e box. A porta abre para dentro, encostando na parede da bancada.' },
  { id: 'circ',    nome: 'Circulação', x: 350, y: 258, w: 123, h: 117, dims: '1,23 × 1,17', area: 1.44,
    nota: 'Hall com três portas: banho ao fundo, Quarto 1 à esquerda e Quarto 2 à direita, uma de frente para a outra. Todas abrem para dentro dos ambientes, então o hall fica sempre livre.' },
  { id: 'quarto2', nome: 'Quarto 2', x: 488, y: 15,  w: 240, h: 360, dims: '2,40 × 3,60', area: 8.64,
    nota: 'King não cabe. Casal padrão 1,38 deixa 51 cm de cada lado e ainda sobra parede para escrivaninha.' },
  { id: 'sala',    nome: 'Estar / Jantar', x: 15,  y: 375, w: 484, h: 251, dims: '4,84 × 2,51', area: 12.15,
    nota: 'Três zonas: jantar no canto esquerdo, estar no centro e o nó de circulação à direita, que fica vazio.' },
  { id: 'cozinha', nome: 'Cozinha', x: 514, y: 392, w: 214, h: 234, dims: '2,14 × 2,33', area: 4.99,
    nota: 'Em "U", aberta para a sala. Corredor interno de 1,14 m entre as bancadas opostas.' },
]

export const WALL_PATCHES = [{ x: 473, y: 375, w: 41, h: 17 }]

// Em janelas, `sill` é a altura da mureta (peitoril) e `top` a altura da verga.
// A janela da sala não é uma porta-balcão: há uma mureta existente de 1,00 m.
export const OPENINGS = [
  { id: 'porta-entrada', tipo: 'porta',  x: 25,  y: 626, w: 90,  h: 15,  sill: 0,   top: 210, label: 'Porta de entrada' },
  // Posições conferidas contra a prancha-base: ambas ficam na fachada.
  // A da sala é deslocada para o lado direito, antes da parede da cozinha.
  { id: 'jan-sala',      tipo: 'janela', x: 335, y: 626, w: 125, h: 15,  sill: 100, top: 210, label: 'Janela da sala — mureta H=1,00 m' },
  { id: 'jan-cozinha',   tipo: 'janela', x: 550, y: 626, w: 100, h: 15,  sill: 105, top: 210, label: 'Janela da cozinha' },
  { id: 'pass-cozinha',  tipo: 'vao',    x: 499, y: 434, w: 15,  h: 100, sill: 0,   top: 220, label: 'Passagem da cozinha' },
  { id: 'porta-q1',      tipo: 'porta',  x: 335, y: 265, w: 15,  h: 80,  sill: 0,   top: 210, label: 'Porta do Quarto 1' },
  { id: 'porta-q2',      tipo: 'porta',  x: 473, y: 275, w: 15,  h: 80,  sill: 0,   top: 210, label: 'Porta do Quarto 2' },
  { id: 'porta-banho',   tipo: 'porta',  x: 365, y: 243, w: 60,  h: 15,  sill: 0,   top: 210, label: 'Porta do Banho' },
  { id: 'jan-q1',        tipo: 'janela', x: 100, y: 0,   w: 150, h: 15,  sill: 110, top: 210, label: 'Janela do Quarto 1' },
  { id: 'jan-q2',        tipo: 'janela', x: 560, y: 0,   w: 130, h: 15,  sill: 110, top: 210, label: 'Janela do Quarto 2' },
]

export const DOOR_SWINGS = [
  { cx: 25,  cy: 626, r: 90, a0: 270, a1: 360, nota: 'Entrada — abre para dentro da sala' },
  { cx: 335, cy: 345, r: 80, a0: 180, a1: 270, nota: 'Quarto 1 — abre para dentro do quarto' },
  { cx: 488, cy: 355, r: 80, a0: 270, a1: 360, nota: 'Quarto 2 — abre para dentro do quarto' },
  { cx: 365, cy: 243, r: 60, a0: 270, a1: 360, nota: 'Banho — abre para dentro, contra a bancada' },
]

export const FINISHES = {
  pedra: {
    branco: {
      id: 'branco', nome: 'Granito Branco Itaúnas',
      cor: '#E4DFD4', corEsc: '#C6BFB0', linha: '#8E8677',
      preco: 'R$ 450 a 750 / m²',
      resumo: 'Fundo branco-creme com pontos pretos e granulação fina.',
      pro: 'Clareia a cozinha inteira e conversa com os armários brancos. Ambiente parece maior do que é.',
      contra: 'É o mais poroso da lista. Café, vinho e óleo mancham se não impermeabilizar. Peça resina de fábrica e refaça o impermeabilizante a cada 2 ou 3 anos.',
    },
    ubatuba: {
      id: 'ubatuba', nome: 'Verde Ubatuba escovado',
      cor: '#3E4C40', corEsc: '#2C3730', linha: '#5C6E5F',
      preco: 'R$ 420 a 700 / m² (o escovado soma 20 a 30% sobre o polido)',
      resumo: 'Verde-escuro quase preto com brilho metálico. O escovado deixa a superfície fosca e levemente texturizada.',
      pro: 'Melhor custo-benefício do Brasil e o mais fácil de conviver: o escovado esconde risco, digital e marca d\'água muito melhor que qualquer polido. Com armário branco, o contraste fica forte e moderno.',
      contra: 'Escurece a bancada, então a fita de LED sob os aéreos deixa de ser enfeite e vira necessidade. Migalha clara aparece mais.',
    },
  },
  armario: {
    branco: { id: 'branco', nome: 'Branco fosco', cor: '#F2F1ED', corEsc: '#DAD8D2', linha: '#B9B6AE',
      nota: 'MDF branco fosco. Puxador tipo cava ou perfil de alumínio preto evita marca de mão na porta.' },
    grafite: { id: 'grafite', nome: 'Grafite fosco', cor: '#3C4249', corEsc: '#2C3138', linha: '#5A626B',
      nota: 'Referência da cozinha do vizinho. Esconde sujeira, mas fecha visualmente uma cozinha de 5 m².' },
  },
}

const SALA = [
  { id: 'sofa', layer: 'sala', mat: 'estofado', x: 125, y: 541, w: 220, h: 85, z: 0, hz: 75,
    label: 'Sofá sem braços', spec: '2,20 × 0,85 m · linho cinza claro',
    detalhe: 'Sem braços, os 2,20 m são 100% assento. Fica no trecho livre da fachada, sem encostar na mureta e sem bloquear a circulação.' },
  { id: 'painel-tv', layer: 'sala', mat: 'madeira', x: 190, y: 375, w: 155, h: 13, z: 40, hz: 120,
    label: 'Painel de TV', spec: '1,55 × 1,20 m · profundidade 12 cm · MDF 18 mm',
    detalhe: 'Régua suspensa, borda inferior a 40 cm do piso, com passa-fios interno. Distância até o sofá: 1,53 m, então TV de 43" a 50".' },
  { id: 'banco-ca', layer: 'sala', mat: 'estofado', x: 15, y: 380, w: 50, h: 150, z: 0, hz: 45,
    label: 'Banco do canto alemão', spec: '1,50 × 0,45 m · assento a 45 cm · tampo baú',
    detalhe: 'Para em 1,50 m para ficar fora do giro da porta de entrada, que varre 90 cm de raio. Tampo com pistão a gás.' },
  { id: 'mesa-jantar', layer: 'sala', mat: 'madeira', x: 70, y: 405, w: 70, h: 100, z: 0, hz: 75,
    label: 'Mesa de jantar', spec: '1,00 × 0,70 m · madeira clara · pé central',
    detalhe: 'Pé de canto atrapalha quem senta no banco.' },
  { id: 'cadeira-1', layer: 'sala', mat: 'madeira', x: 145, y: 410, w: 42, h: 42, z: 0, hz: 45, label: 'Cadeira', spec: '0,45 × 0,45 m', detalhe: '' },
  { id: 'cadeira-2', layer: 'sala', mat: 'madeira', x: 145, y: 460, w: 42, h: 42, z: 0, hz: 45, label: 'Cadeira', spec: '0,45 × 0,45 m', detalhe: '' },
]

const QUARTOS = [
  { id: 'cama-king', layer: 'quartos', mat: 'estofado', x: 79, y: 15, w: 193, h: 203, z: 0, hz: 55,
    label: 'Cama King', spec: '1,93 × 2,03 m · cabeceira na parede da janela',
    detalhe: 'CABE, com 63 e 64 cm de passagem lateral. Prédio sem elevador: confira a diagonal do patamar, mínimo 2,10 m, ou peça colchão embalado a vácuo.' },
  { id: 'gr-q1', layer: 'quartos', mat: 'armario', x: 15, y: 299, w: 240, h: 60, z: 0, hz: 230,
    label: 'Guarda-roupa Q1', spec: '2,40 × 0,60 m · modulado 2,30 m + tamponamento', detalhe: 'Vai até onde começa a porta. Tampone até o teto.' },
  { id: 'cm-1', layer: 'quartos', mat: 'madeira', x: 27, y: 20, w: 48, h: 45, z: 0, hz: 55, label: 'Criado-mudo', spec: '48 × 45 cm', detalhe: '' },
  { id: 'cm-2', layer: 'quartos', mat: 'madeira', x: 276, y: 20, w: 48, h: 45, z: 0, hz: 55, label: 'Criado-mudo', spec: '48 × 45 cm', detalhe: '' },
  { id: 'cama-casal', layer: 'quartos', mat: 'estofado', x: 539, y: 15, w: 138, h: 188, z: 0, hz: 55,
    label: 'Cama de casal', spec: '1,38 × 1,88 m',
    detalhe: 'King não cabe: sobrariam 47 cm no total. O casal padrão deixa 51 cm de cada lado.' },
  { id: 'gr-q2', layer: 'quartos', mat: 'armario', x: 578, y: 315, w: 150, h: 60, z: 0, hz: 230,
    label: 'Guarda-roupa Q2', spec: '1,50 × 0,60 m · modulado 1,40 m + tamponamento', detalhe: '' },
  { id: 'mesa-q2', layer: 'quartos', mat: 'madeira', x: 488, y: 120, w: 50, h: 100, z: 0, hz: 75,
    label: 'Escrivaninha', spec: '1,00 × 0,50 m', detalhe: 'Home office. Sobra parede porque o quarto tem 3,60 m de profundidade.' },
  { id: 'box', layer: 'quartos', mat: 'vidro', dashed: true, x: 350, y: 15, w: 123, h: 100, z: 0, hz: 190,
    label: 'Box do banho', spec: '1,23 × 1,00 m · vidro temperado 8 mm, porta de correr',
    detalhe: 'Porta de abrir roubaria 60 cm da circulação. Confira o shaft SH-03 antes de encomendar o vidro.' },
  { id: 'vaso', layer: 'quartos', mat: 'eletro', x: 400, y: 125, w: 45, h: 70, z: 0, hz: 80, label: 'Vaso sanitário',
    spec: 'Caixa acoplada · projeção 0,70 m', detalhe: 'Deixe 20 cm livres de cada lado.' },
  { id: 'banc-banho', layer: 'quartos', mat: 'pedra', stone: 'E', x: 350, y: 198, w: 123, h: 45, z: 86, hz: 4,
    label: 'Bancada do banho', spec: 'Peça E · 1,23 × 0,45 m',
    detalhe: 'Sai do aproveitamento da mesma chapa da cozinha. Espelho de parede a parede dobra a sensação de largura.' },
]

const COZ_COMUM = [
  { id: 'geladeira', layer: 'cozinha', mat: 'eletro', x: 514, y: 392, w: 85, h: 75, z: 0, hz: 180,
    label: 'Geladeira Inverse', spec: 'Nicho de 85 cm · 400 a 490 L · inox',
    detalhe: 'Na ponta da parede de fundo, junto à passagem: você pega as coisas sem entrar na cozinha. Fica na diagonal oposta ao cooktop, que era o que te incomodava na cozinha do vizinho.' },
  { id: 'banc-fundo', layer: 'cozinha', mat: 'pedra', stone: 'B', x: 604, y: 392, w: 124, h: 60, z: 86, hz: 4,
    label: 'Bancada de fundo', spec: 'Peça B · 1,24 × 0,60 m',
    detalhe: 'Recebe o tanque de embutir e a vaga da máquina de lavar, nos pontos de água que já existem.' },
  { id: 'tanque', layer: 'cozinha', mat: 'eletro', x: 610, y: 398, w: 55, h: 45, z: 86, hz: 4,
    label: 'Tanque inox', spec: '55 × 45 cm · de embutir', detalhe: 'Embutido na mesma pedra da Peça B.' },
  { id: 'maquina', layer: 'cozinha', mat: 'eletro', dashed: true, x: 668, y: 396, w: 60, h: 56, z: 0, hz: 85,
    label: 'Máquina de lavar', spec: '60 cm · sob a bancada', detalhe: 'No nicho de serviço, onde já existe o registro a 1,10 m.' },
  { id: 'torre', layer: 'cozinha', mat: 'armario', x: 668, y: 452, w: 60, h: 60, z: 0, hz: 220,
    label: 'Torre alta', spec: '0,60 × 0,60 m · do piso ao teto',
    detalhe: 'Compensa o aéreo que a janela tirou. Guarda mantimentos e recebe micro-ondas e forno elétrico em nicho.' },
  { id: 'aereo-fundo', layer: 'cozinha', mat: 'armario', x: 604, y: 392, w: 124, h: 35, z: 150, hz: 90,
    label: 'Aéreos da parede de fundo', spec: '1,24 × 0,35 m · altura 90 cm, até o teto',
    detalhe: 'Altura de 90 cm em vez dos 70 padrão. A faixa de cima guarda o que se usa pouco e já resolve o tamponamento.' },
]

export const COZINHA_VARIANTES = {
  A: {
    id: 'A', nome: 'Cooktop no canto da pia',
    resumo: 'Cooktop na bancada lateral, colado ao canto da bancada da pia. É o arranjo da cozinha do seu vizinho, mas com a geladeira longe do fogo.',
    pro: 'A bancada da pia fica 100% livre: 1,50 m corridos de preparo. Chama longe da janela e geladeira na diagonal oposta.',
    contra: 'Você gira 90° entre a pia e o fogo. Exige extensão do ponto de gás de mais ou menos 1,2 m pela parede.',
    itens: [
      ...COZ_COMUM,
      { id: 'banc-pia', layer: 'cozinha', mat: 'pedra', stone: 'A', x: 514, y: 566, w: 214, h: 60, z: 86, hz: 4,
        label: 'Bancada da pia', spec: 'Peça A · 2,14 × 0,60 m',
        detalhe: 'Cuba mantida no ponto existente, sob a janela. O resto é bancada de preparo corrida. Sem aéreo: a janela ocupa a parede.' },
      { id: 'cuba', layer: 'cozinha', mat: 'eletro', x: 526, y: 578, w: 56, h: 34, z: 86, hz: 4,
        label: 'Cuba inox', spec: '56 × 33 cm · de embutir', detalhe: 'Recorte na Peça A, no ponto de água existente.' },
      { id: 'banc-lateral', layer: 'cozinha', mat: 'pedra', stone: 'C', x: 668, y: 512, w: 60, h: 54, z: 86, hz: 4,
        label: 'Bancada lateral', spec: 'Peça C · 0,54 × 0,60 m', detalhe: 'Emenda no canto com a Peça A, colada e polida.' },
      { id: 'cooktop', layer: 'cozinha', mat: 'eletro', x: 673, y: 505, w: 50, h: 55, z: 86, hz: 5,
        label: 'Cooktop 4 bocas a gás', spec: 'Nicho ~55 × 48 cm · vidro preto',
        detalhe: 'No canto, virando da pia. Precisa de extensão do ponto de gás: serviço de instalador credenciado, R$ 300 a 800.' },
    ],
  },
  B: {
    id: 'B', nome: 'Cooktop na mesma bancada da pia',
    resumo: 'Cooktop na parede da fachada, à direita da cuba, com 40 cm de bancada de preparo entre os dois.',
    pro: 'Pia e fogo lado a lado, sem girar o corpo. É o que você pediu literalmente.',
    contra: 'O cooktop fica sob a janela, e corrente de ar apaga chama de gás. Só funciona se a folha da janela desse trecho ficar fechada ao cozinhar, ou com um anteparo. Além disso perde 55 cm de bancada de preparo.',
    itens: [
      ...COZ_COMUM,
      { id: 'banc-pia', layer: 'cozinha', mat: 'pedra', stone: 'A', x: 514, y: 566, w: 214, h: 60, z: 86, hz: 4,
        label: 'Bancada da pia e do cooktop', spec: 'Peça A · 2,14 × 0,60 m',
        detalhe: 'Dois recortes na mesma pedra: cuba e cooktop, com 40 cm de preparo entre eles. Dente do SH-01 na ponta direita.' },
      { id: 'cuba', layer: 'cozinha', mat: 'eletro', x: 526, y: 578, w: 56, h: 34, z: 86, hz: 4,
        label: 'Cuba inox', spec: '56 × 33 cm · de embutir', detalhe: 'Recorte na Peça A, no ponto de água existente.' },
      { id: 'banc-lateral', layer: 'cozinha', mat: 'pedra', stone: 'C', x: 668, y: 512, w: 60, h: 54, z: 86, hz: 4,
        label: 'Bancada lateral', spec: 'Peça C · 0,54 × 0,60 m', detalhe: 'Apoio no canto.' },
      { id: 'cooktop', layer: 'cozinha', mat: 'eletro', x: 622, y: 574, w: 55, h: 48, z: 86, hz: 5,
        label: 'Cooktop 4 bocas a gás', spec: 'Nicho ~55 × 48 cm · vidro preto',
        detalhe: 'Colado à bancada da pia, com 40 cm de preparo entre os dois. Fica sob a janela: mantenha essa folha fechada ao cozinhar.' },
    ],
  },
}

export function furniture(v) { return [...SALA, ...QUARTOS, ...COZINHA_VARIANTES[v].itens] }

export const DELIVERED = [
  { id: 'pre-moldada', x: 514, y: 566, w: 150, h: 60, label: 'Bancada pré-moldada',
    spec: 'Granilite branco com cuba integrada · padrão de entrega',
    detalhe: 'Precisa ser demolida para instalar o granito. Some R$ 250 a 600 de demolição, R$ 200 a 500 de entulho e R$ 300 a 900 de azulejo.' },
  { id: 'tanque-parede', x: 610, y: 398, w: 50, h: 35, label: 'Tanque de parede',
    spec: 'Lavatório de louça fixado na parede', detalhe: 'Ao lado dele estão o ponto de gás e o registro da máquina.' },
]

export const POINTS = [
  { id: 'gas', layer: 'hidr', x: 700, y: 400, tipo: 'GÁS', label: 'Ponto de gás existente',
    detalhe: 'Tubo amarelo com registro, na parede de fundo. Gás incluso na taxa de condomínio. Estender até o cooktop é serviço de instalador credenciado, não de pedreiro.' },
  { id: 'agua-pia', layer: 'hidr', x: 554, y: 620, tipo: 'AF/E', label: 'Água e esgoto da pia',
    detalhe: 'Ponto existente sob a janela. Mover para outra parede custa fácil R$ 1.500 e arrisca infiltração no vizinho de baixo.' },
  { id: 'agua-maq', layer: 'hidr', x: 690, y: 402, tipo: 'AF', label: 'Água da máquina de lavar',
    detalhe: 'Registro a mais ou menos 1,10 m do piso, dentro do nicho de serviço.' },
  { id: 'tom-gel', layer: 'elet', x: 560, y: 400, tipo: '20A', label: 'Tomada da geladeira', detalhe: 'Circuito dedicado, altura 30 cm.' },
  { id: 'tom-cook', layer: 'elet', x: 640, y: 600, tipo: '10A', label: 'Tomada do acendimento', detalhe: 'Cooktop a gás dispensa circuito de alta amperagem. Economia na elétrica.' },
  { id: 'tom-tv', layer: 'elet', x: 265, y: 382, tipo: '3×10A', label: 'Tomadas do painel de TV', detalhe: 'Três tomadas e um ponto de rede, altura 100 cm, atrás do painel.' },
  { id: 'tom-sofa', layer: 'elet', x: 235, y: 619, tipo: '10A', label: 'Tomadas do sofá', detalhe: 'Duas tomadas, altura 30 cm.' },
  { id: 'interfone', layer: 'elet', x: 22, y: 560, tipo: 'INT', label: 'Interfone', detalhe: 'Fica a mais ou menos 1,40 m do piso. Confirme antes de o marceneiro cortar o encosto do banco.' },
]

export const GAS_RUN = {
  A: [[700, 400], [722, 420], [722, 505], [700, 520]],
  B: [[700, 400], [722, 420], [722, 596], [677, 596]],
}

export const SHAFTS = [
  { id: 'sh1', x: 678, y: 611, w: 50, h: 15, label: 'SH-01', detalhe: 'Prumada no canto da bancada da pia. Exige dente na pedra, reduzindo para mais ou menos 45 cm de profundidade no trecho.' },
  { id: 'sh2', x: 710, y: 470, w: 18, h: 40, label: 'SH-02', detalhe: 'Prumada na parede lateral. Área comum: não quebra, não fura, não afina.' },
  { id: 'sh3', x: 443, y: 15,  w: 30, h: 30, label: 'SH-03', detalhe: 'Prumada no canto do box. Confira antes de encomendar o vidro.' },
]

export const CIRCULATION = [
  { id: 'no-sala', x: 350, y: 392, w: 149, h: 215, label: 'Nó de circulação',
    detalhe: 'Liga entrada, cozinha e hall dos quartos. Não pode receber móvel.' },
  { id: 'corr-coz', x: 514, y: 452, w: 154, h: 114, label: 'Corredor da cozinha',
    detalhe: '1,14 m entre as bancadas opostas. O mínimo recomendado é 0,90 m.' },
  { id: 'hall', x: 350, y: 258, w: 123, h: 117, label: 'Hall das três portas',
    detalhe: 'Quarto 1 e Quarto 2 ficam com as portas uma de frente para a outra, e o banho ao fundo. Como as três abrem para dentro dos ambientes, o hall fica sempre livre e nenhuma folha bate na outra.' },
]

export const DIMS = [
  { x1: 15,  y1: 672, x2: 499, y2: 672, txt: '484', side: 'h' },
  { x1: 514, y1: 672, x2: 728, y2: 672, txt: '214', side: 'h' },
  { x1: -32, y1: 375, x2: -32, y2: 626, txt: '251', side: 'v' },
  { x1: -32, y1: 15,  x2: -32, y2: 359, txt: '344', side: 'v' },
  { x1: 775, y1: 392, x2: 775, y2: 626, txt: '233', side: 'v' },
  { x1: 775, y1: 15,  x2: 775, y2: 375, txt: '360', side: 'v' },
  { x1: 15,  y1: -34, x2: 335, y2: -34, txt: '320', side: 'h' },
  { x1: 350, y1: -34, x2: 473, y2: -34, txt: '123', side: 'h' },
  { x1: 488, y1: -34, x2: 728, y2: -34, txt: '240', side: 'h' },
]

export const LAYERS = [
  { id: 'arq',    nome: 'ARQ-BASE',    cor: '#E8EEF4', desc: 'Paredes, portas e janelas' },
  { id: 'texto',  nome: 'TEXTO',       cor: '#C9D6E2', desc: 'Nomes e áreas dos ambientes' },
  { id: 'cotas',  nome: 'COTAS',       cor: '#FF6B3D', desc: 'Dimensões em centímetros' },
  { id: 'sala',   nome: 'MOB-SALA',    cor: '#8FB8DE', desc: 'Sofá, painel de TV, canto alemão' },
  { id: 'cozinha',nome: 'MOB-COZINHA', cor: '#9BE5C0', desc: 'Bancadas, eletros e área de serviço' },
  { id: 'quartos',nome: 'MOB-QUARTOS', cor: '#E4C77A', desc: 'Camas, guarda-roupas e banho' },
  { id: 'pedra',  nome: 'PEDRA',       cor: '#B98BFF', desc: 'Peças da marmoraria (A, B, C, E)' },
  { id: 'hidr',   nome: 'HIDR-GÁS',    cor: '#FFC94A', desc: 'Água, esgoto, gás e a extensão proposta' },
  { id: 'elet',   nome: 'ELÉTRICA',    cor: '#FF6FB5', desc: 'Tomadas e pontos de força' },
  { id: 'circ',   nome: 'CIRCULAÇÃO',  cor: '#3DDC84', desc: 'Faixas que não recebem móvel' },
  { id: 'shafts', nome: 'PRUMADAS',    cor: '#FF4A3D', desc: 'Shafts — não podem ser removidos' },
]

export function elevations(v) {
  const A = v === 'A'
  return [
    {
      id: 'VA', titulo: 'Vista A — parede da fachada', sub: 'bancada da pia', larg: 214, alt: 250,
      nota: A
        ? 'Com o cooktop no canto, esta bancada fica 100% livre: 1,46 m corridos de preparo depois da cuba. Sem armário aéreo, porque a janela ocupa a parede.'
        : 'Cuba e cooktop na mesma pedra, com 40 cm de preparo entre eles. Sem armário aéreo, porque a janela ocupa a parede.',
      pecas: [
        { x: 0,   y: 0,   w: 214, h: 12,  t: 'rodape',  l: '' },
        { x: 0,   y: 12,  w: 60,  h: 74,  t: 'armario', l: 'Gavetão' },
        { x: 60,  y: 12,  w: 60,  h: 74,  t: 'armario', l: 'Gavetão' },
        { x: 120, y: 12,  w: 94,  h: 74,  t: 'armario', l: 'Armário' },
        { x: 0,   y: 86,  w: 214, h: 4,   t: 'pedra',   l: 'PEÇA A · 2,14 × 0,60' },
        { x: 12,  y: 90,  w: 56,  h: 4,   t: 'eletro',  l: 'Cuba' },
        ...(A ? [] : [{ x: 108, y: 90, w: 55, h: 5, t: 'eletro', l: 'Cooktop' }]),
        { x: 46,  y: 105, w: 130, h: 105, t: 'janela',  l: 'Janela' },
        { x: 164, y: 90,  w: 50,  h: 4,   t: 'shaft',   l: 'SH-01' },
      ],
      cotas: [
        { x1: 0, x2: 214, y: -24, txt: '214' },
        { x1: 12, x2: 68, y: -48, txt: '56 cuba' },
        ...(A ? [{ x1: 68, x2: 214, y: -48, txt: '146 de preparo' }]
              : [{ x1: 68, x2: 108, y: -48, txt: '40' }, { x1: 108, x2: 163, y: -48, txt: '55 cooktop' }]),
      ],
      vcotas: [
        { y1: 0, y2: 90, x: 236, txt: '90' },
        { y1: 105, y2: 210, x: 236, txt: '105' },
        { y1: 210, y2: 250, x: 236, txt: '40' },
      ],
    },
    {
      id: 'VB', titulo: 'Vista B — parede de fundo', sub: 'geladeira, tanque e máquina', larg: 214, alt: 250,
      nota: 'Geladeira na ponta junto à passagem. Os aéreos têm 90 cm de altura e vão até o teto, compensando o aéreo que a janela tirou da parede da pia.',
      pecas: [
        { x: 0,   y: 0,   w: 85,  h: 180, t: 'eletro',  l: 'Geladeira Inverse' },
        { x: 90,  y: 12,  w: 55,  h: 74,  t: 'armario', l: 'Sob o tanque' },
        { x: 145, y: 0,   w: 65,  h: 85,  t: 'vao',     l: 'Máquina de lavar' },
        { x: 90,  y: 86,  w: 124, h: 4,   t: 'pedra',   l: 'PEÇA B · 1,24 × 0,60' },
        { x: 96,  y: 90,  w: 55,  h: 4,   t: 'eletro',  l: 'Tanque' },
        { x: 90,  y: 150, w: 124, h: 90,  t: 'armario', l: 'Aéreos' },
        { x: 90,  y: 240, w: 124, h: 10,  t: 'armario', l: 'Tamponamento' },
      ],
      cotas: [
        { x1: 0, x2: 214, y: -24, txt: '214' },
        { x1: 0, x2: 85, y: -48, txt: '85 geladeira' },
        { x1: 90, x2: 214, y: -48, txt: '124 bancada' },
      ],
      vcotas: [
        { y1: 0, y2: 90, x: 236, txt: '90' },
        { y1: 90, y2: 150, x: 236, txt: '60 livre' },
        { y1: 150, y2: 250, x: 236, txt: '100' },
      ],
    },
    {
      id: 'VC', titulo: 'Vista C — parede lateral cega', sub: 'torre alta', larg: 114, alt: 250,
      nota: A
        ? 'Torre alta do piso ao teto e, ao lado dela, o cooktop no canto que encontra a bancada da pia.'
        : 'Torre alta do piso ao teto e bancada de apoio no canto.',
      pecas: [
        { x: 0,  y: 0,   w: 60, h: 220, t: 'armario', l: 'Torre alta' },
        { x: 0,  y: 220, w: 60, h: 30,  t: 'armario', l: 'Tamp.' },
        { x: 60, y: 12,  w: 54, h: 74,  t: 'armario', l: 'Gavetão' },
        { x: 60, y: 86,  w: 54, h: 4,   t: 'pedra',   l: 'PEÇA C' },
        ...(A ? [{ x: 62, y: 90, w: 50, h: 5, t: 'eletro', l: 'Cooktop' }] : []),
        { x: 60, y: 150, w: 54, h: 90,  t: 'armario', l: 'Aéreo' },
      ],
      cotas: [
        { x1: 0, x2: 114, y: -24, txt: '114' },
        { x1: 0, x2: 60, y: -48, txt: '60 torre' },
        { x1: 60, x2: 114, y: -48, txt: '54' },
      ],
      vcotas: [
        { y1: 0, y2: 90, x: 132, txt: '90' },
        { y1: 0, y2: 220, x: 162, txt: '220' },
      ],
    },
    {
      id: 'VD', titulo: 'Vista D — parede do painel de TV', sub: 'sala', larg: 484, alt: 250,
      nota: 'Painel suspenso de 1,55 m, borda inferior a 40 cm do piso. À direita fica a passagem para o hall dos quartos, que precisa continuar livre.',
      pecas: [
        { x: 175, y: 40, w: 155, h: 120, t: 'madeira', l: 'Painel de TV · MDF 18 mm' },
        { x: 205, y: 60, w: 95,  h: 60,  t: 'eletro',  l: 'TV 43" a 50"' },
        { x: 335, y: 0,  w: 123, h: 210, t: 'vao',     l: 'Passagem para os quartos' },
      ],
      cotas: [
        { x1: 0, x2: 484, y: -24, txt: '484' },
        { x1: 175, x2: 330, y: -48, txt: '155 painel' },
        { x1: 335, x2: 458, y: -48, txt: '123 passagem' },
      ],
      vcotas: [
        { y1: 0, y2: 40, x: 506, txt: '40' },
        { y1: 40, y2: 160, x: 506, txt: '120' },
      ],
    },
  ]
}

export const VIEWPOINTS = [
  { id: 'superior', nome: 'Planta 3D', pos: [370, 1180, 320], look: [370, 0, 320] },
  { id: 'geral',   nome: 'Geral',    pos: [370, 620, 1180], look: [370, 40, 320] },
  { id: 'cozinha', nome: 'Cozinha',  pos: [522, 158, 462],  look: [700, 112, 600] },
  { id: 'entrada', nome: 'Entrada',  pos: [80, 158, 598],   look: [452, 112, 476] },
  { id: 'estar',   nome: 'Estar',    pos: [250, 158, 500],  look: [262, 104, 384] },
  { id: 'jantar',  nome: 'Jantar',   pos: [205, 158, 455],  look: [28, 104, 455] },
  { id: 'q1',      nome: 'Quarto 1', pos: [175, 158, 268],  look: [175, 98, 36] },
  { id: 'q2',      nome: 'Quarto 2', pos: [608, 158, 272],  look: [608, 98, 36] },
]

export const bom = (v, pedra, arm) => ([
  { grupo: 'Marmoraria — ' + FINISHES.pedra[pedra].nome, itens: [
    { item: 'Peça A — bancada da pia' + (v === 'B' ? ' e do cooktop' : ''), med: '2,14 × 0,60 m', qtd: '1,28 m²',
      obs: v === 'B' ? 'Recorte de cuba e de cooktop, mais o dente do SH-01' : 'Recorte de cuba e dente do SH-01' },
    { item: 'Peça B — bancada de fundo', med: '1,24 × 0,60 m', qtd: '0,74 m²', obs: 'Recorte do tanque de embutir' },
    { item: 'Peça C — bancada lateral', med: '0,54 × 0,60 m', qtd: '0,32 m²', obs: v === 'A' ? 'Recorte do cooktop' : 'Lisa' },
    { item: 'Peça E — tampo do banho', med: '1,23 × 0,45 m', qtd: '0,55 m²', obs: 'Mesma chapa' },
    { item: 'Frontão de 10 cm', med: '3,92 m linear', qtd: '0,39 m²', obs: 'Opcional — pode virar revestimento' },
    { item: 'Chapa de ' + FINISHES.pedra[pedra].nome, med: '2,80 × 1,80 m', qtd: '1 chapa',
      obs: FINISHES.pedra[pedra].preco + ' · tudo cabe em UMA chapa' },
    { item: 'Acabamento de borda', med: 'reta 2 cm polida', qtd: '—', obs: '40 a 60% mais barata que boleada e mais moderna' },
  ]},
  { grupo: 'Eletrodomésticos e louças', itens: [
    { item: 'Cooktop 4 bocas a gás · vidro preto', med: 'nicho ~55 × 48 cm', qtd: '1', obs: 'Fischer, Consul ou Electrolux · R$ 400 a 700' },
    { item: 'Extensão do ponto de gás', med: v === 'A' ? 'mais ou menos 1,2 m' : 'mais ou menos 1,8 m', qtd: '1',
      obs: 'Instalador credenciado · R$ 300 a 800' },
    { item: 'Depurador de recirculação', med: '60 cm', qtd: '1', obs: 'Sem duto, porque fachada é área comum · R$ 500 a 900' },
    { item: 'Cuba inox de embutir', med: '56 × 33 cm', qtd: '1', obs: 'No ponto de água existente' },
    { item: 'Tanque inox de embutir', med: '55 × 45 cm', qtd: '1', obs: 'Embutido na Peça B · Tramontina' },
    { item: 'Geladeira Inverse inox', med: 'nicho 85 cm', qtd: '1', obs: '400 a 490 L · R$ 3.500 a 5.000' },
    { item: 'Máquina de lavar', med: '60 cm', qtd: '1', obs: 'No nicho de serviço' },
    { item: 'Micro-ondas em nicho', med: 'mais ou menos 52 × 32 cm', qtd: '1', obs: 'Dentro da torre alta' },
  ]},
  { grupo: 'Modulados — ' + FINISHES.armario[arm].nome, itens: [
    { item: 'Gavetões sob a bancada da pia', med: '2,14 m linear', qtd: '3 mód.', obs: 'Gaveta aproveita o fundo; porta deixa espaço morto' },
    { item: 'Balcão sob o tanque', med: '0,55 m', qtd: '1 mód.', obs: 'Deixe o sifão acessível' },
    { item: 'Aéreos da parede de fundo', med: '1,24 m · altura 90 cm', qtd: '2 mód.', obs: 'Até o teto, com tamponamento' },
    { item: 'Torre alta', med: '0,60 × 0,60 × 2,20 m', qtd: '1', obs: 'Com nicho de micro-ondas e forno' },
    { item: 'Guarda-roupa do Quarto 1', med: '2,30 m', qtd: '1', obs: 'Vão de 2,40 m mais tamponamento' },
    { item: 'Guarda-roupa do Quarto 2', med: '1,40 m', qtd: '1', obs: 'Vão de 1,50 m mais tamponamento' },
    { item: 'Puxador cava ou perfil preto', med: '—', qtd: '1 cj.', obs: FINISHES.armario[arm].nota },
  ]},
  { grupo: 'Marcenaria sob medida', itens: [
    { item: 'Base do canto alemão', med: '1,50 × 0,45 × 0,45 m', qtd: '1', obs: 'MDF 18 mm, tampo baú com pistão a gás' },
    { item: 'Painel de TV', med: '1,55 × 1,20 × 0,12 m', qtd: '1', obs: 'Suspenso a 40 cm do piso, com passa-fios' },
    { item: 'Tamponamentos e réguas de arremate', med: '—', qtd: '1 cj.', obs: 'É o que faz modulado parecer planejado' },
  ]},
  { grupo: 'Móveis, estofaria e decoração', itens: [
    { item: 'Sofá sem braços', med: '2,20 × 0,85 m', qtd: '1', obs: 'Linho cinza claro · prazo de 30 a 45 dias' },
    { item: 'Almofadas do canto alemão', med: '1,50 m', qtd: '1 cj.', obs: 'Espuma D33 de 8 cm, tecido impermeabilizado' },
    { item: 'Mesa de jantar', med: '1,00 × 0,70 m', qtd: '1', obs: 'Madeira clara, pé central' },
    { item: 'Cadeiras', med: '0,45 × 0,45 m', qtd: '2', obs: 'Sem braços' },
    { item: 'Cama King e colchão', med: '1,93 × 2,03 m', qtd: '1', obs: 'Prédio sem elevador — prefira colchão a vácuo' },
    { item: 'Cama de casal e colchão', med: '1,38 × 1,88 m', qtd: '1', obs: 'Quarto 2' },
    { item: 'Fita de LED em perfil de alumínio', med: 'mais ou menos 10 m', qtd: '1 cj.', obs: '4000 K, sob os aéreos e no painel de TV' },
    { item: 'Tapete de trama baixa', med: '1,80 × 1,20 m', qtd: '1', obs: 'Até 10 mm para não travar porta' },
  ]},
])

export const PENDENCIAS = [
  { t: 'Parede cheia até a passagem dos quartos', d: 'Do canto da porta de entrada, ao longo da parede de frente. Até 3,30 m mantém este layout; acima de 3,60 m a TV pode ir entre as janelas.' },
  { t: 'Largura e posição da janela da cozinha', d: 'Define se o cooktop pode ficar na bancada da pia, na variante B, sem pegar corrente de ar.' },
  { t: 'Distância do ponto de gás aos cantos', d: 'Define o comprimento da extensão e a posição do recorte do cooktop na pedra.' },
  { t: 'Giro das três portas da circulação', d: 'Abra as três até o fim e confirme que nenhuma folha bate na outra. Se bater, inverta a dobradiça de uma.' },
  { t: 'Diagonal livre do patamar da escada', d: 'Mínimo de 2,10 m para subir colchão King inteiriço.' },
  { t: 'Largura e profundidade reais dos shafts', d: 'Define os dentes da pedra e a largura do box.' },
  { t: 'Pé-direito real', d: 'Adotei 2,50 m nas elevações. Confirme para fechar a altura dos aéreos e do tamponamento.' },
]

export const META = {
  obra: 'APTO “FINAL 02”',
  empreend: 'Residencial Gran Conquista',
  local: 'R. Tambaqui · Res. Aquários II · Goiânia/GO',
  area: '47–48 m² privativos · 40,8 m² úteis internos',
  escala: '1:50', rev: '04', data: 'AGO/2026',
}
