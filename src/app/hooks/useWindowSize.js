import { useState } from 'react'
import useEventListener from './useEventListener'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'



/**
 * Easily retrieve window dimensions with this Hook React which also works onRezise
 * @returns {{
 *    width: number,
 *    height: number
 * }}
 */
export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    })

    const handleSize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }

  useEventListener('resize', handleSize)

  // Set size at the first client-side load
  useIsomorphicLayoutEffect(() => {
      handleSize()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return windowSize
}

