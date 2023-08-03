import { createGlobalStyle } from 'styled-components';
import chab from '../fonts/chab.ttf';
import jalnan from '../fonts/Jalnan.ttf';
import Dotum_Light from '../fonts/Dotum_Light.ttf';
import Dotum_Medium from '../fonts/Dotum_Medium.ttf';
import Dotum_Bold from '../fonts/Dotum_Medium.ttf';
import tt from '../fonts/tt.ttf';
import Pilseung_Gothic from '../fonts/Pilseung_Gothic.ttf';
import Leferi from '../fonts/Leferi.ttf';

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
    @font-face {
        font-family: 'Dotum_Light';
        src: local('Dotum_Light'), local('Dotum_Light');
        font-style: normal;
        src: url(${Dotum_Light}) format('truetype');
    }
    @font-face {
        font-family: 'Dotum_Medium';
        src: local('Dotum_Medium'), local('Dotum_Medium');
        font-style: normal;
        src: url(${Dotum_Medium}) format('truetype');
    }
    @font-face {
        font-family: 'Dotum_Bold';
        src: local('Dotum_Bold'), local('Dotum_Bold');
        font-style: normal;
        src: url(${Dotum_Bold}) format('truetype');
    }
    @font-face {
        font-family: 'tt';
        src: local('tt'), local('tt');
        font-style: normal;
        src: url(${tt}) format('truetype');
    }
    @font-face {
        font-family: 'Pilseung_Gothic';
        src: local('Pilseung_Gothic'), local('Pilseung_Gothic');
        font-style: normal;
        src: url(${Pilseung_Gothic}) format('truetype');
    }
    @font-face {
        font-family: 'Leferi';
        src: local('Leferi'), local('Leferi');
        font-style: normal;
        src: url(${Leferi}) format('truetype');
    }
`;

export default GlobalStyle;
