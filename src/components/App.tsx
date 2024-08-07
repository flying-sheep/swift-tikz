import { useCallback, useState, type FC } from 'react'
import SwiftLaTeX from './SwiftLaTeX'
import Editor, { type OnChange } from '@monaco-editor/react'
import Box from '@mui/material/Box'

const DEFAULT_DOC = `\
\\documentclass{article}
\\begin{document}
Hi!
\\end{document}
`

const App: FC = () => {
	const [tex, setTex] = useState(DEFAULT_DOC)

	const handleEditorChange = useCallback<OnChange>(
		(value, _event) => {
			if (!value || value === tex) return
			setTex(value)
		},
		[tex],
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
				defaultValue={DEFAULT_DOC}
				onChange={handleEditorChange}
			/>
			<Box
				overflow="auto"
				display="flex"
				alignItems="center"
				justifyContent="center"
			>
				<SwiftLaTeX tex={tex} />
			</Box>
		</Box>
	)
}

export default App
