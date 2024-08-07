import type { CompileResult, Engine } from './common';

export { EngineStatus, CompileResult } from './common';

export class DvipdfmxEngine extends Engine {
    compilePDF(): Promise<CompileResult>;
}
