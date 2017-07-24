import React from 'react';
import styled, { css } from 'styled-components';
import { colors } from '../styles/variables';
import Link from 'next/link';
import Tab from './tab';

const StyledTab = styled(Tab)`
  flex-grow: 0;
  cursor: pointer;
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

  ${props => props.show ? `
    background-image: url(/static/images/hamburguer_hover.png);
    background-color: #F8F8F8;
    border-bottom: 4px solid #F8F8F8;
    border-bottom: none;
  ` : ''};
`

const CategoryList = styled.div`
  min-width: 200px;
  min-height: 400px;
  padding: 10px 0;
  position: absolute;
  background-color: #F8F8F8;
  top: 44px;
  left: 0px;
  display: ${props => props.show ? `block` : 'none'};
  z-index: 2;

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    text-align: left;

    li {
      line-height: 35px;
      padding: 0 15px;
      color: ${colors.gray};
      margin-left: 2px;

      span {
        text-transform: none;
        font-size: 12px;
        font-weight: lighter;
      }

      &:hover {
        > div {
          display: block;
        }

        color: ${colors.green};
        background-color: #eeeded;
      }
    }
  }
`

const CategorySubtitle = styled.h2`
  font-size: 22px;
  margin: 0 15px;
  text-transform: initial;
  font-weight: lighter;
  color: ${colors.gray};
`

const CategorySubList = styled.div`
  min-width: 300px;
  min-height: 400px;
  padding: 10px 0;
  position: absolute;
  background-color: ${colors.white};
  top: 0px;
  left: 170px;
  display: none;
  z-index: 1;
  box-shadow: 2px 0 5px rgba(0,0,0,.2) inset;

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    text-align: left;

    li {
      line-height: 35px;
      padding: 0 15px;
      position: relative;
      color: ${colors.gray};
      margin-left: 2px;

      &:after {
        content: '>';
        display: block;
        position: absolute;
        right: 15px;
        top: 0px;
      }

      span {
        cursor: pointer;
        text-transform: none;
        font-size: 12px;
        font-weight: lighter;
        display: block;
        width: 100%;
      }

      &:hover {
        color: ${colors.green};
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
    this.showCategory = this.showCategory.bind(this);
    this.hideCategory = this.hideCategory.bind(this);
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

  showCategory() {
    this.props.onToggle(true);
  }

  hideCategory() {
    setTimeout(() => this.props.onToggle(false), 500);
  }

  renderList = () => {
    return [
      <li>
        <span onClick={() => {this.props.handleClick()}}>Todos</span>
      </li>,
      ...this.state.categories.map((category) =>
        <li>
            <span>
              {category.title}
            </span>
            <CategorySubList>
              <CategorySubtitle>{category.title}</CategorySubtitle>
              <ul>{ this.renderSubList(category.Categories) }</ul>
            </CategorySubList>
        </li>
      )
    ];
  };

  renderSubList = (subcategories) => {
    return subcategories.map((category) =>
        <li>
            <span onClick={() => {this.props.handleClick(category); this.hideCategory()}}>
              {category.title}
            </span>
        </li>
      );
  };

  render() {
    return (
      <StyledTab show={this.props.show} onClick={this.showCategory}>
        <CategoryList show={this.props.show}>
          <ul>{ this.renderList() }</ul>
        </CategoryList>
      </StyledTab>
    )
  }
}
