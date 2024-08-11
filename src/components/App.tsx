import { useCallback, type FC } from 'react'
import SwiftLaTeX from './SwiftLaTeX'
import Editor, { type OnChange } from '@monaco-editor/react'
import Box from '@mui/material/Box'
import { useLocalStorage } from 'react-use'
// https://github.com/streamich/react-use/pull/2475
import useThrottle from '../use-throttle'

const STORAGE_KEY = 'swift-tikz'
const DEFAULT_DOC: string = `\
\\documentclass{article}
\\begin{document}
Hi!
\\end{document}
`

const App: FC = () => {
	const [tex = DEFAULT_DOC, setTex, _remove] = useLocalStorage(
		STORAGE_KEY,
		DEFAULT_DOC,
	)
	const throttledTex = useThrottle(tex, 100)

	const handleEditorChange = useCallback<OnChange>(
		(value, _event) => {
			if (!value || value === tex) return
			setTex(value)
		},
		[tex, setTex],
	)
	return (
		<Box
			display="flex"
			flexDirection="row"
			sx={{ width: '100%', height: '100%', '&>*': { flex: 1 } }}
		>
			<Editor
				width="50vw"
				height="auto"
				defaultLanguage="latex"
				value={tex}
				onChange={handleEditorChange}
			/>
			<Box
				overflow="auto"
				display="flex"
				alignItems="center"
				justifyContent="center"
			>
				<SwiftLaTeX tex={throttledTex} />
			</Box>
		</Box>
	)
}

export default App
