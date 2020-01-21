export function getLocation(cb) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(cb);
  } else {
    return new Error("Не поддерживается")
  }
}
