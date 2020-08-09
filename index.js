const fs = require('fs')
let { request, gql } = require('graphql-request')
const retry = require('async-retry')

const transfersQuery = gql`
  query getTransfers($first: Int!, $skip: Int!) {
	  transferEvents(orderBy: block, orderDirection: asc, first: $first, skip: $skip) {
	    id
	    block
	    timestamp
	    transfers(orderBy: logIndex, orderDirection: asc) {
	      id
	      logIndex
	      from
	      to
	      value
	      address
	    }
	  }
  }
`

const virtualPricesQuery = gql`
	query getVirtualPrices($first: Int!, $skip: Int!) {
		virtualPrices(orderBy: block, orderDirection: asc, first: $first, skip: $skip) {
		    id
		    address
		    block
		    timestamp
		    virtualPrice
	  	}
	}
`

const transfersBPTQuery = gql`
	query getTransfersBPT($first: Int!, $skip: Int!) {
	  transferEvents(orderBy: block, orderDirection: asc, first: $first, skip: $skip) {
	    id
	    block
	    timestamp
	    transfers(orderBy: logIndex, orderDirection: asc) {
	      id
	      logIndex
	      from
	      to
	      value
	      address
	    }
	  }
	}

`

async function runTransferQueries() {
	let transfers = []

	let first = 1000
	let skip = 0
	while(true) {
		//https://api.thegraph.com/subgraphs/name/pengiundev/crv-distribution
		let data
		await retry(async bail => {
			data = await request('https://api.thegraph.com/subgraphs/name/pengiundev/crv-distribution', transfersQuery, {
				first,
				skip
			})
		})
		if(!data.transferEvents.length) {
			break
		}
		transfers.push(...data.transferEvents)
		skip += 1000
		console.log(skip, "processed")
	}
	fs.writeFile("transferEventsFinal.json", JSON.stringify(transfers), (err) => {
		if(err) throw err
		console.log("saved")
	})
}

async function runVirtualPricesQueries() {
	let transfers = []

	let first = 1000
	let skip = 0
	while(true) {
		//https://api.thegraph.com/subgraphs/name/pengiundev/crv-distribution
		let data
		await retry(async bail => {
			data = await request('https://api.thegraph.com/subgraphs/name/pengiundev/crv-distribution-virtual-prices', virtualPricesQuery, {
				first,
				skip
			})
		})
		if(!data.virtualPrices.length) {
			break
		}
		transfers.push(...data.virtualPrices)
		skip += 1000
		console.log(skip, "processed")
	}
	fs.writeFile("virtualPricesFinal.json", JSON.stringify(transfers), (err) => {
		if(err) throw err
		console.log("saved")
	})
}

async function runVirtualPricesPAXQueries() {
	let transfers = []

	let first = 1000
	let skip = 0
	while(true) {
		//https://api.thegraph.com/subgraphs/name/pengiundev/crv-distribution
		let data
		await retry(async bail => {
			data = await request('https://api.thegraph.com/subgraphs/name/pengiundev/crv-distribution-pax-virt', virtualPricesQuery, {
				first,
				skip
			})
		})
		if(!data.virtualPrices.length) {
			break
		}
		transfers.push(...data.virtualPrices)
		skip += 1000
		console.log(skip, "processed")
	}
	fs.writeFile("virtualPricesPAXFinal.json", JSON.stringify(transfers), (err) => {
		if(err) throw err
		console.log("saved")
	})
}

async function runTransferBPTQueries() {
	let transfers = []

	let first = 1000
	let skip = 0
	while(true) {
		//https://api.thegraph.com/subgraphs/name/pengiundev/crv-distribution
		let data
		await retry(async bail => {
			data = await request('https://api.thegraph.com/subgraphs/name/pengiundev/crv-distribution-bpt', transfersBPTQuery, {
				first,
				skip
			})
		})
		if(!data.transferEvents.length) {
			break
		}
		transfers.push(...data.transferEvents)
		skip += 1000
		console.log(skip, "processed")
	}
	fs.writeFile("transferEventsBPTFinal.json", JSON.stringify(transfers), (err) => {
		if(err) throw err
		console.log("saved")
	})
}

async function runTransfercrYCRVQueries() {
	let transfers = []

	let first = 1000
	let skip = 0
	while(true) {
		//https://api.thegraph.com/subgraphs/name/pengiundev/crv-distribution
		let data
		await retry(async bail => {
			data = await request('https://api.thegraph.com/subgraphs/name/pengiundev/crv-distribution-cream', transfersBPTQuery, {
				first,
				skip
			})
		})
		if(!data.transferEvents.length) {
			break
		}
		transfers.push(...data.transferEvents)
		skip += 1000
		console.log(skip, "processed")
	}
	fs.writeFile("transferEventscrYCRVFinal.json", JSON.stringify(transfers), (err) => {
		if(err) throw err
		console.log("saved")
	})
}

async function runQueries() {

	await runTransferQueries()

	await runVirtualPricesQueries()

	await runVirtualPricesPAXQueries()

	await runTransferBPTQueries()

	await runTransfercrYCRVQueries()

}

runQueries()