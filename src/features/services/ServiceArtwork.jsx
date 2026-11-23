import { useId } from 'react'
import styles from './ServiceArtwork.module.css'

// Project onto the front, right and top planes of the same isometric space.
function point(x, y, z) {
  return [180 + x * 0.94 + y * 0.72, 190 + x * 0.32 - y * 0.48 - z]
}

function face(vertices) {
  return vertices.map(vertex => point(...vertex).join(',')).join(' ')
}

function box(x, y, z, w, d, h, paint) {
  const X = x + w, Y = y + d, Z = z + h
  return <g strokeLinejoin="round" strokeWidth="1.35">
    <polygon points={face([[x,y,z],[X,y,z],[X,y,Z],[x,y,Z]])} fill={paint.front} stroke="#7198ff" />
    <polygon points={face([[X,y,z],[X,Y,z],[X,Y,Z],[X,y,Z]])} fill={paint.side} stroke="#587ddb" />
    <polygon points={face([[x,y,Z],[X,y,Z],[X,Y,Z],[x,Y,Z]])} fill={paint.top} stroke="#b1ceff" />
  </g>
}

function frontPlane(x, y, z) {
  const [tx, ty] = point(x, y, z)
  return `matrix(.94 .32 0 1 ${tx} ${ty})`
}

function item(slug, paint) {
  switch (slug) {
    case 'e-commerce':
      return <>
        <g transform={frontPlane(-45,22,115)} fill="none" stroke="#829fff" strokeWidth="4">
          <path d="M16 5v-15a21 24 0 0 1 42 0V5" />
        </g>
        {box(-57,-24,14,114,48,98,paint)}
        <g transform={frontPlane(-57,-24,112)}>
          <path d="M31 11v-22a21 24 0 0 1 42 0v22" fill="none" stroke="#bbd8ff" strokeWidth="5" />
          <path d="M31 11v-22a21 24 0 0 1 42 0v22" fill="none" stroke="#797dff" strokeWidth="1.8" />
          <path d="m39 51 11 11 18-22" fill="none" stroke="#d5eaff" strokeWidth="3.8" />
          <path d="M8 88h98" stroke="#789aff" opacity=".55" />
        </g>
      </>
    case 'pagina-web':
      return <>
        {box(-76,-6,25,147,12,99,paint)}
        <g transform={frontPlane(-76,-6,124)} fill="none" stroke="#b7d3ff" strokeWidth="2">
          <path d="M0 15h147M14 34h42v40H14zM71 36h56m-56 12h45m-45 11h36" />
          {[8,15,22].map(x=><circle key={x} cx={x} cy="7" r="1.5" fill="#c0deff" />)}
          <path d="M70 72h25" stroke="#8ae6ff" strokeWidth="6" />
        </g>
      </>
    case 'chatbots':
      return <>
        {box(-52,10,63,110,13,62,paint)}
        {box(-60,-36,33,98,14,61,paint)}
        <g transform={frontPlane(-60,-36,94)}>
          <path d="M12 61v14l17-14" fill="#3158c2" stroke="#7699ff" strokeWidth="1.4" />
          {[29,48,67].map(x=><circle key={x} cx={x} cy="31" r="4" fill="#cef4ff" />)}
        </g>
      </>
    case 'apps':
      return <>
        {box(-38,-8,14,79,15,130,paint)}
        <g transform={frontPlane(-38,-8,144)} fill="none" stroke="#b8d5ff" strokeWidth="2.2">
          <rect x="5" y="6" width="69" height="117" rx="6" />
          <path d="M29 13h20M29 115h20M15 83h46m-46 8h35"/>
          {[0,1,2,3].map(i=><rect key={i} x={15+i%2*27} y={31+Math.floor(i/2)*21} width="20" height="14" rx="2" fill="#6788ee" />)}
        </g>
      </>
    case 'agentes':
      return <>
        {box(-52,-35,40,99,62,66,paint)}
        <g transform={frontPlane(-52,-35,106)}>
          <rect x="12" y="15" width="74" height="34" rx="11" fill="#0a235c" stroke="#92b5ff" />
          <path d="M31 26v9m34-9v9" stroke="#83f0ff" strokeWidth="5" strokeLinecap="round" />
        </g>
        {box(-13,-3,106,17,14,14,paint)}
        {box(-20,-5,120,30,19,8,paint)}
      </>
    case 'sistemas-agenticos':
      return <>
        <polyline points={face([[-60,0,28],[0,56,28],[62,-4,28],[-60,0,28]])} stroke="#75baff" fill="none" strokeWidth="2" />
        {box(-20,35,45,40,36,43,paint)}
        {box(-81,-16,24,43,38,43,paint)}
        {box(38,-26,24,43,38,43,paint)}
      </>
    case 'capacitaciones-ia':
      return <>
        {box(-72,-40,27,144,84,6,paint)}
        <polygon points={face([[-70,-39,51],[0,-39,37],[0,42,37],[-70,42,51]])} fill={paint.front} stroke="#b2ceff" />
        <polygon points={face([[0,-39,37],[69,-39,62],[69,42,62],[0,42,37]])} fill={paint.top} stroke="#c7deff" />
        {[0,1,2,3].map(i=><g key={i} stroke="#b2ceff" strokeWidth="1.6">
          <polyline points={face([[-58,-24+i*14,49],[-12,-24+i*14,40]])}/>
          <polyline points={face([[12,-24+i*14,42],[55,-24+i*14,57]])}/>
        </g>)}
      </>
  }
}

export function ServiceArtwork({ slug }) {
  const id = useId()
  const url = key => `url(#${id}-${key})`
  const paint = { front:url('front'), top:url('top'), side:url('side') }
  return <div className={styles.stage} aria-hidden="true">
    <svg viewBox="0 0 360 272" fill="none" className={styles.object}>
      <defs>
        <linearGradient id={id+'-front'} x2=".9" y2="1" gradientUnits="objectBoundingBox">
          <stop stopColor="#566eff"/><stop offset=".47" stopColor="#344fbe"/><stop offset="1" stopColor="#132b78"/>
        </linearGradient>
        <linearGradient id={id+'-side'} x2=".9" y2="1">
          <stop stopColor="#1f3683"/><stop offset="1" stopColor="#111e4d"/>
        </linearGradient>
        <linearGradient id={id+'-top'} x2="1" y2=".3">
          <stop stopColor="#677dff"/><stop offset="1" stopColor="#8cbcff"/>
        </linearGradient>
      </defs>
      <g stroke="#5075b8" strokeWidth=".65" opacity=".29">
        {[-96,-72,-48,-24,0,24,48,72,96].map(n=><g key={n}>
          <polyline points={face([[n,-96,0],[n,96,0]])}/><polyline points={face([[-96,n,0],[96,n,0]])}/>
        </g>)}
      </g>
      {item(slug, paint)}
    </svg>
  </div>
}
