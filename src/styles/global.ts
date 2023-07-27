import { createGlobalStyle } from 'styled-components';
import chab from '../fonts/chab.ttf';
import jalnan from '../fonts/Jalnan.ttf';

const GlobalStyle = createGlobalStyle`
    @font-face{
        font-family: 'chab';
        src: local('chab'), local('chab');
        font-style: normal;
        src: url(${chab}) format('truetype');
    }
    @font-face {
        font-family: 'jalnan';
        src: local('jalnan'), local('jalnan');
        font-style: normal;
        src: url(${jalnan}) format('truetype');
    }
`;

export default GlobalStyle;
