import React, { Component, useEffect } from 'react';
// @ts-ignore
import Quagga from 'quagga';
import styled from 'styled-components';

const BarcodeScanner = (props: any) => {
  const _onDetected = (result: any) => {
    let code = result;
    Quagga.stop();
    return props.handleScan(code);
  };

  const _onProcessed = (result: any) => {};

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          constraints: {
            width: { min: 800, max: 1260 },
            height: { min: 500, max: 800 },
            aspectRatio: { min: 4 / 3, max: 16 / 9 },
          },
          area: {
            // defines rectangle of the detection/localization area
            top: '0%', // top offset
            right: '0%', // right offset
            left: '0%', // left offset
            bottom: '0%', // bottom offset
          },
        },
        frequency: 'full',
        locator: {
          patchSize: 'medium',
          halfSample: true,
        },
        numOfWorkers: 2,
        decoder: {
          readers: [
            // 'code_39_reader',
            'ean_reader',
            // 'ean_8_reader',
            // 'code_128_reader',
            //'code_39_vin_reader'
            //'codabar_reader',
            // 'upc_reader',
            //'upc_e_reader',
            //'i2of5_reader'
          ],
        },
        locate: true,
      },
      function (err: any) {
        if (err) {
          return console.log(err);
        }
        Quagga.start();
      },
    );
    Quagga.onDetected(_onDetected);
    Quagga.onProcessed(_onProcessed);
    return () => {
      Quagga.stop();
    };
  }, []);

  return (
    <ScanArea>
      <div id="interactive" className="viewport" />
      <div className="scanBorder">BARCODE</div>
    </ScanArea>
  );
};

const ScanArea = styled.div`
  position: relative;
  width: 300px;
  height: 200px;
  transform: scale(0.7, 0.7);
  .viewport {
    position: absolute;
    top: -200px;
    left: -530px;
    overflow: hidden;
  }
  .scanBorder {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 50px;
    top: 60px;
    left: -50px;
    font-size: 40px;
    border: solid 2px #fff;
    color: #fff;
    z-index: 666;
  }
`;

export { BarcodeScanner };
