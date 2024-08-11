import { useEffect, useRef, useState } from 'react'
import { useUnmount } from 'react-use'

const useThrottle = <T>(value: T, ms = 200) => {
	const [state, setState] = useState<T>(value)
	const timeout = useRef<ReturnType<typeof setTimeout>>()
	const nextValue = useRef<T | undefined>(undefined)
	const hasNextValue = useRef(false)

	useEffect(() => {
		if (!timeout.current) {
			setState(value)
			const timeoutCallback = () => {
				if (hasNextValue.current) {
					hasNextValue.current = false
					setState(nextValue.current!)
					timeout.current = setTimeout(timeoutCallback, ms)
				} else {
					timeout.current = undefined
				}
			}
			timeout.current = setTimeout(timeoutCallback, ms)
		} else {
			nextValue.current = value
			hasNextValue.current = true
		}
	}, [value, ms])

	useUnmount(() => {
		timeout.current && clearTimeout(timeout.current)
		timeout.current = undefined
	})

	return state
}

export default useThrottle
