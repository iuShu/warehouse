export function fetchData(action, method, body, cache, headers) {
  const options = {
    method: method || "GET",
    cache: cache || "no-cache",
    headers: Object.assign({"Content-Type": "application/json"}, headers || {})
  }

  if (options.method === "GET" && body) {
    const params = []
    for (let k of Object.keys(body))
      params.push(k + "=" + body[k])
    action += "?" + params.join("&")
  }
  else if (body) {
    options.body = JSON.stringify(body)
  }

  console.log(action, method, body, cache, headers)

  return fetch(action, options).then(res => {
    if (!res.ok)
      return {code: -1, msg: "请求数据失败"}
    return res.json()
  }).catch(err => {
    console.error(method, action, 'error', err)
    return {code: -1, msg: "请求数据异常"}
  })
}