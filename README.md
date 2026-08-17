# Planta Interativa — Apto “Final 02”

Visualizador do projeto de interiores do apartamento Final 02 do Residencial
Gran Conquista (R. Tambaqui, Res. Aquários II, Goiânia/GO).

Feito para levar na marmoraria, na loja de modulados e no marceneiro: cada peça
é clicável e mostra a especificação que vai no orçamento.

## Três vistas

**Planta** — desenho técnico em escala, com 11 camadas ligáveis (paredes, cotas,
mobiliário por ambiente, peças de pedra, água/gás, elétrica, circulação e
prumadas). Régua de comparação sobrepõe o **Projeto** sobre a **Entrega da
construtora**. Ferramenta de medir dá a distância em centímetros entre dois cliques.

**Elevações** — vistas frontais cotadas de cada parede da cozinha e do painel de
TV. É o desenho que o marceneiro usa de verdade: a planta mostra onde, a
elevação mostra a que altura.

**Maquete 3D** — o apartamento em volume, na escala real. Em *Órbita* você vê a
planta em maquete aberta; em *Caminhar* você anda por dentro (arraste para olhar,
W A S D ou as setas para andar, e o D-pad no canto para o toque). Os botões de
ponto de vista teleportam para cada ambiente.

## Escolhas que dá para testar ao vivo

- **Bancada**: Granito Branco Itaúnas ou Verde Ubatuba escovado
- **Armários**: Branco fosco ou Grafite fosco
- **Posição do cooktop**: variante A (no canto da pia) ou B (na mesma bancada da pia)

Qualquer troca atualiza a planta, as elevações, a maquete 3D e a lista de
materiais ao mesmo tempo.

## Rodar localmente

```bash
npm install
npm run dev
```

## Publicar no Netlify

**Opção 1 — arrastar (mais rápido)**
Rode `npm run build` e arraste a pasta `dist/` para
[app.netlify.com/drop](https://app.netlify.com/drop).

**Opção 2 — conectar o repositório**
Suba para o GitHub e conecte no Netlify. O `netlify.toml` já traz build
`npm run build`, publish `dist`, Node 20 e o redirect de SPA.

## Onde mexer

Toda a geometria e todo o texto ficam em **`src/data/plan.js`**, em centímetros,
com a origem no canto superior esquerdo da projeção externa. Mudou uma medida na
visita? Edite lá e as três vistas mais a lista de materiais acompanham sozinhas.

Referencial adotado: fachada embaixo (porta de entrada, janela da sala e janela
da cozinha), cozinha à direita, quartos em cima. As três portas da circulação —
Quarto 1, Quarto 2 e banho — abrem para dentro dos ambientes.

## Aviso

As medidas vêm da planta de venda e do levantamento em campo. Nada pode ser
cortado, fabricado ou demolido antes da medição presencial pelo próprio
fornecedor. Intervenções em prumada, gás, fachada ou estrutura exigem
profissional habilitado e autorização do condomínio.
