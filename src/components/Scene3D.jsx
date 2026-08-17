import { useRef, useEffect, useState, useCallback } from 'react'
import * as THREE from 'three'
import { SHEET, ROOMS, OPENINGS, furniture, FINISHES, VIEWPOINTS } from '../data/plan'

const H = SHEET.pd

// --- Paredes: trechos com furos de porta e janela ---------------
const RUNS = [
  { axis: 'x', x: 0, y: 0, w: 743, d: 15, holes: [
    { a: 100, b: 250, sill: 110, top: 210 }, { a: 560, b: 690, sill: 110, top: 210 }] },
  { axis: 'x', x: 0, y: 626, w: 743, d: 15, holes: [
    { a: 25, b: 115, sill: 0, top: 210 }, { a: 155, b: 280, sill: 100, top: 210 },
    { a: 560, b: 690, sill: 105, top: 210 }] },
  { axis: 'y', x: 0, y: 0, w: 15, d: 641, holes: [] },
  { axis: 'y', x: 728, y: 0, w: 15, d: 641, holes: [] },
  { axis: 'y', x: 335, y: 15, w: 15, d: 344, holes: [{ a: 265, b: 345, sill: 0, top: 210 }] },
  { axis: 'x', x: 350, y: 243, w: 123, d: 15, holes: [{ a: 365, b: 425, sill: 0, top: 210 }] },
  { axis: 'y', x: 473, y: 15, w: 15, d: 360, holes: [{ a: 275, b: 355, sill: 0, top: 210 }] },
  { axis: 'x', x: 15, y: 359, w: 335, d: 16, holes: [] },
  { axis: 'x', x: 473, y: 375, w: 255, d: 17, holes: [] },
  { axis: 'y', x: 499, y: 392, w: 15, d: 234, holes: [{ a: 434, b: 534, sill: 0, top: 220 }] },
]

function wallBoxes() {
  const out = []
  for (const r of RUNS) {
    const along = r.axis === 'x' ? r.w : r.d
    const start = r.axis === 'x' ? r.x : r.y
    const end = start + along
    const holes = [...(r.holes || [])].sort((p, q) => p.a - q.a)
    const seg = (a, b, z0, z1) => {
      if (b - a < 0.5 || z1 - z0 < 0.5) return
      out.push(r.axis === 'x'
        ? { x: a, y: r.y, w: b - a, d: r.d, z: z0, hz: z1 - z0 }
        : { x: r.x, y: a, w: r.w, d: b - a, z: z0, hz: z1 - z0 })
    }
    let cur = start
    for (const h of holes) {
      if (h.a > cur) seg(cur, h.a, 0, H)
      if (h.sill > 0) seg(h.a, h.b, 0, h.sill)
      if (h.top < H) seg(h.a, h.b, h.top, H)
      cur = h.b
    }
    if (cur < end) seg(cur, end, 0, H)
  }
  return out
}

export default function Scene3D({ variant, pedra, armario, theme }) {
  const host = useRef(null)
  const api = useRef({})
  const [mode, setMode] = useState('orbita')
  const [vp, setVp] = useState('geral')
  const keys = useRef({})
  const move = useRef({ f: 0, s: 0 })

  useEffect(() => {
    const el = host.current
    if (!el) return

    const dark = theme === 'dark'
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(dark ? 0x0C1218 : 0xE8E6E0)
    scene.fog = new THREE.Fog(dark ? 0x0C1218 : 0xE8E6E0, 900, 2600)

    const cam = new THREE.PerspectiveCamera(66, 1, 1, 6000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    el.appendChild(renderer.domElement)
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.touchAction = 'none'

    scene.add(new THREE.HemisphereLight(0xffffff, dark ? 0x3a4a58 : 0xb8b4aa, dark ? 1.9 : 1.6))
    scene.add(new THREE.AmbientLight(0xffffff, dark ? 0.55 : 0.4))
    const sun = new THREE.DirectionalLight(0xfff4e6, dark ? 1.5 : 1.5)
    sun.position.set(-500, 900, 1100)
    sun.castShadow = true
    sun.shadow.mapSize.set(2048, 2048)
    const s = sun.shadow.camera
    s.left = -700; s.right = 700; s.top = 700; s.bottom = -700; s.near = 100; s.far = 2600
    scene.add(sun)
    const fill = new THREE.DirectionalLight(0xbcd6ff, 0.35)
    fill.position.set(700, 500, -600)
    scene.add(fill)

    const P = FINISHES.pedra[pedra]
    const A = FINISHES.armario[armario]
    const MAT = {
      parede:   new THREE.MeshStandardMaterial({ color: 0xf1f0ec, roughness: 0.95 }),
      piso:     new THREE.MeshStandardMaterial({ color: 0xe3ded4, roughness: 0.6, metalness: 0.02 }),
      pedra:    new THREE.MeshStandardMaterial({ color: new THREE.Color(P.cor), roughness: pedra === 'ubatuba' ? 0.72 : 0.35, metalness: 0.06 }),
      armario:  new THREE.MeshStandardMaterial({ color: new THREE.Color(A.cor), roughness: 0.82 }),
      eletro:   new THREE.MeshStandardMaterial({ color: 0xa7b3bd, roughness: 0.3, metalness: 0.7 }),
      madeira:  new THREE.MeshStandardMaterial({ color: 0xc8a97e, roughness: 0.7 }),
      estofado: new THREE.MeshStandardMaterial({ color: 0xc9ced4, roughness: 0.95 }),
      vidro:    new THREE.MeshPhysicalMaterial({ color: 0xb9e4f5, roughness: 0.08, metalness: 0.08, transparent: true, opacity: 0.42, transmission: 0.15, side: THREE.DoubleSide }),
      aluminio: new THREE.MeshStandardMaterial({ color: 0x26343c, roughness: 0.34, metalness: 0.82 }),
      rejunte:  new THREE.LineBasicMaterial({ color: 0xbeb8ae, transparent: true, opacity: 0.55 }),
    }

    const g = new THREE.BoxGeometry(1, 1, 1)
    const add = (b, mat, cast = true) => {
      const m = new THREE.Mesh(g, mat)
      m.scale.set(b.w, b.hz, b.d)
      m.position.set(b.x + b.w / 2, b.z + b.hz / 2, b.y + b.d / 2)
      m.castShadow = cast; m.receiveShadow = true
      scene.add(m)
      return m
    }

    const addFloorGrid = r => {
      const points = []
      const modulo = 60
      for (let x = r.x; x <= r.x + r.w; x += modulo) points.push(x, 0.35, r.y, x, 0.35, r.y + r.h)
      for (let y = r.y; y <= r.y + r.h; y += modulo) points.push(r.x, 0.35, y, r.x + r.w, 0.35, y)
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
      scene.add(new THREE.LineSegments(geo, MAT.rejunte))
    }

    const addWindow = o => {
      const horizontal = o.w > o.h
      const frame = 4
      const height = o.top - o.sill
      // wallBoxes mantém o volume abaixo de `sill`: a mureta da sala fica H=1,00 m.
      if (horizontal) {
        const wallY = o.y + o.h / 2
        add({ x: o.x + frame, y: wallY - 1.2, w: o.w - frame * 2, d: 2.4, z: o.sill + frame, hz: height - frame * 2 }, MAT.vidro, false)
        add({ x: o.x, y: wallY - 2, w: o.w, d: 4, z: o.sill - 2, hz: 4 }, MAT.aluminio)
        add({ x: o.x, y: wallY - 2, w: o.w, d: 4, z: o.top - 2, hz: 4 }, MAT.aluminio)
        ;[o.x, o.x + o.w / 2 - 2, o.x + o.w - 4].forEach(x => add({ x, y: wallY - 2, w: 4, d: 4, z: o.sill, hz: height }, MAT.aluminio))
      } else {
        const wallX = o.x + o.w / 2
        add({ x: wallX - 1.2, y: o.y + frame, w: 2.4, d: o.h - frame * 2, z: o.sill + frame, hz: height - frame * 2 }, MAT.vidro, false)
        add({ x: wallX - 2, y: o.y, w: 4, d: o.h, z: o.sill - 2, hz: 4 }, MAT.aluminio)
        add({ x: wallX - 2, y: o.y, w: 4, d: o.h, z: o.top - 2, hz: 4 }, MAT.aluminio)
        ;[o.y, o.y + o.h / 2 - 2, o.y + o.h - 4].forEach(y => add({ x: wallX - 2, y, w: 4, d: 4, z: o.sill, hz: height }, MAT.aluminio))
      }
    }

    // piso por ambiente
    for (const r of ROOMS) {
      add({ x: r.x, y: r.y, w: r.w, d: r.h, z: -2, hz: 2 }, MAT.piso, false)
      addFloorGrid(r)
    }
    // paredes
    for (const b of wallBoxes()) add(b, MAT.parede)
    // Caixilhos e vidro deixam as janelas legíveis e preservam os peitoris.
    for (const o of OPENINGS.filter(o => o.tipo === 'janela')) addWindow(o)
    // mobiliário
    for (const f of furniture(variant)) {
      if (f.hz <= 0) continue
      add({ x: f.x, y: f.y, w: f.w, d: f.h, z: f.z, hz: f.hz }, MAT[f.mat] || MAT.armario)
      // frente de gaveta / tampo de pedra sobre balcão
      if (f.mat === 'pedra' && f.z >= 80) {
        add({ x: f.x, y: f.y, w: f.w, d: f.d || f.h, z: 12, hz: 74 }, MAT.armario)
        add({ x: f.x, y: f.y, w: f.w, d: f.h, z: 0, hz: 12 }, MAT.armario, false)
      }
    }

    // ---- controles ----
    const st = { yaw: 0.42, pitch: -1.02, dist: 980, target: new THREE.Vector3(370, 40, 320), pos: new THREE.Vector3() }
    api.current.goto = (id) => {
      const v = VIEWPOINTS.find(p => p.id === id) || VIEWPOINTS[0]
      if (id === 'geral') {
        st.target.set(370, 40, 320); st.dist = 980; st.yaw = 0.42; st.pitch = -1.02
        api.current.setMode?.('orbita')
      } else {
        st.pos.set(v.pos[0], v.pos[1], v.pos[2])
        const dx = v.look[0] - v.pos[0], dz = v.look[2] - v.pos[2], dy = v.look[1] - v.pos[1]
        st.yaw = Math.atan2(dx, dz)
        st.pitch = Math.atan2(dy, Math.hypot(dx, dz))
        api.current.setMode?.('caminhar')
      }
    }
    api.current.st = st

    let drag = null
    const dom = renderer.domElement
    const onDown = e => { drag = { x: e.clientX, y: e.clientY }; dom.setPointerCapture?.(e.pointerId) }
    const onUp = () => { drag = null }
    const onMove = e => {
      if (!drag) return
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y
      drag = { x: e.clientX, y: e.clientY }
      st.yaw -= dx * 0.006
      st.pitch = Math.max(-1.45, Math.min(1.2, st.pitch - dy * 0.005))
    }
    const onWheel = e => { e.preventDefault(); st.dist = Math.max(180, Math.min(2600, st.dist * (e.deltaY > 0 ? 1.11 : 0.9))) }
    dom.addEventListener('pointerdown', onDown)
    dom.addEventListener('pointermove', onMove)
    dom.addEventListener('pointerup', onUp)
    dom.addEventListener('pointerleave', onUp)
    dom.addEventListener('wheel', onWheel, { passive: false })

    const kd = e => { keys.current[e.key.toLowerCase()] = true }
    const ku = e => { keys.current[e.key.toLowerCase()] = false }
    window.addEventListener('keydown', kd); window.addEventListener('keyup', ku)

    let raf, last = performance.now()
    const loop = () => {
      raf = requestAnimationFrame(loop)
      const now = performance.now(), dt = Math.min((now - last) / 1000, 0.1); last = now
      const walking = api.current.mode === 'caminhar'

      if (walking) {
        const k = keys.current
        let f = move.current.f + ((k.w || k.arrowup ? 1 : 0) - (k.s || k.arrowdown ? 1 : 0))
        let sd = move.current.s + ((k.d || k.arrowright ? 1 : 0) - (k.a || k.arrowleft ? 1 : 0))
        const sp = 260 * dt
        if (f || sd) {
          const nx = st.pos.x + (Math.sin(st.yaw) * f + Math.cos(st.yaw) * sd) * sp
          const nz = st.pos.z + (Math.cos(st.yaw) * f - Math.sin(st.yaw) * sd) * sp
          st.pos.x = Math.max(25, Math.min(718, nx))
          st.pos.z = Math.max(25, Math.min(631, nz))
        }
        st.pos.y = 158
        cam.position.copy(st.pos)
        cam.lookAt(
          st.pos.x + Math.sin(st.yaw) * 100,
          st.pos.y + Math.tan(st.pitch) * 100,
          st.pos.z + Math.cos(st.yaw) * 100
        )
      } else {
        const cp = Math.cos(st.pitch)
        cam.position.set(
          st.target.x + st.dist * cp * Math.sin(st.yaw),
          st.target.y - st.dist * Math.sin(st.pitch),
          st.target.z + st.dist * cp * Math.cos(st.yaw)
        )
        cam.lookAt(st.target)
      }
      renderer.render(scene, cam)
    }
    loop()

    const ro = new ResizeObserver(() => {
      const w = el.clientWidth, h = el.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h, false)
      cam.aspect = w / h; cam.updateProjectionMatrix()
    })
    ro.observe(el)

    api.current.goto('geral')

    return () => {
      cancelAnimationFrame(raf); ro.disconnect()
      dom.removeEventListener('pointerdown', onDown); dom.removeEventListener('pointermove', onMove)
      dom.removeEventListener('pointerup', onUp); dom.removeEventListener('pointerleave', onUp)
      dom.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', kd); window.removeEventListener('keyup', ku)
      renderer.dispose(); g.dispose()
      Object.values(MAT).forEach(m => m.dispose())
      el.removeChild(renderer.domElement)
    }
  }, [variant, pedra, armario, theme])

  api.current.mode = mode
  api.current.setMode = setMode

  const go = useCallback(id => { setVp(id); api.current.goto?.(id) }, [])
  const nudge = (f, s) => { move.current = { f, s } }

  return (
    <div className="relative h-full w-full bg-ink">
      <div ref={host} className="h-full w-full" />

      <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-wrap items-start gap-2 p-3">
        <div className="pointer-events-auto flex overflow-hidden border border-edge2 bg-ink/85 backdrop-blur">
          {[['orbita', 'Órbita'], ['caminhar', 'Caminhar']].map(([id, n]) => (
            <button key={id} onClick={() => setMode(id)}
              className={`px-3 py-1.5 font-cond text-[13px] uppercase tracking-[0.14em]
                ${mode === id ? 'bg-cad text-ink' : 'text-mute hover:text-chalk'}`}>{n}</button>
          ))}
        </div>
        <div className="pointer-events-auto flex flex-wrap gap-1">
          {VIEWPOINTS.map(v => (
            <button key={v.id} onClick={() => go(v.id)}
              className={`border px-2.5 py-1.5 font-cond text-[12.5px] uppercase tracking-[0.1em] backdrop-blur
                ${vp === v.id ? 'border-cad bg-cad/15 text-cad' : 'border-edge2 bg-ink/80 text-mute hover:text-chalk'}`}>
              {v.nome}
            </button>
          ))}
        </div>
      </div>

      <p className="pointer-events-none absolute bottom-3 left-3 max-w-[62%] font-mono text-[10.5px] leading-relaxed text-mute">
        {mode === 'orbita'
          ? 'Arraste para girar · roda do mouse para aproximar'
          : 'Arraste para olhar · W A S D ou as setas para andar'}
      </p>

      {mode === 'caminhar' && (
        <div className="absolute bottom-3 right-3 grid grid-cols-3 gap-1 select-none">
          <span />
          <button onPointerDown={() => nudge(1, 0)} onPointerUp={() => nudge(0, 0)} onPointerLeave={() => nudge(0, 0)}
            aria-label="Andar para frente"
            className="h-11 w-11 border border-edge2 bg-ink/85 font-mono text-[15px] text-chalk active:bg-cad active:text-ink">↑</button>
          <span />
          <button onPointerDown={() => nudge(0, -1)} onPointerUp={() => nudge(0, 0)} onPointerLeave={() => nudge(0, 0)}
            aria-label="Andar para a esquerda"
            className="h-11 w-11 border border-edge2 bg-ink/85 font-mono text-[15px] text-chalk active:bg-cad active:text-ink">←</button>
          <button onPointerDown={() => nudge(-1, 0)} onPointerUp={() => nudge(0, 0)} onPointerLeave={() => nudge(0, 0)}
            aria-label="Andar para trás"
            className="h-11 w-11 border border-edge2 bg-ink/85 font-mono text-[15px] text-chalk active:bg-cad active:text-ink">↓</button>
          <button onPointerDown={() => nudge(0, 1)} onPointerUp={() => nudge(0, 0)} onPointerLeave={() => nudge(0, 0)}
            aria-label="Andar para a direita"
            className="h-11 w-11 border border-edge2 bg-ink/85 font-mono text-[15px] text-chalk active:bg-cad active:text-ink">→</button>
          <span />
        </div>
      )}
    </div>
  )
}
