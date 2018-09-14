import React, { Component } from 'react'
import styled from 'styled-components'
import Header from './Header'
import Footer from './Footer'
import BlocksView from './BlocksView'

const UI = {
  App: styled.div`
    min-width: 600px;
  `
}

// NOTE: footer is outside of App component so that it can be sticked to bottom of page
class App extends Component {
  render () {
    return (
      [
        <UI.App>
          <Header />
          <BlocksView />
        </UI.App>,
        <Footer />
      ]
    )
  }
}

export default App
