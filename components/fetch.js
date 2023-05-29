import {localUser} from "./settings";
import {useAuthContext} from "../providers/auth";
import forge from "node-forge";

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
    if (err.cause?.code === "ECONNREFUSED")
      return {code: -1, msg: "服务器连接失败"}
    return {code: -1, msg: "请求数据异常"}
  })
}

// for page to fetch from nodejs server
function fetchData(action, method, body, headers) {
  if (method && method.toUpperCase() === "POST" && body && body instanceof Object) {
    body = JSON.stringify(body)
    headers = Object.assign({"content-type": "application/json;charset=UTF-8"}, headers || {})
  }
  return fetch0(action, method, body, headers)
}

export function getData(action, body, headers) {
  return fetchData(action, "get", body, headers)
}

export function postData(action, body, headers) {
  return fetchData(action, "post", body, headers)
}

export function deleteData(action, body, headers) {
  return fetchData(action, "delete", body, headers)
}

function fetchAuth(action, method, body, auth, headers) {
  if (method && method.toUpperCase() === "POST" && body && body instanceof Object) {
    body = JSON.stringify(body)
    headers = Object.assign({"content-type": "application/json;charset=UTF-8"}, headers || {})
  }
  return fetch0(action, method, body, headers).then(data => {
    if (!data || data.code !== -2)
      return data

    return getData("/auth/pub/api").then(data => {
      if (!data || data.code !== 1)
        return data

      const pubKey = forge.pki.publicKeyFromPem(`-----BEGIN PUBLIC KEY-----\n${data.payload}\n-----END PUBLIC KEY-----`)
      const user = localUser()
      const body = {
        username: encodeURIComponent(forge.util.encode64(pubKey.encrypt(user.username))),
        password: encodeURIComponent(forge.util.encode64(pubKey.encrypt(user.password)))
      }
      return postData("/auth/api", body).then(data => {
        if (!data || data.code !== 1)
          return data

        const updated = data.payload.user
        updated["loginAt"] = Date.now()
        updated["password"] = user.password
        auth(updated)
        return fetch0(action, method, body, headers)
      })
    })
  })
}

export function getAuth(action, body, auth, headers) {
  return fetchAuth(action, "get", body, auth, headers)
}

export function postAuth(action, body, auth, headers) {
  return fetchAuth(action, "post", body, auth, headers)
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
    headers = Object.assign({"Authorization": "Bearer " + bearer}, headers)
  return fetch0(action, method, body, headers)
}

export function getServer(action, body, bearer, headers) {
  return fetchServer(action, "get", body, bearer, headers)
}

export function postServer(action, body, bearer, headers) {
  return fetchServer(action, "post", body, bearer, headers)
}