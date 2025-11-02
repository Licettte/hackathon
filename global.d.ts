/** SCSS modules */
declare module '*.module.scss' {
    const classes: { readonly [key: string]: string }
    export default classes
}

/** Просто SCSS (глобальные стили, без modules) */
declare module '*.scss' {
    const content: string
    export default content
}

/** SVG как React-компонент: import Icon from './icon.svg?react' */
declare module '*.svg?react' {
    import * as React from 'react'
    const Component: React.FC<React.SVGProps<SVGSVGElement>>
    export default Component
}

/** SVG как URL-строка: import url from './icon.svg' */
declare module '*.svg' {
    const src: string
    export default src
}
