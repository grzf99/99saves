import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import Modal from '../common/modal';
import { colors } from '../styles/variables';
import { Heading, Heading2, Text } from '../common/typography';
import Button from '../common/button';

const Title = styled(Heading)`
  padding: 8.5px 0;

  @media (max-width: 568px) {
   font-size: 19px;
  }
`;

const TextArea = styled.textarea`
  padding: 5px;
  margin: 5px 0 0 0;
  border: solid 1px ${colors.lightgray};
  border-radius: 5px;
  width: 100%;
  height: 100px;
  font-size: 14px;
  outline: none;
`;

const Subtitle = styled(Heading2)`
  padding: 8.5px 0;
  color: ${colors.lightgray};

  @media (max-width: 568px) {
   font-size: 13px;
  }
`;

const Content = styled(Text)`
  padding: 8.5px 0 35px 0;
  font-size: 14px;
  color: ${colors.lightgray};
  text-align: ${props => (props.align ? props.align : 'left')};

  @media (max-width: 568px) {
   font-size: 12px;
  }
`;

export default class extends Component {
  static propTypes = {
    title: PropTypes.func.isRequired,
    subtitle: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      feedback: '',
      isOpen: true,
    };
    this.sendFeedback = this.sendFeedback.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  keyHandle = (e) => {
    if (e.key === 'Enter' && this.isFormValid()) {
      this.sendFeedback(e);
    }
  };

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  isFormValid() {
    return this.state.feedback !== '';
  }

  sendFeedback(e) {
    e.preventDefault();
  }

  onClose() {
    this.setState({ isOpen: false })
  }

  render() {
    return (
      <Modal isOpen={this.state.isOpen} onClose={this.onClose} width="88%">
        <div>
          <Title uppercase>{this.props.title}</Title>
          <Subtitle uppercase dangerouslySetInnerHTML={{__html: this.props.subtitle}}/>
          <Content>
            Conte para gente sua sugestao!
            <TextArea
              maxLength='500'
              name="feedback"
              onChange={this.handleChange}
              value={this.state.email}
              onKeyUp={this.keyHandle}
              value={this.state.feedback}/>

          </Content>
          <Button block large disabled={!this.isFormValid()} onClick={this.sendFeedback}>
            Enviar
          </Button>
        </div>
      </Modal>
    );
  }
}
