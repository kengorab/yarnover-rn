export default class Paginator {
  pageCount: number
  results: number
  lastPage: number
  page: number
  pageSize: number

  constructor({ page_count, results, last_page, page, page_size }) {
    this.pageCount = page_count
    this.results = results
    this.lastPage = last_page
    this.page = page
    this.pageSize = page_size
  }
}
