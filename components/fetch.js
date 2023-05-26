function fetch0(action, method, body, headers) {
  const options = {
    method: method || "GET",
    cache: "no-cache",
    headers: headers || {}
  }

  if (options.method.toUpperCase() === "GET" && body) {
    const params = []
    for (let k of Object.keys(body))
      params.push(k + "=" + body[k])
    action += "?" + params.join("&")
  }
  else if (options.method.toUpperCase() === "POST" && body) {
    options.body = body
  }

  console.log(action, options.method, options)

  return fetch(action, options).then(res => {
    if (!res.ok)
      return {code: -1, msg: "请求数据失败"}
    return res.json()
  }).catch(err => {
    console.error(options.method, action, 'error\n', err)
    if (err.cause.code === "ECONNREFUSED")
      return {code: -1, msg: "服务器连接失败"}
    return {code: -1, msg: "请求数据异常"}
  })
}

// for page to fetch from nodejs server
export function fetchData(action, method, body, headers) {
  if (method && method.toUpperCase() === "POST" && body && body instanceof Object) {
    body = JSON.stringify(body)
    headers = Object.assign({"content-type": "application/json;charset=UTF-8"}, headers || {})
  }
  return fetch0(action, method, body, headers)
}

// for nodejs server to fetch from back-end server
export function fetchServer(action, method, body, bearer, headers) {
  if (method && method.toUpperCase() === "POST" && body && body instanceof Object) {
    const params = []
    for (let k of Object.keys(body))
      params.push(k + "=" + body[k])
    body = params.join("&")
    headers = Object.assign({"content-type": "application/x-www-form-urlencoded;charset=UTF-8"}, headers || {})
  }
  if (bearer)
    headers = Object.assign({"Authorization": "Bearer" + bearer}, headers)
  return fetch0(action, method, body, headers)
}