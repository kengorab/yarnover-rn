export default class YarnWeight {
  id: number
  name: string
  crochetGauge: string
  knitGauge: string
  maxGauge: string
  minGauge: string
  ply: string
  wpi: string

  constructor({
    id,
    name,
    crochet_gauge,
    knit_gauge,
    max_gauge,
    min_gauge,
    ply,
    wpi
  }) {
    this.id = id
    this.name = name
    this.crochetGauge = crochet_gauge
    this.knitGauge = knit_gauge
    this.maxGauge = max_gauge
    this.minGauge = min_gauge
    this.ply = ply
    this.wpi = wpi
  }

  get weight() {
    const weights = {
      'Thread': { weight: 0, name: 'Lace' },
      'Cobweb': { weight: 0, name: 'Lace' },
      'Lace': { weight: 0, name: 'Lace' },
      'Light Fingering': { weight: 0, name: 'Lace' },
      'Fingering': { weight: 1, name: 'Super Fine' },
      'Sport': { weight: 2, name: 'Fine' },
      'DK': { weight: 3, name: 'Light' },
      'Worsted': { weight: 4, name: 'Medium' },
      'Aran': { weight: 4, name: 'Medium' },
      'Bulky': { weight: 5, name: 'Bulky' },
      'Super Bulky': { weight: 6, name: 'Super Bulky' },
      'Jumbo': { weight: 7, name: 'Jumbo' }
    }

    return weights[this.name]
  }
}
