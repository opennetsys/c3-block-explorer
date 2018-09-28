import React, { Component } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import toBuffer from 'typedarray-to-buffer'
import {request} from './lib/api'
import {BlockResponse, ErrorResponse} from './pb/c3_pb'
import {bufferHex2Int, hex2Int, int2Hex} from './util'

const UI = {
  Container: styled.div`
    padding: 1em;
    max-width: 1024px;
    margin: 0 auto;
  `,
  Title: styled.h2`
    display: block;
    color: #222;
    font-weight: normal;
    margin-bottom: 0.2em;
  `,
  TableContainer: styled.div`
  `,
  Table: styled.table`
    width: 100%;
  `,
  THead: styled.thead`
  `,
  TBody: styled.tbody`
  `,
  TR: styled.tr`

  `,
  TD: styled.td`
    padding: 0.2em;
    max-width: 100px;
    text-overflow: ellipsis;
    overflow: hidden;
  `,
  TH: styled.th`
    font-weight: bold;
    background: #eaeaea;
    padding: 0.2em;
  `
}

class View extends Component {
  constructor () {
    super()

    this.state = {
      recentBlocks: null
    }
  }

  async componentDidMount () {
    this.update()
    setInterval(() => this.update(), 20e3)
  }

  render () {
    const blocks = (this.state.recentBlocks || []).map((block, i) => {
      return (
        <UI.TR key={block.hash}>
          <UI.TD><a href={`/blocks/${block.number}`}>{block.hash}</a></UI.TD>
          <UI.TD><a href={`/blocks/${block.number}`}>{block.number}</a></UI.TD>
          <UI.TD>{block.timestamp}</UI.TD>
          <UI.TD>{block.nonce}</UI.TD>
          <UI.TD>{block.stateBlocksMerkleHash}</UI.TD>
          <UI.TD>{block.prevBlockHash}</UI.TD>
        </UI.TR>
      )
    })

    return (
      <UI.Container>
        <UI.Title>Recent Blocks</UI.Title>
        <UI.TableContainer>
          <UI.Table>
            <UI.THead>
              <UI.TR>
                <UI.TH>Hash</UI.TH>
                <UI.TH>Number</UI.TH>
                <UI.TH>Timestamp</UI.TH>
                <UI.TH>Nonce</UI.TH>
                <UI.TH>State Blocks Merkle Hash</UI.TH>
                <UI.TH>Prev Block Hash</UI.TH>
              </UI.TR>
            </UI.THead>
            <UI.TBody>
              {blocks}
            </UI.TBody>
          </UI.Table>
        </UI.TableContainer>
      </UI.Container>
    )
  }

  async update () {
    try {
      const blocks = await this.fetchBlocks()
      this.setState({
        recentBlocks: blocks
      })
    } catch (err) {
      console.error(err)
    }
  }

  async fetchLatestBlockNumber () {
    const payload = {
      jsonrpc: '2.0',
      id: 1,
      method: 'c3_latestBlock',
      params: []
    }

    const json = await request(payload)
    if (!json.data) {
      throw new Error('value empty')
    }

    const buf = toBuffer(json.data.value.data)
    return bufferHex2Int(buf)
  }

  async fetchBlocks () {
    const latestBlockNumber = await this.fetchLatestBlockNumber()
    const promises = []
    let min = latestBlockNumber - 20
    if (min < 0) {
      min = 0
    }
    for (let i = latestBlockNumber; i > min; i--) {
      promises.push(this.fetchBlock(i))
    }

    return Promise.all(promises).then(x => {
      return _.orderBy(x.filter(x => x), (a, b) => a > b)
    })
  }

  async fetchBlock (blockNumber) {
    if (blockNumber <= 0) {
      return null
    }

    const payload = {
      jsonrpc: '2.0',
      id: 1,
      method: 'c3_getBlock',
      params: [int2Hex(blockNumber)]
    }

    const json = await request(payload)
    if (!json.data) {
      throw new Error('value empty')
    }
    const buf = toBuffer(json.data.value.data)
    if (json.data.type_url.indexOf('Error') > -1) {
      const error = ErrorResponse.deserializeBinary(buf)
      console.error(error.getMessage())
      return null
    }
    const block = BlockResponse.deserializeBinary(buf)
    return {
      hash: block.getBlockhash(),
      number: hex2Int(block.getBlocknumber()),
      timestamp: block.getBlocktime(),
      nonce: block.getNonce(),
      stateBlocksMerkleHash: block.getStateblocksmerklehash(),
      prevBlockHash: block.getPrevblockhash()
    }
  }
}

export default View
