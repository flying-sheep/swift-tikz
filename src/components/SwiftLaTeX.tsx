import { useCallback, useState, type FC } from 'react'
import type { PdfTeXEngine } from '../SwiftLatex/PdfTeXEngine'
import type { XeTeXEngine } from '../SwiftLatex/XeTeXEngine'
import type {
	CompileResult, // it’s really different classes from each, but we don’t construct them
	DvipdfmxEngine,
} from '../SwiftLatex/DvipdfmxEngine'
import { useAsync } from 'react-async'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box, { type BoxProps } from '@mui/material/Box'

type Engine = PdfTeXEngine | XeTeXEngine | DvipdfmxEngine
type EngineName = 'pdftex' | 'xetex' | 'dvipdfmx'

export interface Props extends Omit<BoxProps<'object'>, 'type' | 'data'> {
	/** Engine to use
	 * - 'pdftex' (default): PdfTeXEngine
	 * - 'xetex': XeTeXEngine
	 * - 'dvipdfmx': DvipdfmxEngine
	 */
	engine?: Engine | EngineName
	/** LaTeX code for the main file */
	tex: string
	/** name of the main file (default: 'main.tex') */
	mainFileName?: string
	/** extra files */
	extraFiles?: Map<string, string> | Record<string, string>
}

const SwiftLaTeX: FC<Props> = ({
	engine: engineArg = 'pdftex',
	tex,
	mainFileName = 'main.tex',
	extraFiles = new Map(),
	...boxProps
}) => {
	const [result, setResult] = useState<CompileResult | null>(null)

	const promiseFn = useCallback(() => makeEngine(engineArg), [engineArg])
	const { data: engine, error } = useAsync({ promiseFn })
	if (error) {
		console.error(error)
		return (
			<Alert>
				<AlertTitle>Error</AlertTitle>
				{error.message}
			</Alert>
		)
	}
	if (!engine) return

	if (!result) {
		engine.writeMemFSFile(mainFileName, tex)
		engine.setEngineMainFile(mainFileName)
		for (const [filename, srccode] of toMap(extraFiles).entries()) {
			engine.writeMemFSFile(filename, srccode)
		}
		if ('compileLaTeX' in engine) {
			engine.compileLaTeX().then(setResult)
		} else {
			engine.compilePDF().then(setResult)
		}
		return null
	}

	if (result.status !== 0) {
		console.error(result.log)
		return (
			<Alert severity="error">
				<AlertTitle>LaTeX Error</AlertTitle>
				<pre>{result.log}</pre>
			</Alert>
		)
	}

	const blob = new Blob([result.pdf], { type: 'application/pdf' })
	const url = URL.createObjectURL(blob)
	return (
		<Box component="object" type="application/pdf" data={url} {...boxProps} />
	)
}

export default SwiftLaTeX

async function makeEngine(engine: Engine | EngineName): Promise<Engine> {
	switch (engine) {
		case 'pdftex': {
			const { PdfTeXEngine } = await import('../SwiftLatex/PdfTeXEngine')
			engine = new PdfTeXEngine()
			break
		}
		case 'xetex': {
			const { XeTeXEngine } = await import('../SwiftLatex/XeTeXEngine')
			engine = new XeTeXEngine()
			break
		}
		case 'dvipdfmx': {
			const { DvipdfmxEngine } = await import('../SwiftLatex/DvipdfmxEngine')
			engine = new DvipdfmxEngine()
			break
		}
	}
	if (!('latexWorker' in engine)) {
		throw Error('engine must be PdfTeXEngine or XeTeXEngine or DvipdfmxEngine')
	}
	await engine.loadEngine()
	return engine
}

function toMap(
	files: Map<string, string> | Record<string, string>,
): Map<string, string> {
	if (files instanceof Map) return files
	return new Map(Object.entries(files))
}
