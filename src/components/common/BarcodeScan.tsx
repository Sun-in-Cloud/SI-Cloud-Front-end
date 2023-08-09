import { BrowserMultiFormatReader } from '@zxing/library';
import { useEffect, useRef, useState } from 'react';

const BarcodeScan = (props: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reader = useRef(new BrowserMultiFormatReader());

  const [result, setResult] = useState<string>('');

  useEffect(() => {
    if (!videoRef.current) return;
    reader.current.decodeFromConstraints(
      {
        audio: false,
        video: {
          facingMode: 'environment',
        },
      },
      videoRef.current,
      (result: any, error: any) => {
        if (result) {
          console.log(result);
          props.getItem(result.text);
        }
        //if (error) console.log(error);
      },
    );
    return () => {
      reader.current.reset();
    };
  }, [videoRef]);

  return (
    <>
      <video ref={videoRef} style={{ width: '100%' }} />
      <p>{result}</p>
    </>
  );
};
export default BarcodeScan;
