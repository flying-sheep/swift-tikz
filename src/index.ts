import { PdfTeXEngine } from './SwiftLatex/PdfTeXEngine.js'

const engine = new PdfTeXEngine()
await engine.loadEngine()

engine.writeMemFSFile(
	'main.tex',
	'\\documentclass{article}\n\\begin{document}\nHi!\n\\end{document}\n',
)
engine.setEngineMainFile('main.tex')
const r = await engine.compileLaTeX()

console.log(r)
