import { useCallback, type FC } from 'react'
import SwiftLaTeX from './SwiftLaTeX'
import Editor, { type OnMount, type OnChange } from '@monaco-editor/react'
import Box from '@mui/material/Box'
import { useLocalStorage } from 'react-use'
// https://github.com/streamich/react-use/pull/2475
import useThrottle from '../use-throttle'
import latexLang from 'madoko/styles/lang/latex.json'
import bibtexLang from 'madoko/styles/lang/bibtex.json'
import type { languages } from 'monaco-editor/esm/vs/editor/editor.api'

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

	const handleEditorDidMount = useCallback<OnMount>((_editor, monaco) => {
		for (const {
			name: id,
			displayName,
			mimeTypes: mimetypes,
			fileExtensions: extensions,
			lineComment,
			...tokensProvider
		} of [latexLang, bibtexLang]) {
			const aliases = [displayName]
			monaco.languages.register({ id, aliases, mimetypes, extensions })
			monaco.languages.setMonarchTokensProvider(
				id,
				tokensProvider as languages.IMonarchLanguage,
			)
			monaco.languages.setLanguageConfiguration(id, {
				comments: { lineComment },
			})
		}
	}, [])
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
				onMount={handleEditorDidMount}
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
