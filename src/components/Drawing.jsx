import { useRef, useState, useEffect, useCallback } from 'react'
import {
  SHEET, ROOMS, WALL_PATCHES, OPENINGS, DOOR_SWINGS, furniture, DELIVERED,
  POINTS, SHAFTS, CIRCULATION, DIMS, LAYERS, META, FINISHES, GAS_RUN,
} from '../data/plan'

const C = Object.fromEntries(LAYERS.map(l => [l.id, l.cor]))

function polar(cx, cy, r, deg) {
  const a = (deg * Math.PI) / 180
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
}

function Arc({ cx, cy, r, a0, a1, stroke }) {
  const [x0, y0] = polar(cx, cy, r, a0)
  const [x1, y1] = polar(cx, cy, r, a1)
  return (
    <>
      <path d={`M ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}`} fill="none" stroke={stroke} strokeWidth="1.6" opacity=".55" />
      <line x1={cx} y1={cy} x2={x0} y2={y0} stroke={stroke} strokeWidth="2.4" />
    </>
  )
}

function Dim({ d, color }) {
  const horiz = d.side === 'h'
  const mx = (d.x1 + d.x2) / 2
  const my = (d.y1 + d.y2) / 2
  return (
    <g stroke={color} strokeWidth="1.1">
      <line x1={d.x1} y1={d.y1} x2={d.x2} y2={d.y2} />
      {horiz ? (
        <>
          <line x1={d.x1} y1={d.y1 - 7} x2={d.x1} y2={d.y1 + 7} />
          <line x1={d.x2} y1={d.y2 - 7} x2={d.x2} y2={d.y2 + 7} />
        </>
      ) : (
        <>
          <line x1={d.x1 - 7} y1={d.y1} x2={d.x1 + 7} y2={d.y1} />
          <line x1={d.x2 - 7} y1={d.y2} x2={d.x2 + 7} y2={d.y2} />
        </>
      )}
      <text
        x={horiz ? mx : mx - 9} y={horiz ? my - 8 : my}
        fill={color} stroke="none" fontSize="15" textAnchor="middle"
        fontFamily="'IBM Plex Mono', monospace"
        transform={horiz ? undefined : `rotate(-90 ${mx - 9} ${my})`}
      >{d.txt}</text>
    </g>
  )
}

export default function Drawing({
  layers, mode, wipe, setWipe, tool, theme,
  selected, onSelect, onCursor, measure, setMeasure,
  variant, pedra, armario,
}) {
  const FURNITURE = furniture(variant)
  const PED = FINISHES.pedra[pedra]
  const ARM = FINISHES.armario[armario]
  const svgRef = useRef(null)
  const [view, setView] = useState({ x: -62, y: -58, w: SHEET.w + 172, h: SHEET.h + 196 })
  const drag = useRef(null)

  const bg = theme === 'dark' ? '#0C1218' : '#F2EFE7'
  const voidFill = theme === 'dark' ? '#131C24' : '#FFFFFF'
  const wallFill = theme === 'dark' ? '#2C3D4A' : '#1D2A33'
  const txt = theme === 'dark' ? '#C9D6E2' : '#26333F'
  const muted = theme === 'dark' ? '#5C7387' : '#7A8794'
  const grid = theme === 'dark' ? '#1B2831' : '#E2DDD1'

  const toPlan = useCallback((ev) => {
    const svg = svgRef.current
    if (!svg) return { x: 0, y: 0 }
    const r = svg.getBoundingClientRect()
    const cx = (ev.touches ? ev.touches[0].clientX : ev.clientX) - r.left
    const cy = (ev.touches ? ev.touches[0].clientY : ev.clientY) - r.top
    const sc = Math.max(view.w / r.width, view.h / r.height)
    const ox = (r.width * sc - view.w) / 2
    const oy = (r.height * sc - view.h) / 2
    return { x: Math.round(view.x - ox + cx * sc), y: Math.round(view.y - oy + cy * sc) }
  }, [view])

  const onWheel = useCallback((ev) => {
    ev.preventDefault()
    const p = toPlan(ev)
    const k = ev.deltaY > 0 ? 1.12 : 1 / 1.12
    setView(v => {
      const nw = Math.min(Math.max(v.w * k, 160), 4200)
      const s = nw / v.w
      return { x: p.x - (p.x - v.x) * s, y: p.y - (p.y - v.y) * s, w: nw, h: v.h * s }
    })
  }, [toPlan])

  useEffect(() => {
    const el = svgRef.current
    if (!el) return
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [onWheel])

  const down = (ev) => {
    ev.currentTarget.setPointerCapture?.(ev.pointerId)
    if (tool === 'medir') {
      const p = toPlan(ev)
      setMeasure(m => (!m || m.b ? { a: p, b: null } : { ...m, b: p }))
      return
    }
    drag.current = { sx: ev.clientX, sy: ev.clientY, vx: view.x, vy: view.y }
  }
  const move = (ev) => {
    const p = toPlan(ev)
    onCursor(p)
    if (tool === 'medir' && measure && !measure.b) setMeasure(m => ({ ...m, hover: p }))
    if (!drag.current) return
    const el = svgRef.current.getBoundingClientRect()
    const sc = Math.max(view.w / el.width, view.h / el.height)
    setView(v => ({
      ...v,
      x: drag.current.vx - (ev.clientX - drag.current.sx) * sc,
      y: drag.current.vy - (ev.clientY - drag.current.sy) * sc,
    }))
  }
  const up = () => { drag.current = null }

  const zoom = (k) => setView(v => {
    const cx = v.x + v.w / 2, cy = v.y + v.h / 2
    const nw = Math.min(Math.max(v.w * k, 160), 4200), s = nw / v.w
    return { x: cx - v.w * s / 2, y: cy - v.h * s / 2, w: nw, h: v.h * s }
  })

  const fit = () => setView({ x: -62, y: -58, w: SHEET.w + 172, h: SHEET.h + 196 })
  useEffect(() => { window.__fitPlan = fit }, [])

  const on = id => layers[id]
  const wipeX = (wipe / 100) * SHEET.w
  const showProj = (x) => mode === 'projeto' || (mode === 'comparar' && x >= wipeX)
  const showEntrega = (x) => mode === 'entrega' || (mode === 'comparar' && x < wipeX)

  const pick = (e, obj, kind) => { e.stopPropagation(); onSelect({ ...obj, kind }) }
  const isSel = id => selected?.id === id

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: bg }}>
      <svg
        ref={svgRef}
        className={`h-full w-full ${tool === 'medir' ? 'cursor-crosshair' : 'cursor-grab active:cursor-grabbing'}`}
        viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
        preserveAspectRatio="xMidYMid meet"
        onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up} onPointerCancel={up}
        style={{ touchAction: 'none' }}
        onClick={() => tool !== 'medir' && onSelect(null)}
      >
        <defs>
          <pattern id="g50" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M50 0 L0 0 0 50" fill="none" stroke={grid} strokeWidth="0.7" />
          </pattern>
          <pattern id="hatchStone" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke={C.pedra} strokeWidth="1.6" opacity=".8" />
          </pattern>
          <clipPath id="clipL"><rect x={-400} y={-400} width={wipeX + 400} height={2000} /></clipPath>
          <clipPath id="clipR"><rect x={wipeX} y={-400} width={2000} height={2000} /></clipPath>
        </defs>

        <rect x="-500" y="-500" width="2400" height="2200" fill="url(#g50)" opacity={theme === 'dark' ? '.75' : '.6'} />

        {/* ============ MASSA DE PAREDE ============ */}
        {on('arq') && (
          <g>
            <rect x="0" y="0" width={SHEET.w} height={SHEET.h} fill={wallFill} />
            {WALL_PATCHES.map((p, i) => <rect key={i} {...p} fill={wallFill} />)}
            {ROOMS.map(r => (
              <rect key={r.id} x={r.x} y={r.y} width={r.w} height={r.h}
                fill={voidFill} stroke={C.arq} strokeWidth="1.6" strokeOpacity=".55" />
            ))}
            {OPENINGS.map(o => (
              <rect key={o.id} x={o.x} y={o.y} width={o.w} height={o.h}
                fill={voidFill} stroke={o.tipo === 'janela' ? C.arq : 'none'} strokeWidth={o.tipo === 'janela' ? 2.5 : 0} />
            ))}
            {OPENINGS.filter(o => o.tipo === 'janela').map(o => {
              const horizontal = o.w > o.h
              const cx = o.x + o.w / 2, cy = o.y + o.h / 2
              // Duas folhas e montante central: símbolo técnico de janela,
              // deixando clara a mureta abaixo da abertura.
              return (
                <g key={'w' + o.id} stroke="#6FD3FF" strokeWidth="2.2">
                  <line x1={horizontal ? o.x : cx} y1={horizontal ? cy : o.y}
                    x2={horizontal ? o.x + o.w : cx} y2={horizontal ? cy : o.y + o.h} />
                  {horizontal ? (
                    <>
                      <line x1={o.x + o.w * 0.06} y1={o.y + 2.5} x2={o.x + o.w * 0.46} y2={o.y + 2.5} />
                      <line x1={o.x + o.w * 0.54} y1={o.y + o.h - 2.5} x2={o.x + o.w * 0.94} y2={o.y + o.h - 2.5} />
                      <line x1={cx} y1={o.y + 1.5} x2={cx} y2={o.y + o.h - 1.5} />
                    </>
                  ) : (
                    <>
                      <line x1={o.x + 2.5} y1={o.y + o.h * 0.06} x2={o.x + 2.5} y2={o.y + o.h * 0.46} />
                      <line x1={o.x + o.w - 2.5} y1={o.y + o.h * 0.54} x2={o.x + o.w - 2.5} y2={o.y + o.h * 0.94} />
                      <line x1={o.x + 1.5} y1={cy} x2={o.x + o.w - 1.5} y2={cy} />
                    </>
                  )}
                </g>
              )
            })}
            {DOOR_SWINGS.map((d, i) => <Arc key={i} {...d} stroke="#6FD3FF" />)}
            {ROOMS.map(r => (
              <rect key={'o' + r.id} x={r.x} y={r.y} width={r.w} height={r.h}
                fill="transparent" stroke="none"
                onClick={e => pick(e, r, 'ambiente')} className="cursor-pointer" />
            ))}
            {ROOMS.filter(r => isSel(r.id)).map(r => (
              <rect key={'s' + r.id} x={r.x} y={r.y} width={r.w} height={r.h}
                fill="#6FD3FF" opacity=".10" stroke="#6FD3FF" strokeWidth="2.5" strokeDasharray="10 6" />
            ))}
          </g>
        )}

        {/* ============ CIRCULAÇÃO ============ */}
        {on('circ') && CIRCULATION.map(c => (
          <g key={c.id} onClick={e => pick(e, c, 'circulação')} className="cursor-pointer">
            <rect x={c.x} y={c.y} width={c.w} height={c.h} fill={C.circ} opacity=".10" />
            <rect x={c.x} y={c.y} width={c.w} height={c.h} fill="none" stroke={C.circ} strokeWidth="1.2" strokeDasharray="8 6" opacity=".7" />
          </g>
        ))}

        {/* ============ ENTREGA (esquerda do wipe) ============ */}
        <g clipPath={mode === 'comparar' ? 'url(#clipL)' : undefined}
           style={{ display: (mode === 'entrega' || mode === 'comparar') ? 'block' : 'none' }}>
          {DELIVERED.map(d => (
            <g key={d.id} onClick={e => pick(e, d, 'entrega')} className="cursor-pointer">
              <rect x={d.x} y={d.y} width={d.w} height={d.h} fill="#B9C6D2" opacity=".30" stroke="#B9C6D2" strokeWidth="1.8" />
              <text x={d.x + d.w / 2} y={d.y + d.h / 2 + 5} fill="#B9C6D2" fontSize="13"
                textAnchor="middle" fontFamily="'Barlow Condensed', sans-serif" letterSpacing="1">PRÉ-MOLDADA</text>
            </g>
          ))}
        </g>

        {/* ============ PROJETO (direita do wipe) ============ */}
        <g clipPath={mode === 'comparar' ? 'url(#clipR)' : undefined}
           style={{ display: (mode === 'projeto' || mode === 'comparar') ? 'block' : 'none' }}>

          {FURNITURE.filter(f => on(f.layer)).map(f => {
            const col = C[f.layer]
            const stone = f.stone && on('pedra')
            return (
              <g key={f.id} onClick={e => pick(e, f, 'mobiliário')} className="cursor-pointer">
                <rect x={f.x} y={f.y} width={f.w} height={f.h}
                  fill={stone ? PED.cor : (f.mat === 'armario' ? ARM.cor : col)}
                  fillOpacity={stone ? 0.9 : (f.mat === 'armario' ? 0.85 : (f.mat === 'eletro' ? 0.10 : 0.18))}
                  stroke={isSel(f.id) ? '#6FD3FF' : (stone ? PED.linha : (f.mat === 'armario' ? ARM.linha : col))}
                  strokeWidth={isSel(f.id) ? 3.2 : 1.8}
                  strokeDasharray={f.dashed ? '7 5' : undefined} />
                {f.stone && on('pedra') && (
                  <text x={f.x + f.w - 9} y={f.y + 17} fill={PED.linha} fontSize="15" textAnchor="end"
                    fontFamily="'IBM Plex Mono', monospace" fontWeight="600">{f.stone}</text>
                )}
              </g>
            )
          })}

          {on('shafts') && SHAFTS.map(s => (
            <g key={s.id} onClick={e => pick(e, s, 'prumada')} className="cursor-pointer">
              <rect x={s.x} y={s.y} width={s.w} height={s.h} fill={C.shafts} opacity=".85" />
              <line x1={s.x} y1={s.y} x2={s.x + s.w} y2={s.y + s.h} stroke={bg} strokeWidth="1.4" />
              <line x1={s.x + s.w} y1={s.y} x2={s.x} y2={s.y + s.h} stroke={bg} strokeWidth="1.4" />
            </g>
          ))}

          {on('hidr') && (
            <g pointerEvents="none">
              <polyline points={GAS_RUN[variant].map(p => p.join(',')).join(' ')}
                fill="none" stroke={C.hidr} strokeWidth="2.4" strokeDasharray="10 6" />
              <text x={GAS_RUN[variant][1][0] + 8} y={GAS_RUN[variant][1][1] + 26} fill={C.hidr} fontSize="12"
                fontFamily="'IBM Plex Mono', monospace">extensão do gás</text>
            </g>
          )}

          {POINTS.filter(p => on(p.layer)).map(p => (
            <g key={p.id} onClick={e => pick(e, p, 'instalação')} className="cursor-pointer">
              <circle cx={p.x} cy={p.y} r="11" fill={bg} stroke={C[p.layer]} strokeWidth="2.2" />
              <circle cx={p.x} cy={p.y} r="3.4" fill={C[p.layer]} />
              <text x={p.x + 16} y={p.y + 5} fill={C[p.layer]} fontSize="13"
                fontFamily="'IBM Plex Mono', monospace">{p.tipo}</text>
            </g>
          ))}
        </g>

        {/* ============ TEXTO DOS AMBIENTES ============ */}
        {on('texto') && ROOMS.map(r => (
          <g key={'t' + r.id} pointerEvents="none">
            <text x={r.x + r.w / 2} y={r.y + r.h / 2 - 6} fill={txt} fontSize="19"
              textAnchor="middle" fontFamily="'Barlow Condensed', sans-serif"
              fontWeight="600" letterSpacing="1.6">{r.nome.toUpperCase()}</text>
            <text x={r.x + r.w / 2} y={r.y + r.h / 2 + 14} fill={muted} fontSize="14"
              textAnchor="middle" fontFamily="'IBM Plex Mono', monospace">{r.dims} · {r.area.toFixed(2)} m²</text>
          </g>
        ))}

        {/* ============ COTAS ============ */}
        {on('cotas') && DIMS.map((d, i) => <Dim key={i} d={d} color={C.cotas} />)}

        {/* ============ MEDIÇÃO ============ */}
        {measure?.a && (() => {
          const b = measure.b || measure.hover
          if (!b) return null
          const dist = Math.round(Math.hypot(b.x - measure.a.x, b.y - measure.a.y))
          return (
            <g pointerEvents="none">
              <line x1={measure.a.x} y1={measure.a.y} x2={b.x} y2={b.y} stroke="#6FD3FF" strokeWidth="2" strokeDasharray="9 5" />
              <circle cx={measure.a.x} cy={measure.a.y} r="5" fill="#6FD3FF" />
              <circle cx={b.x} cy={b.y} r="5" fill="#6FD3FF" />
              <rect x={(measure.a.x + b.x) / 2 - 42} y={(measure.a.y + b.y) / 2 - 32} width="84" height="24" rx="3"
                fill={bg} stroke="#6FD3FF" strokeWidth="1.4" />
              <text x={(measure.a.x + b.x) / 2} y={(measure.a.y + b.y) / 2 - 15} fill="#6FD3FF" fontSize="15"
                textAnchor="middle" fontFamily="'IBM Plex Mono', monospace">{dist} cm</text>
            </g>
          )
        })()}

        {/* ============ LINHA DO WIPE ============ */}
        {mode === 'comparar' && (
          <g pointerEvents="none">
            <line x1={wipeX} y1={-400} x2={wipeX} y2={1200} stroke="#6FD3FF" strokeWidth="2.2" />
            <text x={wipeX - 12} y={-46} fill="#8FA3B5" fontSize="15" textAnchor="end"
              fontFamily="'Barlow Condensed', sans-serif" letterSpacing="2.4">ENTREGA</text>
            <text x={wipeX + 12} y={-46} fill="#6FD3FF" fontSize="15"
              fontFamily="'Barlow Condensed', sans-serif" letterSpacing="2.4">PROJETO</text>
          </g>
        )}

        {/* ============ CARIMBO ============ */}
        <g transform={`translate(${SHEET.w - 262}, ${SHEET.h + 46})`} pointerEvents="none">
          <rect x="0" y="0" width="262" height="86" fill={theme === 'dark' ? '#101922' : '#FFFFFF'} stroke={muted} strokeWidth="1.4" />
          <line x1="0" y1="26" x2="262" y2="26" stroke={muted} strokeWidth="1" />
          <line x1="176" y1="26" x2="176" y2="86" stroke={muted} strokeWidth="1" />
          <line x1="0" y1="56" x2="262" y2="56" stroke={muted} strokeWidth="1" />
          <text x="9" y="18" fill={txt} fontSize="15" fontFamily="'Barlow Condensed', sans-serif"
            fontWeight="700" letterSpacing="1.6">{META.obra} — PLANTA DE LAYOUT</text>
          <text x="9" y="45" fill={muted} fontSize="11" fontFamily="'IBM Plex Mono', monospace">ESCALA</text>
          <text x="9" y="75" fill={muted} fontSize="11" fontFamily="'IBM Plex Mono', monospace">DATA</text>
          <text x="72" y="45" fill={txt} fontSize="13" fontFamily="'IBM Plex Mono', monospace">{META.escala}</text>
          <text x="72" y="75" fill={txt} fontSize="13" fontFamily="'IBM Plex Mono', monospace">{META.data}</text>
          <text x="186" y="45" fill={muted} fontSize="11" fontFamily="'IBM Plex Mono', monospace">REV</text>
          <text x="186" y="75" fill={muted} fontSize="11" fontFamily="'IBM Plex Mono', monospace">UNID</text>
          <text x="228" y="45" fill={C.cotas} fontSize="13" fontFamily="'IBM Plex Mono', monospace">{META.rev}</text>
          <text x="228" y="75" fill={txt} fontSize="13" fontFamily="'IBM Plex Mono', monospace">cm</text>
        </g>

        {/* escala gráfica */}
        <g transform={`translate(0, ${SHEET.h + 92})`} pointerEvents="none">
          <rect x="0" y="0" width="100" height="9" fill={txt} />
          <rect x="100" y="0" width="100" height="9" fill="none" stroke={txt} strokeWidth="1.2" />
          <text x="0" y="26" fill={muted} fontSize="12" fontFamily="'IBM Plex Mono', monospace">0</text>
          <text x="100" y="26" fill={muted} fontSize="12" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace">1 m</text>
          <text x="200" y="26" fill={muted} fontSize="12" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace">2 m</text>
        </g>
      </svg>

      {/* Zoom */}
      <div className="absolute right-3 top-3 flex flex-col border border-edge2 bg-ink/85 backdrop-blur-sm">
        {[['+', 1 / 1.3, 'Aproximar'], ['−', 1.3, 'Afastar']].map(([t, k, aria]) => (
          <button key={t} onClick={() => zoom(k)} aria-label={aria}
            className="h-9 w-9 border-b border-edge2 font-mono text-[16px] leading-none text-mute last:border-b-0 hover:text-cad">
            {t}
          </button>
        ))}
      </div>

      {/* Alça do wipe */}
      {mode === 'comparar' && (
        <input
          type="range" min="0" max="100" value={wipe}
          onChange={e => setWipe(+e.target.value)}
          aria-label="Sobrepor projeto sobre a entrega"
          className="wipe absolute bottom-4 left-4 w-[min(64%,380px)]"
        />
      )}
    </div>
  )
}
