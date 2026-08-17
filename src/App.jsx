import { useState, useMemo } from 'react'
import Drawing from './components/Drawing'
import Elevations from './components/Elevations'
import Scene3D from './components/Scene3D'
import { LAYERS, ROOMS, bom, PENDENCIAS, META, FINISHES, COZINHA_VARIANTES } from './data/plan'

const VIEWS = [
  { id: 'planta', n: 'Planta' },
  { id: 'elev',   n: 'Elevações' },
  { id: 'tres',   n: 'Maquete 3D' },
]
const MODES = [
  { id: 'entrega',  n: 'Entrega' },
  { id: 'comparar', n: 'Comparar' },
  { id: 'projeto',  n: 'Projeto' },
]

function Swatch({ on, cor, borda, nome, sub, onClick }) {
  return (
    <button onClick={onClick}
      className={`flex w-full items-center gap-2.5 border p-2 text-left transition-colors
        ${on ? 'border-cad bg-cad/10' : 'border-edge2 hover:border-chalk/40'}`}>
      <span className="h-9 w-9 shrink-0 border" style={{ background: cor, borderColor: borda }} />
      <span className="min-w-0">
        <span className={`block font-cond text-[14.5px] leading-tight ${on ? 'text-cad' : 'text-chalk'}`}>{nome}</span>
        <span className="mt-0.5 block font-mono text-[9.5px] leading-tight text-mute">{sub}</span>
      </span>
    </button>
  )
}

export default function App() {
  const [view, setView] = useState('planta')
  const [layers, setLayers] = useState(Object.fromEntries(LAYERS.map(l => [l.id, l.id !== 'elet'])))
  const [mode, setMode] = useState('projeto')
  const [wipe, setWipe] = useState(50)
  const [tool, setTool] = useState('pan')
  const [theme, setTheme] = useState('dark')
  const [pedra, setPedra] = useState('ubatuba')
  const [armario, setArmario] = useState('branco')
  const [variant, setVariant] = useState('A')
  const [selected, setSelected] = useState(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [measure, setMeasure] = useState(null)
  const [tab, setTab] = useState('info')
  const [openL, setOpenL] = useState(false)
  const [openR, setOpenR] = useState(false)

  const toggle = id => setLayers(s => ({ ...s, [id]: !s[id] }))
  const allOn = () => setLayers(Object.fromEntries(LAYERS.map(l => [l.id, true])))
  const onlyBase = () => setLayers(Object.fromEntries(LAYERS.map(l => [l.id, ['arq', 'texto'].includes(l.id)])))

  const areaTotal = useMemo(() => ROOMS.reduce((s, r) => s + r.area, 0).toFixed(2), [])
  const lista = useMemo(() => bom(variant, pedra, armario), [variant, pedra, armario])
  const dist = measure?.a && measure?.b
    ? Math.round(Math.hypot(measure.b.x - measure.a.x, measure.b.y - measure.a.y)) : null

  const P = FINISHES.pedra[pedra]
  const A = FINISHES.armario[armario]
  const V = COZINHA_VARIANTES[variant]

  return (
    <div className="flex h-[100dvh] flex-col bg-ink text-chalk">
      <header className="shrink-0 border-b border-edge bg-panel">
        <div className="flex items-center gap-3 px-3 py-2 md:px-4">
          <div className="min-w-0 flex-1">
            <h1 className="truncate font-cond text-[16px] font-700 uppercase leading-none tracking-[0.2em] text-chalk md:text-[19px]">
              {META.obra}
            </h1>
            <p className="mt-1 truncate font-mono text-[9.5px] text-mute md:text-[11px]">
              {META.empreend} · {META.local} · Rev. {META.rev}
            </p>
          </div>
          <div className="flex items-center border border-edge2">
            {VIEWS.map(v => (
              <button key={v.id} onClick={() => setView(v.id)}
                className={`px-2.5 py-1.5 font-cond text-[12.5px] uppercase tracking-[0.1em] transition-colors md:px-3 md:text-[13px]
                  ${view === v.id ? 'bg-cad text-ink' : 'text-mute hover:text-chalk'}`}>{v.n}</button>
            ))}
          </div>
        </div>

        <div className="flex gap-1.5 overflow-x-auto border-t border-edge/60 px-3 py-1.5 md:px-4">
          {view === 'planta' && MODES.map(m => (
            <button key={m.id} onClick={() => setMode(m.id)}
              className={`shrink-0 border px-3 py-1.5 font-cond text-[13px] uppercase tracking-[0.14em] transition-colors
                ${mode === m.id ? 'border-cad bg-cad text-ink' : 'border-edge2 text-mute hover:text-chalk'}`}>{m.n}</button>
          ))}
          {view === 'planta' && (
            <>
              <button onClick={() => { setTool(t => t === 'medir' ? 'pan' : 'medir'); setMeasure(null) }}
                className={`shrink-0 border px-3 py-1.5 font-cond text-[13px] uppercase tracking-[0.14em]
                  ${tool === 'medir' ? 'border-cad bg-cad text-ink' : 'border-edge2 text-mute hover:text-chalk'}`}>Medir</button>
              <button onClick={() => window.__fitPlan?.()}
                className="shrink-0 border border-edge2 px-3 py-1.5 font-cond text-[13px] uppercase tracking-[0.14em] text-mute hover:text-chalk">Ajustar</button>
            </>
          )}
          <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
            className="shrink-0 border border-edge2 px-3 py-1.5 font-cond text-[13px] uppercase tracking-[0.14em] text-mute hover:text-chalk">
            {theme === 'dark' ? 'Papel' : 'Tela'}
          </button>
          <button onClick={() => setOpenL(v => !v)}
            className="shrink-0 border border-edge2 px-3 py-1.5 font-cond text-[13px] uppercase tracking-[0.14em] text-mute lg:hidden">Acabamentos</button>
          <button onClick={() => setOpenR(v => !v)}
            className="shrink-0 border border-edge2 px-3 py-1.5 font-cond text-[13px] uppercase tracking-[0.14em] text-mute lg:hidden">Ficha</button>
        </div>
      </header>

      <div className="relative flex min-h-0 flex-1">
        {/* ---------- PAINEL ESQUERDO ---------- */}
        <aside className={`absolute inset-y-0 left-0 z-20 w-[272px] shrink-0 overflow-y-auto border-r border-edge bg-panel
          transition-transform lg:static lg:translate-x-0 ${openL ? 'translate-x-0' : '-translate-x-full'}`}>

          <div className="border-b border-edge px-3 py-2">
            <span className="font-cond text-[13px] uppercase tracking-[0.22em] text-mute">Bancada</span>
          </div>
          <div className="space-y-1.5 p-2.5">
            {Object.values(FINISHES.pedra).map(p => (
              <Swatch key={p.id} on={pedra === p.id} cor={p.cor} borda={p.linha}
                nome={p.nome} sub={p.preco} onClick={() => setPedra(p.id)} />
            ))}
          </div>

          <div className="border-y border-edge px-3 py-2">
            <span className="font-cond text-[13px] uppercase tracking-[0.22em] text-mute">Armários</span>
          </div>
          <div className="space-y-1.5 p-2.5">
            {Object.values(FINISHES.armario).map(a => (
              <Swatch key={a.id} on={armario === a.id} cor={a.cor} borda={a.linha}
                nome={a.nome} sub="MDF · puxador cava" onClick={() => setArmario(a.id)} />
            ))}
          </div>

          <div className="border-y border-edge px-3 py-2">
            <span className="font-cond text-[13px] uppercase tracking-[0.22em] text-mute">Posição do cooktop</span>
          </div>
          <div className="space-y-1.5 p-2.5">
            {Object.values(COZINHA_VARIANTES).map(v => (
              <button key={v.id} onClick={() => setVariant(v.id)}
                className={`block w-full border p-2 text-left transition-colors
                  ${variant === v.id ? 'border-cad bg-cad/10' : 'border-edge2 hover:border-chalk/40'}`}>
                <span className="flex items-baseline gap-2">
                  <span className="font-mono text-[10px] text-cad">{v.id}</span>
                  <span className={`font-cond text-[14.5px] leading-tight ${variant === v.id ? 'text-cad' : 'text-chalk'}`}>{v.nome}</span>
                </span>
                <span className="mt-1 block font-cond text-[13px] leading-snug text-mute">{v.resumo}</span>
              </button>
            ))}
          </div>

          {view === 'planta' && (
            <>
              <div className="flex items-center justify-between border-y border-edge px-3 py-2">
                <span className="font-cond text-[13px] uppercase tracking-[0.22em] text-mute">Camadas</span>
                <span className="flex gap-1">
                  <button onClick={allOn} className="font-mono text-[10px] text-mute hover:text-cad">TUDO</button>
                  <span className="text-edge2">|</span>
                  <button onClick={onlyBase} className="font-mono text-[10px] text-mute hover:text-cad">BASE</button>
                </span>
              </div>
              <ul>
                {LAYERS.map(l => (
                  <li key={l.id}>
                    <button onClick={() => toggle(l.id)}
                      className="flex w-full items-start gap-2.5 border-b border-edge/60 px-3 py-2 text-left hover:bg-panel2">
                      <span className="mt-[3px] flex h-3.5 w-3.5 shrink-0 items-center justify-center border"
                        style={{ borderColor: l.cor, background: layers[l.id] ? l.cor : 'transparent' }}>
                        {layers[l.id] && <span className="block h-1.5 w-1.5 bg-ink" />}
                      </span>
                      <span className="min-w-0">
                        <span className={`block font-mono text-[11.5px] ${layers[l.id] ? 'text-chalk' : 'text-mute line-through decoration-mute/50'}`}>{l.nome}</span>
                        <span className="mt-0.5 block font-cond text-[12px] leading-tight text-mute">{l.desc}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="border-y border-edge px-3 py-2">
            <span className="font-cond text-[13px] uppercase tracking-[0.22em] text-mute">Ambientes</span>
          </div>
          <ul className="pb-6">
            {ROOMS.map(r => (
              <li key={r.id}>
                <button onClick={() => { setSelected({ ...r, kind: 'ambiente' }); setTab('info'); setOpenL(false); setOpenR(true) }}
                  className={`flex w-full items-baseline justify-between border-b border-edge/60 px-3 py-1.5 text-left hover:bg-panel2
                    ${selected?.id === r.id ? 'bg-panel2' : ''}`}>
                  <span className="font-cond text-[14px] uppercase tracking-wider text-chalk">{r.nome}</span>
                  <span className="font-mono text-[11px] text-mute">{r.area.toFixed(2)} m²</span>
                </button>
              </li>
            ))}
            <li className="flex items-baseline justify-between px-3 py-2">
              <span className="font-cond text-[13px] uppercase tracking-[0.18em] text-mute">Útil interno</span>
              <span className="font-mono text-[12px] text-cad">{areaTotal} m²</span>
            </li>
          </ul>
        </aside>

        {/* ---------- CENTRO ---------- */}
        <main className="relative min-w-0 flex-1">
          {view === 'planta' && (
            <>
              <Drawing
                layers={layers} mode={mode} wipe={wipe} setWipe={setWipe}
                tool={tool} theme={theme} selected={selected}
                onSelect={o => { setSelected(o); if (o) { setTab('info'); setOpenR(true) } }}
                onCursor={setCursor} measure={measure} setMeasure={setMeasure}
                variant={variant} pedra={pedra} armario={armario}
              />
              {tool === 'medir' && (
                <div className="pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 border border-cad bg-ink/90 px-3 py-1.5 font-mono text-[11px] text-cad">
                  {!measure?.a ? 'Clique no primeiro ponto' : (!measure.b ? 'Clique no segundo ponto' : `${dist} cm — clique para medir de novo`)}
                </div>
              )}
            </>
          )}
          {view === 'elev' && <Elevations variant={variant} pedra={pedra} armario={armario} theme={theme} />}
          {view === 'tres' && <Scene3D variant={variant} pedra={pedra} armario={armario} theme={theme} />}
        </main>

        {/* ---------- PAINEL DIREITO ---------- */}
        <aside className={`absolute inset-y-0 right-0 z-20 flex w-[304px] shrink-0 flex-col border-l border-edge bg-panel
          transition-transform lg:static lg:translate-x-0 ${openR ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex shrink-0 border-b border-edge">
            {[['info', 'Ficha'], ['bom', 'Materiais'], ['pend', 'Pendências']].map(([id, n]) => (
              <button key={id} onClick={() => setTab(id)}
                className={`flex-1 whitespace-nowrap px-1 py-2 font-cond text-[12.5px] uppercase tracking-[0.08em]
                  ${tab === id ? 'border-b-2 border-cad text-chalk' : 'text-mute hover:text-chalk'}`}>{n}</button>
            ))}
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto">
            {tab === 'info' && (selected ? (
              <div className="p-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cad">{selected.kind}</p>
                <h2 className="mt-1 font-cond text-[21px] font-600 uppercase leading-tight tracking-wide text-chalk">
                  {selected.nome || selected.label}
                </h2>
                {(selected.spec || selected.dims) && (
                  <p className="mt-2 border-l-2 border-cad/50 pl-2.5 font-mono text-[11.5px] leading-relaxed text-chalk/90">
                    {selected.spec || `${selected.dims} m · ${selected.area?.toFixed(2)} m²`}
                  </p>
                )}
                {(selected.detalhe || selected.nota) && (
                  <p className="mt-3 font-cond text-[15px] leading-snug text-mute">{selected.detalhe || selected.nota}</p>
                )}
                {selected.stone && (
                  <p className="mt-3 border p-2 font-cond text-[14px] leading-snug"
                    style={{ borderColor: P.linha, background: P.cor + '22', color: P.linha }}>
                    Peça {selected.stone} em {P.nome}. Tudo cabe em uma chapa de 2,80 × 1,80 m — leve o plano de corte impresso à marmoraria.
                  </p>
                )}
                <button onClick={() => setSelected(null)}
                  className="mt-4 font-mono text-[10px] uppercase tracking-widest text-mute hover:text-cad">← voltar à ficha geral</button>
              </div>
            ) : (
              <div className="p-3">
                <h3 className="font-cond text-[13px] uppercase tracking-[0.22em] text-mute">Acabamento escolhido</h3>
                <div className="mt-2 border border-edge2 p-2.5">
                  <p className="font-cond text-[16px] leading-tight text-chalk">{P.nome}</p>
                  <p className="mt-1 font-mono text-[10px] text-cad">{P.preco}</p>
                  <p className="mt-2 font-cond text-[14px] leading-snug text-mute">{P.resumo}</p>
                  <p className="mt-2 border-l-2 border-lime/60 pl-2 font-cond text-[14px] leading-snug text-lime">{P.pro}</p>
                  <p className="mt-2 border-l-2 border-plot/60 pl-2 font-cond text-[14px] leading-snug text-plot">{P.contra}</p>
                </div>
                <div className="mt-2 border border-edge2 p-2.5">
                  <p className="font-cond text-[16px] leading-tight text-chalk">Armários {A.nome}</p>
                  <p className="mt-1.5 font-cond text-[14px] leading-snug text-mute">{A.nota}</p>
                </div>

                <h3 className="mt-4 font-cond text-[13px] uppercase tracking-[0.22em] text-mute">Variante {V.id}</h3>
                <div className="mt-2 border border-edge2 p-2.5">
                  <p className="font-cond text-[16px] leading-tight text-chalk">{V.nome}</p>
                  <p className="mt-2 border-l-2 border-lime/60 pl-2 font-cond text-[14px] leading-snug text-lime">{V.pro}</p>
                  <p className="mt-2 border-l-2 border-plot/60 pl-2 font-cond text-[14px] leading-snug text-plot">{V.contra}</p>
                </div>

                <dl className="mt-4 border-t border-edge">
                  {[['Área privativa', META.area], ['Escala', META.escala], ['Revisão', META.rev], ['Unidade', 'centímetros']].map(([k, v]) => (
                    <div key={k} className="border-b border-edge py-1.5">
                      <dt className="font-cond text-[12.5px] uppercase tracking-[0.16em] text-mute">{k}</dt>
                      <dd className="mt-0.5 font-mono text-[11px] leading-snug text-chalk">{v}</dd>
                    </div>
                  ))}
                </dl>

                <h3 className="mt-5 font-cond text-[13px] uppercase tracking-[0.22em] text-mute">Cadernos do projeto</h3>
                <ul className="mt-1 border-t border-edge">
                  {[
                    ['rev01-projeto-executivo.pdf', 'Rev. 01 — Projeto executivo', 'Memorial da marmoraria, plano de corte, orçamento e cronograma'],
                    ['rev02-ajuste-fino.pdf', 'Rev. 02 — Ajuste fino', 'Pré-moldada, coifa sem duto, cama King sem elevador'],
                    ['rev03-layout-corrigido.pdf', 'Rev. 03 — Layout corrigido', 'Referencial do proprietário e ponto de gás'],
                  ].map(([f, t, d]) => (
                    <li key={f} className="border-b border-edge">
                      <a href={`docs/${f}`} target="_blank" rel="noreferrer" className="block py-2 hover:bg-panel2">
                        <span className="font-cond text-[15px] leading-tight text-cad">{t} ↗</span>
                        <span className="mt-0.5 block font-cond text-[13.5px] leading-snug text-mute">{d}</span>
                      </a>
                    </li>
                  ))}
                </ul>

                <p className="mt-4 border border-plot/40 bg-plot/10 p-2 font-cond text-[14px] leading-snug text-plot">
                  Medidas vindas da planta de venda. Nada pode ser cortado, fabricado ou demolido antes da medição no local.
                </p>
              </div>
            ))}

            {tab === 'bom' && (
              <div className="pb-6">
                {lista.map(g => (
                  <section key={g.grupo}>
                    <h3 className="sticky top-0 border-y border-edge bg-panel2 px-3 py-1.5 font-cond text-[13px] uppercase tracking-[0.16em] text-cad">
                      {g.grupo}
                    </h3>
                    <ul>
                      {g.itens.map(i => (
                        <li key={i.item} className="border-b border-edge/60 px-3 py-2">
                          <div className="flex items-baseline justify-between gap-2">
                            <span className="font-cond text-[15px] leading-tight text-chalk">{i.item}</span>
                            <span className="shrink-0 font-mono text-[11px] text-cad">{i.qtd}</span>
                          </div>
                          <div className="mt-0.5 font-mono text-[10.5px] text-mute">{i.med}</div>
                          {i.obs && <div className="mt-1 font-cond text-[13.5px] leading-snug text-mute">{i.obs}</div>}
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            )}

            {tab === 'pend' && (
              <ul className="pb-6">
                {PENDENCIAS.map((p, i) => (
                  <li key={p.t} className="border-b border-edge/60 px-3 py-2.5">
                    <div className="flex gap-2">
                      <span className="mt-[3px] font-mono text-[10px] text-plot">{String(i + 1).padStart(2, '0')}</span>
                      <div>
                        <div className="font-cond text-[15px] leading-tight text-chalk">{p.t}</div>
                        <div className="mt-1 font-cond text-[13.5px] leading-snug text-mute">{p.d}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        {(openL || openR) && (
          <div className="absolute inset-0 z-10 bg-ink/60 lg:hidden" onClick={() => { setOpenL(false); setOpenR(false) }} />
        )}
      </div>

      <footer className="flex shrink-0 items-center gap-3 overflow-x-auto border-t border-edge bg-panel px-3 py-1.5 font-mono text-[10.5px] text-mute">
        {view === 'planta' ? (
          <>
            <span className="text-cad">X {String(cursor.x).padStart(4, ' ')}</span>
            <span className="text-cad">Y {String(cursor.y).padStart(4, ' ')}</span>
            <span className="text-edge2">│</span>
            <span>{tool === 'medir' ? 'MEDIR' : 'NAVEGAR'}</span>
            <span className="text-edge2">│</span>
            <span>{dist !== null ? <span className="text-cad">DIST {dist} cm</span> : 'DIST —'}</span>
          </>
        ) : (
          <span className="text-cad">{view === 'elev' ? 'ELEVAÇÕES · PÉ-DIREITO 250 cm' : 'MAQUETE 3D · ESCALA REAL'}</span>
        )}
        <span className="text-edge2 hidden sm:inline">│</span>
        <span className="hidden sm:inline">VAR {variant}</span>
        <span className="ml-auto hidden shrink-0 md:inline">Rev. {META.rev} · {META.data}</span>
      </footer>
    </div>
  )
}
