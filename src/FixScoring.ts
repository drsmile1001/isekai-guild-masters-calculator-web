import { Scoring } from "./Scoring"

export class FixScoring implements Scoring {
  id: string
  score = 0
  scoring() {
    return this.score
  }
  constructor(public title: string) {
    this.id = title
  }
}
