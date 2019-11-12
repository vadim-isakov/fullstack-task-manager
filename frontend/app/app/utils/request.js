async function parse(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  let data;
  try {
    data = await response.json();
  } catch (e) {
    throw new Error(response.statusText);
  }
  if (response.status >= 200 && response.status < 300) {
    return data;
  }
  if (typeof data.detail === 'object') {
    throw new Error(JSON.stringify(data.detail));
  }
  throw new Error(data.detail);
}

export default function request(url, options) {
  return fetch(url, options).then(parse);
}
