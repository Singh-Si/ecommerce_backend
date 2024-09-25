const pagination = async ( limit,page)=>{
    let skip
    limit = limit?+limit:10
    page = page?+page:1
    skip  = (page - 1)*limit
    return {limitCount:limit,skip}
}

module.exports = pagination