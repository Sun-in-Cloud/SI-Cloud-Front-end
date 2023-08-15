import * as THREE from 'three';
import { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useIntersect, Image, ScrollControls, Scroll } from '@react-three/drei';
import one from '../../img/registerImg/1.jpg';
import two from '../../img/registerImg/2.jpg';
import three from '../../img/registerImg/3.jpg';
import four from '../../img/registerImg/4.jpg';
import five from '../../img/registerImg/5.jpg';
import six from '../../img/registerImg/6.jpg';
import seven from '../../img/registerImg/7.jpg';
import eight from '../../img/registerImg/8.jpg';
import nine from '../../img/registerImg/9.jpg';
import ten from '../../img/registerImg/10.jpg';
import eleven from '../../img/registerImg/11.jpg';
import twelve from '../../img/registerImg/12.jpg';
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
      <Item url={one} scale={[w / 3, w / 3, 1]} position={[-w / 6, 0, 0]} />
      <Item url={two} scale={[2, w / 3, 1]} position={[w / 30, -h, 0]} />
      <Item url={three} scale={[w / 3, w / 5, 1]} position={[-w / 4, -h * 1, 0]} />
      <Item url={four} scale={[w / 5, w / 5, 1]} position={[w / 4, -h * 1.2, 0]} />
      <Item url={five} scale={[w / 5, w / 5, 1]} position={[w / 10, -h * 1.75, 0]} />
      <Item url={six} scale={[w / 3, w / 3, 1]} position={[-w / 4, -h * 2, 0]} />
      <Item url={seven} scale={[w / 3, w / 5, 1]} position={[-w / 4, -h * 2.6, 0]} />
      <Item url={eight} scale={[w / 2, w / 2, 1]} position={[w / 4, -h * 3.1, 0]} />
      <Item url={nine} scale={[w / 2, w / 2, 1]} position={[w / 4, -h * 3.1, 0]} />
      <Item url={ten} scale={[w / 2, w / 2, 1]} position={[w / 4, -h * 3.1, 0]} />
      <Item url={eleven} scale={[w / 2, w / 2, 1]} position={[w / 4, -h * 3.1, 0]} />
      <Item url={twelve} scale={[w / 2.5, w / 2, 1]} position={[-w / 6, -h * 4.1, 0]} />
    </Scroll>
  );
}

function Threepl_MainPage(props: any) {
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
                color: '#0073ff',
                transform: `translate3d(0,-100%,0)`,
                fontFamily: 'Jalnan',
              }}
            >
              siCloud
            </h1>
            <h1 style={{ position: 'relative', top: '36vh', left: '-5vw', fontFamily: 'Jalnan', fontSize: '6em' }}>
              새로운
            </h1>
            <h1 style={{ position: 'relative', top: '120vh', left: '35vw', fontFamily: 'Jalnan', fontSize: '4em' }}>
              창고관리 시스템
            </h1>
            <h1
              style={{
                position: 'relative',
                top: '160vh',
                right: '0vw',
                fontFamily: 'Jalnan',
                fontSize: '4em',
                letterSpacing: '3px',
              }}
            >
              간편한 매칭서비스로
            </h1>
            <h1
              style={{
                position: 'relative',
                top: '200vh',
                left: '40vw',
                fontFamily: 'Jalnan',
                fontSize: '4em',
                letterSpacing: '3px',
              }}
            >
              빠른 계약
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

export default Threepl_MainPage;
