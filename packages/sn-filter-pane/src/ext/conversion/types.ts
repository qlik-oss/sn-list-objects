export interface ExportFormat {
    data: unknown[];
    properties: EngineAPI.IGenericHyperCubeProperties;
}

export interface PropTree {
    qChildren: unknown[];
    qProperty: EngineAPI.IGenericHyperCubeProperties;
}
