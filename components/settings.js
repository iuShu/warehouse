'use client';

const LOCAL_STORAGE_KEY = "_wh-lsk_";

export function getLocalSetting(key) {
  const settings = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (settings)
    return JSON.parse(settings)[key]
}

export function setLocalSetting(key, val) {
  let settings = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (settings)
    settings = JSON.parse(settings)
  else
    settings = {}
  settings[key] = val
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings))
}

export function saveUser(val) {
  setLocalSetting("u", val)
}

export function localUser() {
  return getLocalSetting("u")
}
