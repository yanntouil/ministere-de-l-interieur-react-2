import { useCallback, useEffect, useState } from 'react'
import useEventListener from './useEventListener'



/**
 * This hook helps you to dynamically recover the width and the height of an HTML element. 
 * Dimensions are updated on load, on mount/un-mount, when resizing the window and when the ref changes.
 */
export default function useElementScrollSize() {
    const [ref, setRef] = useState(null)
    const [size, setSize] = useState({
        width: 0,
        height: 0,
    })
  const handleSize = useCallback(() => {
        setSize({
            width: ref?.scrollWidth || 0,
            height: ref?.scrollHeight || 0,
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref?.scrollHeight, ref?.scrollWidth])
    useEventListener('resize', handleSize)
    useEffect(() => {
        handleSize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref?.scrollWidth, ref?.scrollHeight])
    return [setRef, size]
}

