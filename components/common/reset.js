import { colors } from '../styles/variables';

export default `
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${colors.black};
    margin: 0;
  }

  * {
    box-sizing: border-box;
    min-height: 0;
    min-width: 0;

    &:before, &:after {
      box-sizing: border-box;
    }
  }

  a {
    text-decoration: none;
  }
`;
