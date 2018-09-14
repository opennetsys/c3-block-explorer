import React, { Component } from 'react'
import styled from 'styled-components'

const UI = {
  Header: styled.header`
    background: #122e30;
    color: #fff;
    padding: 1em;
  `,
  HeaderInner: styled.div`
    max-width: 1024px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  `,
  Title: styled.h1`
    display: inline-block;
    color: #fff;
    font-weight: normal;
  `,
  TitleLink: styled.a`
    display: inline-block;
    text-decoration: none;
    display: flex;
    align-items: center;
  `,
  Logo: styled.img`
    width: 40px;
    height: auto;
    margin-right: 1em;
  `
}

class View extends Component {
  render () {
    return (
      <UI.Header>
        <UI.HeaderInner>
          <UI.TitleLink href='/'>
            <UI.Logo src='/images/c3-logo.svg' alt='logo' />
            <UI.Title>C3 Block Explorer</UI.Title>
          </UI.TitleLink>
        </UI.HeaderInner>
      </UI.Header>
    )
  }
}

export default View
