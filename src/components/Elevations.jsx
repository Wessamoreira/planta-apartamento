import { elevations, FINISHES } from '../data/plan'

const TIPO = (pedraCor, armCor, dark) => ({
  rodape:  { fill: dark ? '#2A343E' : '#D8D5CE', stroke: armCor.linha, dash: null },
  armario: { fill: armCor.cor,   stroke: armCor.linha, dash: null },
  pedra:   { fill: pedraCor.cor, stroke: pedraCor.linha, dash: null },
  eletro:  { fill: dark ? '#3B4854' : '#CBD5DE', stroke: '#8FC7E8', dash: null },
  janela:  { fill: '#CFE9FA',    stroke: '#4A90C2', dash: null },
  vao:     { fill: dark ? '#0E161D' : '#F0EEE9', stroke: '#7089A0', dash: '8 6' },
  shaft:   { fill: '#FF4A3D44',  stroke: '#FF4A3D', dash: '6 4' },
  madeira: { fill: '#C8A97E',    stroke: '#8A7350', dash: null },
})

function HCota({ c, color }) {
  const mx = (c.x1 + c.x2) / 2
  return (
    <g stroke={color} strokeWidth="1.1">
      <line x1={c.x1} y1={c.y} x2={c.x2} y2={c.y} />
      <line x1={c.x1} y1={c.y - 6} x2={c.x1} y2={c.y + 6} />
      <line x1={c.x2} y1={c.y - 6} x2={c.x2} y2={c.y + 6} />
      <text x={mx} y={c.y - 7} fill={color} stroke="none" fontSize="12" textAnchor="middle"
        fontFamily="'IBM Plex Mono', monospace">{c.txt}</text>
    </g>
  )
}

function VCota({ c, color, alt }) {
  const my = alt - (c.y1 + c.y2) / 2
  const y1 = alt - c.y1, y2 = alt - c.y2
  return (
    <g stroke={color} strokeWidth="1.1">
      <line x1={c.x} y1={y1} x2={c.x} y2={y2} />
      <line x1={c.x - 6} y1={y1} x2={c.x + 6} y2={y1} />
      <line x1={c.x - 6} y1={y2} x2={c.x + 6} y2={y2} />
      <text x={c.x - 8} y={my} fill={color} stroke="none" fontSize="12" textAnchor="middle"
        fontFamily="'IBM Plex Mono', monospace" transform={`rotate(-90 ${c.x - 8} ${my})`}>{c.txt}</text>
    </g>
  )
}

function Vista({ v, pedraCor, armCor, theme }) {
  const dark = theme === 'dark'
  const S = TIPO(pedraCor, armCor, dark)
  const bg = dark ? '#131C24' : '#FFFFFF'
  const line = theme === 'dark' ? '#8FA3B5' : '#2B3440'
  const txt = theme === 'dark' ? '#C9D6E2' : '#26333F'
  const dim = '#FF6B3D'
  const pad = 74

  return (
    <figure className="m-0 border border-edge bg-panel">
      <figcaption className="flex items-baseline gap-2 border-b border-edge px-3 py-2">
        <span className="font-mono text-[11px] text-cad">{v.id}</span>
        <span className="font-cond text-[16px] uppercase tracking-wider text-chalk">{v.titulo}</span>
        <span className="ml-auto font-mono text-[10px] text-mute">{v.larg} × {v.alt} cm</span>
      </figcaption>

      <div className="p-3">
        <svg viewBox={`${-pad} ${-pad} ${v.larg + pad * 2 + 40} ${v.alt + pad * 1.6}`} className="w-full">
          {/* piso e teto */}
          <line x1={-30} y1={v.alt} x2={v.larg + 30} y2={v.alt} stroke={line} strokeWidth="3" />
          <line x1={-30} y1={0} x2={v.larg + 30} y2={0} stroke={line} strokeWidth="3" />
          <text x={-34} y={v.alt + 4} fill={txt} fontSize="11" textAnchor="end" fontFamily="'IBM Plex Mono', monospace">piso</text>
          <text x={-34} y={4} fill={txt} fontSize="11" textAnchor="end" fontFamily="'IBM Plex Mono', monospace">teto</text>
          <rect x="0" y="0" width={v.larg} height={v.alt} fill={bg} stroke={line} strokeWidth="1.4" />

          {v.pecas.map((p, i) => {
            const st = S[p.t] || S.armario
            return (
              <g key={i}>
                <rect x={p.x} y={v.alt - p.y - p.h} width={p.w} height={p.h}
                  fill={st.fill} stroke={st.stroke} strokeWidth="1.5" strokeDasharray={st.dash || undefined} />
                {p.l && p.w > 34 && (p.h > 16 ? (
                  <text x={p.x + p.w / 2} y={v.alt - p.y - p.h / 2 + 4}
                    fill={p.t === 'pedra' ? pedraCor.linha : (p.t === 'eletro' ? '#BBD9EC' : (p.t === 'armario' ? armCor.linha : line))}
                    fontSize={p.h < 30 ? 9 : 11} textAnchor="middle" fontFamily="'Barlow Condensed', sans-serif"
                    letterSpacing=".6">{p.l}</text>
                ) : (
                  <text x={p.x + p.w / 2} y={v.alt - p.y - p.h - 5}
                    fill={p.t === 'pedra' ? pedraCor.linha : '#BBD9EC'}
                    fontSize="9.5" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace">{p.l}</text>
                ))}
              </g>
            )
          })}

          {v.cotas.map((c, i) => <HCota key={i} c={{ ...c, y: c.y }} color={dim} />)}
          {v.vcotas.map((c, i) => <VCota key={i} c={c} color={dim} alt={v.alt} />)}
        </svg>
      </div>

      <p className="border-t border-edge px-3 py-2 font-cond text-[14.5px] leading-snug text-mute">{v.nota}</p>
    </figure>
  )
}

export default function Elevations({ variant, pedra, armario, theme }) {
  const vistas = elevations(variant)
  const pedraCor = FINISHES.pedra[pedra]
  const armCor = FINISHES.armario[armario]

  return (
    <div className="h-full overflow-y-auto bg-ink p-3 md:p-5">
      <header className="mb-4 border-b border-edge pb-3">
        <h2 className="font-cond text-[20px] uppercase tracking-[0.18em] text-chalk">Elevações</h2>
        <p className="mt-1 max-w-2xl font-cond text-[15px] leading-snug text-mute">
          Vistas frontais de cada parede, cotadas. É o desenho que o marceneiro e a marmoraria
          realmente usam para orçar — a planta mostra onde, a elevação mostra a que altura.
          Cotas em centímetros, pé-direito adotado de 2,50 m.
        </p>
        <p className="mt-2 font-mono text-[11px] text-cad">
          Pedra: {pedraCor.nome} · Armários: {armCor.nome} · Variante {variant}
        </p>
      </header>

      <div className="grid gap-4 xl:grid-cols-2">
        {vistas.map(v => (
          <Vista key={v.id} v={v} pedraCor={pedraCor} armCor={armCor} theme={theme} />
        ))}
      </div>

      <p className="mt-4 border-l-4 border-plot bg-plot/10 p-3 font-cond text-[14.5px] leading-snug text-plot">
        Estas alturas valem para pé-direito de 2,50 m. Meça o seu antes de fechar a altura dos aéreos
        e do tamponamento — em prédio MRV a laje costuma variar de 2 a 4 cm de um canto ao outro do mesmo cômodo.
      </p>
    </div>
  )
}
