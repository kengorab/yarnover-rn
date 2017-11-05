export default class NeedleSize {
  id: number
  name: string
  hook: string | null
  metric: number | null
  prettyMetric: string | null
  usSteel: string | null
  isKnitting: boolean
  isCrochet: boolean
  usSize: string

  constructor({
    id,
    name,
    hook,
    metric,
    pretty_metric,
    us_steel,
    knitting,
    crochet,
    us
  }) {
    this.id = id
    this.name = name
    this.hook = hook
    this.metric = metric
    this.prettyMetric = pretty_metric
    this.usSteel = us_steel
    this.isKnitting = knitting
    this.isCrochet = crochet
    this.usSize = us
  }
}
