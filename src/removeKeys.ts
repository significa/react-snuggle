export default (blackList: string[]) => (obj: {}): {} => {
  const cleanObj: any = obj

  blackList.forEach(
    (item: string) =>
      Object.prototype.hasOwnProperty.call(cleanObj, item) &&
      delete cleanObj[item]
  )

  return cleanObj
}
