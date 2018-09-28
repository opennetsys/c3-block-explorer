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
    justify-content: space-between;
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
    :hover {
      text-decoration: none;
    }
  `,
  Logo: styled.img`
    width: 40px;
    height: auto;
    margin-right: 1em;
  `,
  GithubLink: styled.a`
    display: inline-block;
    text-decoration: none;
    display: flex;
    align-items: center;
    :hover {
      text-decoration: underline;
    }
  `,
}

class View extends Component {
  render () {
    return (
      <UI.Header>
        <UI.HeaderInner>
          <UI.TitleLink href='/'>
            <UI.Logo src='/images/c3-logo.svg' alt='logo' />
            <UI.Title>C3 Block Explorer (POC)</UI.Title>
          </UI.TitleLink>
          <UI.GithubLink
            href="https://github.com/c3systems/c3-block-explorer"
            target="_blank"
            rel="noopener noreferrer">
            Source code
          </UI.GithubLink>
        </UI.HeaderInner>
      </UI.Header>
    )
  }
}

export default View
