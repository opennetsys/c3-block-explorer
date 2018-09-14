import React, { Component } from 'react';
import styled from 'styled-components';

const UI = {
  Footer: styled.footer`
    background: #122e30;
    color: #fff;
    padding: 1em;
    min-height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  `,
  FooterInner: styled.div`
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 1em;
  `,
  Copyright: styled.div`
    font-size: 1em;
  `
}

class View extends Component {
  render() {
    return (
      <UI.Footer>
        <UI.FooterInner>
          <UI.Copyright>© 2018 C3 Labs</UI.Copyright>
        </UI.FooterInner>
      </UI.Footer>
    );
  }
}

export default View;
