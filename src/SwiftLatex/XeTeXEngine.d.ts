import { CompileResult, type Engine } from './common'
export { EngineStatus, CompileResult } from './common'

export class XeTeXEngine extends Engine {
	compileLaTeX(): Promise<CompileResult>
	compileFormat(): Promise<void>
	flushCache(): void
}
