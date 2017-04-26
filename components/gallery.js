import React from 'react';
import styled from 'styled-components';
import Container from './common/container';
import { colors } from './styles/variables';
import RenderIf from './common/render-if';
import Image from '../components/common/image';

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
    };

    this.setActive = this.setActive.bind(this);
    this.renderImages = this.renderImages.bind(this);
    this.renderThumbs = this.renderThumbs.bind(this);
  }

  setActive(index) {
    this.setState({ active: index });
  }

  renderImages(image, index) {
    return (
      <RenderIf expr={!!image}>
        <Slide key={index} active={index === this.state.active}>
          <Image
            src={image}
            size={'240px'}
            alt={this.props.alt}
          />
        </Slide>
      </RenderIf>
    );
  }

  renderThumbs(image, index) {
    return (
      <RenderIf expr={!!image}>
        <Thumb
          key={index}
          active={index === this.state.active}
          onClick={() => this.setActive(index)}
        >
          <Image
            src={image}
            size={'44px'}
            alt={this.props.alt}
          />
        </Thumb>
      </RenderIf>
    );
  }

  render() {
    const activeImages = this.props.images.filter(i => i);
    return (
      <Gallery {...this.props} hasMultipleChildrens={activeImages.length > 1}>
        {activeImages.map(this.renderImages)}

        <RenderIf expr={activeImages.length > 1}>
          <Thumbs>
            {activeImages.map(this.renderThumbs)}
          </Thumbs>
        </RenderIf>
      </Gallery>
    );
  }
}
