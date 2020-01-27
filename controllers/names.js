const fs = require('fs')
const { promisify } = require('util')
const readFileAsync = promisify(fs.readFile)
const { wrapper } = require('../tools/funcWrapper')


module.exports.getListName = async (req, res) => {
  const contents = readFileAsync(`${__dirname}/data/test-data-10-exp-5.list`, 'utf8')
  const { error, data } = await wrapper(contents)
  if (error || data <= 0) {
    return res.status(500).send({ message: 'There was a problem deleting the user' })
  }
  arrayLine = data.split('\n')
  ListeName = []
  arrayLine.forEach(line => {
      if (line.indexOf(',') !== -1){
          const firstName = line.split(',')[0]
          const lasteName = line.split(',')[1].split('--')[0].replace(/ /g,'')
          ListeName.push({
            fullName: `${firstName} ${lasteName}`,
            firstName: firstName,
            lasteName: lasteName
          })
      }
  })
  const uniqueFullName = [...new Set(ListeName.map(name => name.fullName))]
  const uniqueFirstName = [...new Set(ListeName.map(name => name.firstName))]
  const uniqueLastName = [...new Set(ListeName.map(name => name.lasteName))]
  
  res.send({
    uniqueFullName: uniqueFullName.length,
    uniqueFirstName: uniqueFirstName.length,
    uniqueLastName: uniqueLastName.length
  })
}

module.exports.mostCommonFirstName = async (req, res) => {
    const contents = readFileAsync(`${__dirname}/data/test-data-10-exp-5.list`, 'utf8')
    const { error, data } = await wrapper(contents)
    if (error || data <= 0) {
        return res.status(500).send({ message: 'There was a problem deleting the user' })
    }
    var arrayLine = data.split('\n')
    var ListeName = []
    var countsFirstName = {}
    arrayLine.forEach(line => {
        if (line.indexOf(',') !== -1){
            const firstName = line.split(',')[0]
            const lasteName = line.split(',')[1].split('--')[0].replace(/ /g,'')
            countsFirstName[firstName] = countsFirstName[firstName] ? countsFirstName[firstName] + 1 : 1
            ListeName.push({
                fullName: `${firstName} ${lasteName}`,
                firstName: firstName,
                lasteName: lasteName
            })
        }
    })
    
    var listeTenFirstName = []
    for (name in countsFirstName){
        listeTenFirstName.push({
            name :name,
            nb: countsFirstName[name]
        })
    }

    listeTenFirstName = listeTenFirstName.sort((pla, plb) => {
    if (pla.nb > plb.nb) {
      return -1
    } else if (plb.nb > pla.nb) {
      return 1
    }
    return 0
  })

    res.send(listeTenFirstName.slice(0, 10))
}

module.exports.mostCommonLastName = async (req, res) => {
    const contents = readFileAsync(`${__dirname}/data/test-data-10-exp-5.list`, 'utf8')
    const { error, data } = await wrapper(contents)
    if (error || data <= 0) {
        return res.status(500).send({ message: 'There was a problem deleting the user' })
    }
    var arrayLine = data.split('\n')
    var ListeName = []
    var countsFirstLastName = {}
    arrayLine.forEach(line => {
        if (line.indexOf(',') !== -1){
            const firstName = line.split(',')[0]
            const lasteName = line.split(',')[1].split('--')[0].replace(/ /g,'')
            countsFirstLastName[lasteName] = countsFirstLastName[lasteName] ? countsFirstLastName[lasteName] + 1 : 1
            ListeName.push({
                fullName: `${firstName} ${lasteName}`,
                firstName: firstName,
                lasteName: lasteName
            })
        }
    })
    
    var listeTenFirstName = []
    for (name in countsFirstLastName){
        listeTenFirstName.push({
            name :name,
            nb: countsFirstLastName[name]
        })
    }

    listeTenFirstName = listeTenFirstName.sort((pla, plb) => {
    if (pla.nb > plb.nb) {
      return -1
    } else if (plb.nb > pla.nb) {
      return 1
    }
    return 0
  })

    res.send(listeTenFirstName.slice(0, 10))
}

module.exports.topUnique = async (req, res) => {
    const contents = readFileAsync(`${__dirname}/data/test-data-10-exp-5.list`, 'utf8')
    const { error, data } = await wrapper(contents)
    if (error || data <= 0) {
        return res.status(500).send({ message: 'There was a problem deleting the user' })
    }
    var arrayLine = data.split('\n')
    var listeNameUnique = []
    var listeFistName = []
    var isteLasteName = []
    arrayLine.forEach(line => {
        if (line.indexOf(',') !== -1){
            const firstName = line.split(',')[0]
            const lasteName = line.split(',')[1].split('--')[0].replace(/ /g,'')
           if (listeFistName.indexOf(firstName) === -1 && isteLasteName.indexOf(firstName) === -1) listeNameUnique.push(`${firstName} ${lasteName}`)
           listeFistName.push(firstName)
           listeFistName.push(lasteName)
        }
    })
    
    res.send(listeNameUnique.slice(0, 25))
}

module.exports.generateUnique = async (req, res) => {
    const contents = readFileAsync(`${__dirname}/data/test-data-10-exp-5.list`, 'utf8')
    const { error, data } = await wrapper(contents)
    if (error || data <= 0) {
        return res.status(500).send({ message: 'There was a problem deleting the user' })
    }
    var arrayLine = data.split('\n')
    var listeNameUnique = []
    var listeFistName = []
    var isteLasteName = []
    arrayLine.forEach(line => {
        if (line.indexOf(',') !== -1){
            const firstName = line.split(',')[0]
            const lasteName = line.split(',')[1].split('--')[0].replace(/ /g,'')
           if (listeFistName.indexOf(firstName) === -1 && isteLasteName.indexOf(firstName) === -1) listeNameUnique.push({
               firstName : firstName,
               lasteName: lasteName
           })
           listeFistName.push(firstName)
           listeFistName.push(lasteName)
        }
    })
    const topunique = listeNameUnique.slice(0, 25)
    var generatedListe = []
    for (k in topunique){
        if ( k !== listeNameUnique.length -1)
        {
            generatedListe.push({
                firstName: listeNameUnique[k].firstName,
                lasteName: listeNameUnique[parseInt(k) + 1].lasteName
            })
        }else{
            generatedListe.push({
                firstName: listeNameUnique[k].firstName,
                lasteName: listeNameUnique[0].lasteName
            })
        }
    }
    
    res.send(generatedListe.map(name => `${name.firstName} ${name.lasteName}`))
}
