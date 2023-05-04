export interface GetQCSHeadersParams {
  webIntegrationId: string,
  url: string,
}

export interface ConnectParams extends GetQCSHeadersParams {
  appId: string,
}

export interface Headers {
  [key: string]: string | undefined,
}

export interface GetEnigmaApp {
  host: string,
  appId: string,
  headers?: Headers,
  isLocalhost: boolean,
}

export interface QixApi extends enigmaJS.IGeneratedAPI {
  openDoc?: (appId: string) => void,
}
