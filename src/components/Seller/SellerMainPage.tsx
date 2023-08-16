import * as THREE from 'three';
import { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useIntersect, Image, ScrollControls, Scroll } from '@react-three/drei';
import one from '../../img/registerImg/1.jpg';
import two from '../../img/registerImg/2.jpg';
import three from '../../img/registerImg/3.jpg';
import four from '../../img/registerImg/4.jpeg';
import five from '../../img/registerImg/5.jpeg';
import six from '../../img/registerImg/6.jpeg';
import seven from '../../img/registerImg/7.jpeg';
import eight from '../../img/registerImg/8.jpeg';
import nine from '../../img/registerImg/9.png';
import ten from '../../img/registerImg/10.jpeg';
import eleven from '../../img/registerImg/11.jpeg';
import twelve from '../../img/registerImg/12.png';
import { styled } from 'styled-components';

function Item({ url, scale, ...props }: any) {
  const visible: any = useRef(false);
  const [hovered, hover] = useState(false);
  const ref: any = useIntersect((isVisible) => (visible.current = isVisible));
  const { height } = useThree((state) => state.viewport);
  useFrame((state, delta) => {
    ref.current.position.y = THREE.MathUtils.damp(
      ref.current.position.y,
      visible.current ? 0 : -height / 2 + 1,
      4,
      delta,
    );
    ref.current.material.zoom = THREE.MathUtils.damp(ref.current.material.zoom, visible.current ? 1 : 1.5, 4, delta);
    ref.current.material.grayscale = THREE.MathUtils.damp(ref.current.material.grayscale, hovered ? 1 : 0, 4, delta);
  });
  return (
    <group {...props}>
      <Image ref={ref} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)} scale={scale} url={url} />
    </group>
  );
}

function Items() {
  const { width: w, height: h } = useThree((state) => state.viewport);
  return (
    <Scroll>
      <Item url={one} scale={[w / 1.5, w / 3, 1]} position={[-w / 6, 0, 0]} />
      <Item url={two} scale={[2, w / 3, 1]} position={[w / 30, -h, 0]} />
      <Item url={three} scale={[w / 3, w / 5, 1]} position={[-w / 4, -h * 1, 0]} />
      <Item url={four} scale={[w / 5, w / 5, 1]} position={[w / 4, -h * 1.2, 0]} />
      <Item url={five} scale={[w / 5, w / 5, 1]} position={[w / 10, -h * 1.75, 0]} />
      <Item url={six} scale={[w / 3, w / 3, 1]} position={[-w / 4, -h * 2, 0]} />
      <Item url={seven} scale={[w / 3, w / 5, 1]} position={[-w / 4, -h * 2.6, 0]} />
      <Item url={eight} scale={[w / 2, w / 2, 1]} position={[w / 4, -h * 3.1, 0]} />
      <Item url={nine} scale={[w / 2, w / 2, 1]} position={[w / 4, -h * 3.1, 0]} />
      <Item url={ten} scale={[w / 2, w / 2, 1]} position={[w / 4, -h * 3.1, 0]} />
      <Item url={eleven} scale={[w / 2, w / 2, 1]} position={[w / 3, -h * 3.1, 0]} />
    </Scroll>
  );
}

function SellerMainPage(props: any) {
  return (
    <Marketing>
      <Canvas
        orthographic
        camera={{ zoom: 70 }}
        gl={{ alpha: false, antialias: false, stencil: false, depth: false }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={['#f4f0ed']} />
        <ScrollControls damping={3.5} pages={5}>
          <Items />
          <Scroll html>
            <h1
              style={{
                position: 'relative',
                top: `40vh`,
                left: `37vh`,
                fontSize: '8em',
                color: '#9b673c',
                transform: `translate3d(0,-100%,0)`,
                fontFamily: 'KBO',
              }}
            >
              siCloud
            </h1>
            <h1 style={{ position: 'relative', top: '50vh', left: '-5vw', fontFamily: 'KBO', fontSize: '6em' }}>
              새로운
            </h1>
            <h1 style={{ position: 'relative', top: '145vh', left: '33vw', fontFamily: 'KBO', fontSize: '5em' }}>
              물류관리
            </h1>
            <h1
              style={{
                position: 'relative',
                top: '170vh',
                left: '30vw',
                fontFamily: 'KBO',
                fontSize: '6em',
                letterSpacing: '3px',
              }}
            >
              매칭과
            </h1>
            <h1
              style={{
                position: 'relative',
                top: '190vh',
                right: '0vw',
                fontFamily: 'KBO',
                fontSize: '5em',
                letterSpacing: '3px',
              }}
            >
              솔루션
              <br />
              제안까지
            </h1>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </Marketing>
  );
}
const Marketing = styled.div`
  width: 100%;
  height: 100%;
  margin-top: -20px;
`;

export default SellerMainPage;
