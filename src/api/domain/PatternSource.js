export default class PatternSource {
  id: number
  author: string
  name: string
  listPrice: number | null
  numPatterns: number
  isOutOfPrint: Boolean | null
  price: number | null
  permalink: string
  url: string
  amazonUrl: string | null
  amazonRating: number | null
  shelfImagePath: string | null

  constructor({
    id,
    author,
    name,
    list_price,
    patterns_count,
    out_of_print,
    price,
    permalink,
    url,
    amazon_url,
    amazon_rating,
    shelf_image_path
  }) {
    this.id = id
    this.author = author
    this.name = name
    this.listPrice = list_price
    this.numPatterns = patterns_count
    this.isOutOfPrint = out_of_print
    this.price = price
    this.permalink = permalink
    this.url = url
    this.amazonUrl = amazon_url
    this.amazonRating = amazon_rating
    this.shelfImagePath = shelf_image_path
  }
}

