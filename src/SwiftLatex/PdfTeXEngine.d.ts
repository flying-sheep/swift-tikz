import type { CompileResult, Engine } from './common';

export { EngineStatus, CompileResult } from './common';

export class PdfTeXEngine extends Engine {
    compileLaTeX(): Promise<CompileResult>
    compileFormat(): Promise<void>
    flushCache(): void
}
