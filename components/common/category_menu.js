import React from 'react';
import styled, { css } from 'styled-components';
import { colors } from '../styles/variables';
import Link from 'next/link';
import Tab from './tab';

const StyledTab = styled(Tab)`
  flex-grow: 0;
  cursor: inherit;
  -ms-flex-positive: 0;
  -webkit-flex-grow: 0;
  min-width: 60px;
  width: 60px;
  border-bottom: 4px solid ${colors.green};
  margin-right: 2px;
  background-image: url(/static/images/hamburguer.png);
  background-repeat: no-repeat;
  background-position: center center;
  z-index: 3;
  position: relative;

  &:hover {
    background-image: url(/static/images/hamburguer_hover.png);
    background-color: ${colors.white};
    border-bottom: 4px solid ${colors.white};
    border-bottom: none;

    > div {
      display: block;
    }
  }
`

const BackgroundShadow = styled.div`
    background-color: rgba(0,0,0,.8);
    width: 100%;
    height: 100%;
    position: fixed;
    top:0px;
    left:0px;
    z-index: 1;
    display: block;
`

const CategoryList = styled.div`
  min-width: 200px;
  min-height: 100px;
  padding: 10px 15px;
  position: absolute;
  background-color: ${colors.white};
  top: 44px;
  left: 0px;
  display: none;
  z-index: 2;

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    text-align: left;

    li {
      line-height: 35px;
      position: relative;

      &:after {
        content: '>';
        display: block;
        position: absolute;
        right: 0px;
        top: 0px;
      }

      span {
        cursor: pointer;
        text-transform: none;
        color: ${colors.gray};
        font-size: 12px;
        font-weight: lighter;
        display: block;
        width: 100%;

        &:hover {
          color: ${colors.green};
        }
      }
    }
  }
`

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: []
    }

    this.loadCategories();
  };

  loadCategories() {
    return this.props.api
      .get('/categories')
      .then(res => res.data)
      .then(categories => this.setState({ categories }))
      .then((subscriptions) => {
        this.setState({ subscriptions });
      });
  };

  renderList = () => {
    return [
      <li>
        <span onClick={() => {this.props.handleClick()}}>Todos</span>
      </li>,
      ...this.state.categories.map((category) =>
        <li>
            <span onClick={() => {this.props.handleClick(category)}}>
              {category.title}
            </span>
        </li>
      )
    ];
  };

  render() {
    return (
      <StyledTab>
        <CategoryList>
          <ul>{ this.renderList() }</ul>
        </CategoryList>
      </StyledTab>
    )
  }
}
