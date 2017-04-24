import React from 'react';
import styled from 'styled-components';
import Container from './common/container';
import { colors } from './styles/variables';

const Gallery = styled(Container)`
  height: ${props => props.hasMultipleChildrens ? '344px' : '280px'};
  padding: 20px 0;
`;

const Slide = styled.div`
  display: ${props => props.active ? 'block' : 'none'};
  text-align: center;
  width: 100%;
  max-height: 100%;
  overflow: hidden;
`;

const Thumbs = styled.div`
  margin: 20px auto 0;
  text-align: center;
  width: 100%;
`;

const Thumb = styled.button`
  background: transparent;
  border: 1px solid ${props => props.active ? colors.gray : 'transparent'};
  cursor: pointer;
  margin: 2px;
  padding: 0;

  > img {
    display: block;
    max-width: 44px;
  }
`;

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 0,
      images: React.Children.toArray(props.children)
    };

    this.setActive = this.setActive.bind(this);
    this.renderImages = this.renderImages.bind(this);
    this.renderThumbs = this.renderThumbs.bind(this);
  }

  setActive(index) {
    this.setState({ active: index });
  }

  renderImages(child, index) {
    return (
      <Slide key={index} active={index === this.state.active}>
        {child}
      </Slide>
    );
  }

  renderThumbs(child, index) {
    return (
      <Thumb
        key={index}
        active={index === this.state.active}
        onClick={() => this.setActive(index)}
      >
        {child}
      </Thumb>
    );
  }

  render() {
    return (
      <Gallery {...this.props} hasMultipleChildrens={this.state.images.length > 1}>
        {this.state.images.map(this.renderImages)}

        {
          this.state.images.length > 1 && (
            <Thumbs>
              {this.state.images.map(this.renderThumbs)}
            </Thumbs>
          )
        }
      </Gallery>
    );
  }
}
