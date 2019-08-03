import API from './api'

class Link extends API {
  fetch (id) {
    return this.get(`/link/purcharse/${id}`)
  }
}

export default new Link()
