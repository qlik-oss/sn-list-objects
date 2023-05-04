import enigma from 'enigma.js';
import { ConnectParams, GetEnigmaApp, GetQCSHeadersParams } from './interfaces';

interface QixApi extends enigmaJS.IGeneratedAPI {
  openDoc?: (appId: string) => void,
}

async function getQCSHeaders({ webIntegrationId, url }: GetQCSHeadersParams) {
  const response = await fetch(`${url}/api/v1/csrf-token`, {
    credentials: 'include',
    headers: { 'qlik-web-integration-id': webIntegrationId },
  });
  if (response.status === 401) {
    const loginUrl = new URL(`${url}/login`);
    loginUrl.searchParams.append('returnto', window.location.href);
    loginUrl.searchParams.append('qlik-web-integration-id', webIntegrationId);
    window.location.href = loginUrl.toString();
    return undefined;
  }
  const csrfToken = new Map(response.headers).get('qlik-csrf-token');
  return {
    'qlik-web-integration-id': webIntegrationId,
    'qlik-csrf-token': csrfToken,
  };
}

const loadSchema = () => fetch('https://unpkg.com/enigma.js/schemas/12.936.0.json').then((response) => response.json());

async function getEnigmaApp({
  host,
  appId,
  headers,
  isLocalhost,
}: GetEnigmaApp) {
  const params = headers
    ? Object.keys(headers)
      .map((key) => `${key}=${headers[key]}`)
      .join('&')
    : null;

  const schema = await loadSchema();
  const ws = isLocalhost ? 'ws' : 'wss';
  const url = `${ws}://${host}/app/${appId}${params ? '?' : ''}${params}`;
  const enigmaGlobal = await enigma
    .create({
      schema,
      url,
    })
    .open()
    .then((qix: QixApi) => qix.openDoc?.(`/${appId}`));

  return enigmaGlobal;
}

async function connect({ url, webIntegrationId, appId }: ConnectParams) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/?/, '');
  const isLocalhost = host.substring(0, host.lastIndexOf(':')) === 'localhost';
  const headers = isLocalhost ? undefined : await getQCSHeaders({ url, webIntegrationId });
  return getEnigmaApp({
    host,
    headers,
    appId,
    isLocalhost,
  });
}

export default connect;
