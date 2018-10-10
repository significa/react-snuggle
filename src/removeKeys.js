// @flow
export default (blackList: Array<string>) => (obj: {}): {} => {
  const cleanObj = obj

  blackList.forEach(
    (item: string) =>
      Object.prototype.hasOwnProperty.call(cleanObj, item) &&
      delete cleanObj[item]
  )

  return cleanObj
}
