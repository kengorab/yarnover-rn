import Craft from './Craft'
import DownloadLocation from './DownloadLocation'
import NeedleSize from './NeedleSize'
import PatternAttribute from './PatternAttribute'
import PatternAuthor from './PatternAuthor'
import PatternCategory from './PatternCategory'
import PersonalAttributes from './PersonalAttributes'
import Photo from './Photo'
import Printing from './Printing'
import YarnWeight from './YarnWeight'

export default class PatternDetails {
  id: number
  name: string
  numComments: number
  craft: Craft
  currency: string
  currencySymbol: string | null
  avgDifficulty: number
  numDifficultyVotes: number | null
  downloadLocation: DownloadLocation
  isDownloadable: boolean
  numFavorites: number
  isFree: boolean
  gauge: string
  gaugeDesc: string
  gaugeDivisor: string
  gaugePattern: string
  notesHtml: string
  packs: any // TODO - Pack type
  patternAttributes: PatternAttribute[]
  patternAuthor: PatternAuthor
  patternCategories: PatternCategory[]
  patternNeedleSizes: NeedleSize[]
  isPdfInLibrary: boolean
  pdfUrl: string
  permalink: string
  personalAttributes: PersonalAttributes
  photos: Photo[]
  price: string
  printings: Printing[]
  numProjects: number
  published: string
  numQueuedProjects: number
  avgRating: number
  numRatings: number | null
  isRavelryDownload: boolean
  rowGauge: string
  sizesAvailable: string
  url: string
  volumesInLibrary: number[]
  yardage: number | null
  yardageDesc: string
  maxYardage: number | null
  yarnWeight: YarnWeight
  yarnWeightDesc: string

  constructor({
    id,
    name,
    comments_count,
    craft,
    currency,
    currency_symbol,
    difficulty_average,
    difficulty_count,
    download_location,
    downloadable,
    favorites_count,
    free,
    gauge,
    gauge_description,
    gauge_divisor,
    gauge_pattern,
    notes_html,
    packs,
    pattern_attributes,
    pattern_author,
    pattern_categories,
    pattern_needle_sizes,
    pdf_in_library,
    pdf_url,
    permalink,
    personal_attributes,
    photos,
    price,
    printings,
    projects_count,
    published,
    queued_projects_count,
    rating_average,
    rating_count,
    ravelry_download,
    row_gauge,
    sizes_available,
    url,
    volumes_in_library,
    yardage,
    yardage_description,
    yardage_max,
    yarn_weight,
    yarn_weight_description
  }) {
    this.id = id
    this.name = name
    this.numComments = comments_count
    this.craft = new Craft(craft)
    this.currency = currency
    this.currencySymbol = currency_symbol
    this.avgDifficulty = difficulty_average
    this.numDifficultyVotes = difficulty_count
    this.downloadLocation = new DownloadLocation(download_location)
    this.isDownloadable = downloadable
    this.numFavorites = favorites_count
    this.isFree = free
    this.gauge = gauge
    this.gaugeDesc = gauge_description
    this.gaugeDivisor = gauge_divisor
    this.gaugePattern = gauge_pattern
    this.notesHtml = notes_html
    this.packs = packs
    this.patternAttributes = (pattern_attributes || []).map(pa => new PatternAttribute(pa))
    this.patternAuthor = new PatternAuthor(pattern_author)
    this.patternCategories = (pattern_categories || []).map(pc => new PatternCategory(pc))
    this.patternNeedleSizes = (pattern_needle_sizes || []).map(ns => new NeedleSize(ns))
    this.isPdfInLibrary = pdf_in_library
    this.pdfUrl = pdf_url
    this.permalink = permalink
    this.personalAttributes = new PersonalAttributes(personal_attributes)
    this.photos = (photos || []).map(p => new Photo(p))
    this.price = price
    this.printings = (printings || []).map(p => new Printing(p))
    this.numProjects = projects_count
    this.published = published
    this.numQueuedProjects = queued_projects_count
    this.avgRating = rating_average
    this.numRatings = rating_count
    this.isRavelryDownload = ravelry_download
    this.rowGauge = row_gauge
    this.sizesAvailable = sizes_available
    this.url = url
    this.volumesInLibrary = volumes_in_library
    this.yardage = yardage
    this.yardageDesc = yardage_description
    this.maxYardage = yardage_max
    this.yarnWeight = new YarnWeight(yarn_weight)
    this.yarnWeightDesc = yarn_weight_description
  }
}
