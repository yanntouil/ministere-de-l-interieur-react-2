/**
 * Quickly know where your code will be executed
 */

export const isBrowser = () => !!(typeof window !== 'undefined' && window.document && window.document.documentElement)

export const isServer = () => !(typeof window !== 'undefined' && window.document && window.document.documentElement)