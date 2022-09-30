function parseUrl(url) {
    if (!url) return { host: null, query: {} }
  
    let schemaIndex = url.indexOf('://')
    let url2 = url.substr(schemaIndex + 3)
    let host = url2.substr(0, url2.indexOf('/'))
  
    let paramIndex = url2.indexOf('?')
    if (paramIndex != -1){
      let query = {}
      let paramStr = url2.substr(paramIndex + 1)
      paramStr.split('&').forEach(str => {
        let params = str.split('=')
        query[params[0]] = params[1]
      })
      return { host, query }
    }else{
      let query = {}
      return { host, query }
    }
  }