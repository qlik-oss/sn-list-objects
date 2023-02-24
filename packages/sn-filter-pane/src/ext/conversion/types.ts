export interface ExportFormat {
    data: unknown[];
    properties: EngineAPI.IGenericObjectProperties;
}

export interface PropTree {
    qChildren: PropTree[];
    qProperty: EngineAPI.IGenericObjectProperties;
}
