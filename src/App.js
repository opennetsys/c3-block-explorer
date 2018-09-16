import React, { Component } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import styled from 'styled-components'
import Header from './Header'
import Footer from './Footer'
import BlocksView from './BlocksView'
import BlockView from './BlockView'

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
        <UI.App key={'key-app'}>
          <Header />
          <BrowserRouter>
            <Switch>
              <Route exact path='/' component={BlocksView} />
              <Route exact path='/blocks/:blockNumber' component={BlockView} />
            </Switch>
          </BrowserRouter>
        </UI.App>,
        <Footer key={'key-footer'} />
      ]
    )
  }
}

export default App
