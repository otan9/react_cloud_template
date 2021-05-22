export const objectToArray = (object) => {
    if (object) {
      return Object.entries(object).map(e => Object.assign(e[1], {id: e[0]}))
    }
  }