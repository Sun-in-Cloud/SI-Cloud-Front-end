import { BrowserMultiFormatReader } from '@zxing/library';
import { useEffect, useRef, useState } from 'react';

const BarcodeScan = (props: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reader = useRef(new BrowserMultiFormatReader());

  const [wresult, setResult] = useState<string>('ss');

  useEffect(() => {
    if (!videoRef.current) return;
    reader.current.decodeFromConstraints(
      {
        audio: false,
        video: {
          facingMode: 'environment', //user
        },
      },
      videoRef.current,
      (result: any, error: any) => {
        if (result) {
          console.log(result);
          props.getItem(result.text);
          setResult(result.text);
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
      <p>{wresult}s</p>
    </>
  );
};
export default BarcodeScan;
