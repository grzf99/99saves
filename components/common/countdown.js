import React from 'react';
import styled, { css } from 'styled-components';
import { colors } from '../styles/variables';
import { differenceInMinutes } from 'date-fns';

const CountDown = styled.div`
  background: transparent;
  color: ${colors.white};
  display: initial;
  font-family: 'Oswald', sans-serif;
  font-weight: 500;
  text-align: center;

  &.card {
    font-size: 14px;
    margin-top: 3px;
    height: 30px;
    width: 100%;
    z-index: 3;
`;

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countDown: '...',
    };
  }

  componentDidMount() {
    let date = this.getCountdown(this.props.date);
    this.timer = setInterval(() => {
      this.setState({
        countDown: date
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getCountdown(dt) {
    let date;
    if (this.props.status === 'subscription') {
        date = this.props.date_end;
    } else if (this.props.status === 'negotiation') {
        date = this.props.negotiation_end;
    } else if (this.props.status === 'votation') {
        date = this.props.votation_end;
    } else if (this.props.status === 'checkout') {
        date = this.props.checkout_end;
    }

    return this.countDownTimer(date);
  }

  countDownTimer(dt) {
      let end = new Date(dt);

      let _second = 1000;
      let _minute = _second * 60;
      let _hour = _minute * 60;
      let _day = _hour * 24;
      let timer;

      let now = new Date();
      let distance = Math.abs(end - now);

      let days = Math.floor(distance / _day);
      let hours = Math.floor((distance % _day) / _hour);
      let minutes = Math.floor((distance % _hour) / _minute);

      timer = (parseInt(days) > 0) ? days + ' dias ' : '';
      timer += (parseInt(hours) > 0) ? hours + ' horas ' : '';
      timer += minutes + ' minutos ';
      return timer
  }


  render() {
    return (
      <CountDown {...this.props} >
        { this.getCountdown(this.props.date) } ⏳
      </CountDown>
    );
  }
}
