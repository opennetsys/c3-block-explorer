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
    text-overflow: ellipsis;
    overflow: hidden;
    :first-child {
      min-width: 200px;
      font-weight: bold;
      background: #eaeaea;
      padding: 0.2em;
    }
  `,
  TH: styled.th`
  `
}

class View extends Component {
  constructor (props) {
    super()
    const {blockNumber} = props.match.params

    this.state = {
      block: null,
      blockNumber
    }
  }

  async componentDidMount () {
    this.update()
    setInterval(() => this.update(), 60e3)
  }

  render () {
    const { block, blockNumber } = this.state

    return (
      <UI.Container>
        <UI.Title>Block <strong>#{blockNumber || '-'}</strong></UI.Title>
        <UI.TableContainer>
          <UI.Table>
            <UI.TBody>
              <UI.TR>
                <UI.TD>Hash</UI.TD>
                <UI.TD>{block ? block.hash : '-'}</UI.TD>
              </UI.TR>
              <UI.TR>
                <UI.TD>Number</UI.TD>
                <UI.TD>{block ? block.number : '-'}</UI.TD>
              </UI.TR>
              <UI.TR>
                <UI.TD>Timestamp</UI.TD>
                <UI.TD>{block ? block.timestamp : '-'}</UI.TD>
              </UI.TR>
              <UI.TR>
                <UI.TD>Nonce</UI.TD>
                <UI.TD>{block ? block.nonce : '-'}</UI.TD>
              </UI.TR>
              <UI.TR>
                <UI.TD>State Blocks Merkle Hash</UI.TD>
                <UI.TD>{block ? block.stateBlocksMerkleHash : '-'}</UI.TD>
              </UI.TR>
              <UI.TR>
                <UI.TD>Prev Block Hash</UI.TD>
                <UI.TD>{block ? block.prevBlockHash : '-'}</UI.TD>
              </UI.TR>
              <UI.TR>
                <UI.TD>Miner</UI.TD>
                <UI.TD>{block ? block.miner : '-'}</UI.TD>
              </UI.TR>
              <UI.TR>
                <UI.TD>Difficulty</UI.TD>
                <UI.TD>{block ? block.difficulty : '-'}</UI.TD>
              </UI.TR>
            </UI.TBody>
          </UI.Table>
        </UI.TableContainer>
      </UI.Container>
    )
  }

  async update () {
    const {blockNumber} = this.state

    try {
      const block = await this.fetchBlock(blockNumber)
      this.setState({
        block
      })
    } catch (err) {
      console.error(err)
    }
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
      prevBlockHash: block.getPrevblockhash(),
      miner: block.getMineraddress(),
      difficulty: block.getDifficulty()
    }
  }
}

export default View
