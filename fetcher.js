const fs = require("fs")

const uri = "https://yayo.fund/yayo_nft/json/"

const count = 4000

let current = 2308

let allMeta = {}

let traitCounts = {}

const sleep = () => {
  return new Promise((resolve) => setTimeout(resolve, 300))
}

const fetchooor = async () => {
  while (current <= count) {
    sleep(1000)
    const url = `${uri}${current}`
    const response = await fetch(url)
    const json = await response.json()
    let toAppend =
      current == count ? `${JSON.stringify(json)}]` : `${JSON.stringify(json)},`
    fs.appendFile("./allMeta.json", toAppend, (err) => {
      if (err) throw err
      console.log('The "data to append" was appended to file!')
    })
    console.log(json)
    current++
  }
}

const countooor = async () => {
  const meta = require("./allMeta.json")
  const counting = async () => {
    for (let i = 0; i < meta.length; i++) {
      const currAttributes = meta[i].attributes
      for (let j = 0; j < currAttributes.length; j++) {
        trait = currAttributes[j]
        const addCount = (_trait) => {
          if (traitCounts[_trait.trait_type][_trait.value]) {
            traitCounts[_trait.trait_type][_trait.value] += 1
          } else {
            traitCounts[_trait.trait_type][_trait.value] = 1
          }
        }
        if (traitCounts[trait.trait_type]) {
          addCount(trait)
        } else {
          traitCounts[trait.trait_type] = {}
          addCount(trait)
        }
      }
    }
  }

  await counting()
  fs.writeFile("./traitCounts.json", JSON.stringify(traitCounts), (err) => {
    if (err) throw err
    console.log('The "data to append" was appended to file!')
  })
}

const rarityCalc = async () => {
  let rarityResults = {}
  const traitCounts = require("./traitCounts.json")
  const allMeta = require("./allMeta.json")

  const compileScores = async () => {
    for (let i = 0; i < allMeta.length; i++) {
      const entry = allMeta[i]
      let traitScores = {}
      for (let t = 0; t < entry.attributes.length; t++) {
        const attr = entry.attributes[t]
        traitScores[attr.trait_type] = {
          rarityScore:
            1 / (traitCounts[attr.trait_type][attr.value] / allMeta.length),
          occurence: traitCounts[attr.trait_type][attr.value] / allMeta.length,
          value: attr.value,
        }
      }
      const totalRarityScore = Object.values(traitScores).reduce(
        (acc, curr) => acc + curr.rarityScore,
        0
      )
      const averageTraitOccurence = Object.values(traitScores).reduce(
        (acc, curr) => acc + curr.occurence,
        0
      )
      traitScores.totalscore = {
        rarityScore: totalRarityScore,
        averageTraitOccurence: averageTraitOccurence,
      }
      rarityResults[i + 1] = traitScores
    }
  }

  await compileScores()
  fs.writeFile("./rarityResults.json", JSON.stringify(rarityResults), (err) => {
    if (err) throw err
    console.log('The "data to append" was appended to file!')
  })
}

const rarityRanking = async () => {
  const rarityResults = require("./rarityResults.json")
  // create array of score rankings based on element.totalscore.rarityScore
  const scoreRankings = Object.values(rarityResults).map((element, index) => {
    return {
      id: index + 1,
      value: element.totalscore.rarityScore,
    }
  })
  // sort array by score
  scoreRankings.sort((a, b) => b.value - a.value)

  fs.writeFile("./scoreRankings.json", JSON.stringify(scoreRankings), (err) => {
    if (err) throw err
    console.log('The "data to append" was appended to file!')
  })
}

rarityRanking()
