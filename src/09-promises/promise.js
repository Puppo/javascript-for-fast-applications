
export function promise(time) {
  return new Promise((res) => {
    setTimeout(res, time);
  })
}