import { useAPIUrl, useToken } from '../store';

const API_COLORS = new Map([
  ['GET', '#ea9ac0'],
  ['POST', '#bada55'],
  ['PUT', '#f0a37e'],
  ['PATCH', '#9ea3d3'],
  ['DELETE', '#f0522f'],
]);

const defaults = {
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
};

export async function medifetch(endpoint: string, init?: RequestInit) {
  let { url } = useAPIUrl.getState();
  while (url.endsWith('/')) {
    url = url.slice(0, -1);
  }

  init = {
    ...init,
    headers: {
      ...defaults.headers,
      ...init?.headers,
    }
  }
  if (useToken.getState().token) {
    init.headers = {
      ...init.headers,
      'Authorization': `Bearer ${useToken.getState().token}`
    }
  }

  const METHOD = init?.method || 'GET';
  console.log(
    `%c${METHOD} %c${endpoint}`, `color: ${API_COLORS.get(METHOD)}`, 'color: #fff',
    init?.body ? `\n${JSON.stringify(JSON.parse(init.body as string), null, 2)}` : ''
  );

  let res: Response | null = null;
  res = await fetch(`${url}${endpoint}`, init);

  res.clone().json().then(d => {
    console.log(res!.status, `${res!.statusText}`, d ?? '');
  }).catch(() => {});

  return res;
}
