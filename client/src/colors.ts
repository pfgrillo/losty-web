export type ColorKey = 'main' | 'white' | 'light' | 'success' | 'danger' | 'warning' | 'info' | 'transparent';

export type ColorButtonKey =
  | 'main'
  | 'white'
  | 'whiteDark'
  | 'lightDark'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'transparent'

export const gradientBgBase = 'bg-gradient-to-tr'
export const gradientBgPurplePink = `${gradientBgBase} from-purple-400 via-pink-500 to-red-500`
export const gradientBgDark = `${gradientBgBase} from-slate-700 via-slate-900 to-slate-800`
export const gradientBgPinkRed = `${gradientBgBase} from-pink-400 via-red-500 to-yellow-500`

export const colorsBgLight = {
  main: 'bg-indigo-500 border-indigo-500 text-white',
  white: 'bg-white text-black',
  light: 'bg-white text-black dark:bg-slate-900/70 dark:text-white',
  success: 'bg-emerald-500 border-emerald-500 text-white',
  danger: 'bg-red-500 border-red-500 text-white',
  warning: 'bg-yellow-500 border-yellow-500 text-white',
  info: 'bg-blue-500 border-blue-500 text-white',
  transparent: 'bg-transparent text-indigo-500',
}

export const colorsText = {
  main: 'text-indigo-500',
  white: 'text-black dark:text-slate-100',
  light: 'text-gray-700 dark:text-slate-400',
  success: 'text-emerald-500',
  danger: 'text-red-500',
  warning: 'text-yellow-500',
  info: 'text-blue-500',
  transparent: 'text-indigo-500',
}

export const colorsOutline = {
  main: [colorsText.main, 'border-indigo-500'].join(' '),
  white: [colorsText.white, 'border-gray-100'].join(' '),
  light: [colorsText.light, 'border-gray-100'].join(' '),
  success: [colorsText.success, 'border-emerald-500'].join(' '),
  danger: [colorsText.danger, 'border-red-500'].join(' '),
  warning: [colorsText.warning, 'border-yellow-500'].join(' '),
  info: [colorsText.info, 'border-blue-500'].join(' '),
  transparent: [colorsText.transparent, 'border-indigo-200'].join(' '),
}

export const getButtonColor = (
  color: ColorButtonKey,
  isOutlined: boolean,
  hasHover: boolean,
  isActive = false
) => {
  const colors = {
    ring: {
      main: 'ring-indigo-500',
      white: 'ring-gray-200 dark:ring-gray-500',
      whiteDark: 'ring-gray-200 dark:ring-gray-500',
      lightDark: 'ring-gray-200 dark:ring-gray-500',
      success: 'ring-emerald-300 dark:ring-emerald-700',
      danger: 'ring-red-300 dark:ring-red-700',
      warning: 'ring-yellow-300 dark:ring-yellow-700',
      info: 'ring-blue-300 dark:ring-blue-700',
      transparent: 'ring-indigo-100',
    },
    active: {
      main: 'bg-indigo-700',
      white: 'bg-gray-100',
      whiteDark: 'bg-gray-100 dark:bg-slate-800',
      lightDark: 'bg-gray-200 dark:bg-slate-700',
      success: 'bg-emerald-700 dark:bg-emerald-600',
      danger: 'bg-red-700 dark:bg-red-600',
      warning: 'bg-yellow-700 dark:bg-yellow-600',
      info: 'bg-blue-700 dark:bg-blue-600',
      transparent: 'bg-transparent',
    },
    bg: {
      main: 'bg-indigo-500 text-white',
      white: 'bg-white text-black',
      whiteDark: 'bg-white text-black dark:bg-slate-900 dark:text-white',
      lightDark: 'bg-gray-100 text-black dark:bg-slate-800 dark:text-white',
      success: 'bg-emerald-600 dark:bg-emerald-500 text-white',
      danger: 'bg-red-600 dark:bg-red-500 text-white',
      warning: 'bg-yellow-600 dark:bg-yellow-500 text-white',
      info: 'bg-blue-600 dark:bg-blue-500 text-white',
      transparent: 'bg-transparent text-indigo-500',
    },
    bgHover: {
      main: 'hover:bg-indigo-700 hover:border-indigo-700',
      white: 'hover:bg-gray-100',
      whiteDark: 'hover:bg-gray-100 hover:dark:bg-slate-800',
      lightDark: 'hover:bg-gray-200 hover:dark:bg-slate-700',
      success:
        'hover:bg-emerald-700 hover:border-emerald-700 hover:dark:bg-emerald-600 hover:dark:border-emerald-600',
      danger:
        'hover:bg-red-700 hover:border-red-700 hover:dark:bg-red-600 hover:dark:border-red-600',
      warning:
        'hover:bg-yellow-700 hover:border-yellow-700 hover:dark:bg-yellow-600 hover:dark:border-yellow-600',
      info: 'hover:bg-blue-700 hover:border-blue-700 hover:dark:bg-blue-600 hover:dark:border-blue-600',
      transparent: 'hover:bg-indigo-200',
    },
    borders: {
      main: 'border-indigo-500',
      white: 'border-white',
      whiteDark: 'border-white dark:border-slate-900',
      lightDark: 'border-gray-100 dark:border-slate-800',
      success: 'border-emerald-600 dark:border-emerald-500',
      danger: 'border-red-600 dark:border-red-500',
      warning: 'border-yellow-600 dark:border-yellow-500',
      info: 'border-blue-600 dark:border-blue-500',
      transparent: 'border-transparent',
    },
    text: {
      success: 'text-emerald-600 dark:text-emerald-500',
      danger: 'text-red-600 dark:text-red-500',
      warning: 'text-yellow-600 dark:text-yellow-500',
      info: 'text-blue-600 dark:text-blue-500',
      transparent: 'text-indigo-500',
    },
    outlineHover: {
      success:
        'hover:bg-emerald-600 hover:text-white hover:text-white hover:dark:text-white hover:dark:border-emerald-600',
      danger:
        'hover:bg-red-600 hover:text-white hover:text-white hover:dark:text-white hover:dark:border-red-600',
      warning:
        'hover:bg-yellow-600 hover:text-white hover:text-white hover:dark:text-white hover:dark:border-yellow-600',
      info: 'hover:bg-blue-600 hover:text-white hover:dark:text-white hover:dark:border-blue-600',
      transparent: 'hover:bg-indigo-200',
    },
  }

  //const isOutlinedProcessed = isOutlined && ['white', 'whiteDark', 'lightDark'].indexOf(color) < 0

  const base = [colors.borders[color], colors.ring[color], colors.bg[color], colors.bgHover[color]];

  /* if (isActive) {
     base.push(colors.active[color])
   } else {
     base.push(isOutlinedProcessed ? colors.text[color] : colors.bg[color])
   }
 
   if (hasHover) {
     base.push(isOutlinedProcessed ? colors.outlineHover[color] : colors.bgHover[color])
   } */

  return base.join(' ')
}
