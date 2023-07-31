'use client';

import { useRef } from 'react';
import Image from 'next/image';

import romy001 from '../public/Romy001.jpg';
import romy002 from '../public/Romy002.jpg';
import romy003 from '../public/Romy003.jpg';
import romy004 from '../public/Romy004.jpg';
import romy005 from '../public/Romy005.jpg';
import romy006 from '../public/Romy006.jpg';
import romy007 from '../public/Romy007.jpg';

const importedImages = [
  { id: 'romy001', image: romy001, desc: 'Dog by the fireplace' },
  { id: 'romy002', image: romy002, desc: 'Dog on rug outside' },
  { id: 'romy003', image: romy003, desc: "Dog on Alice's lap" },
  { id: 'romy004', image: romy004, desc: 'Dog with Clara' },
  { id: 'romy005', image: romy005, desc: 'Dog outside under bush' },
  { id: 'romy006', image: romy006, desc: 'Dog inside looking playful' },
  { id: 'romy007', image: romy007, desc: 'Dog in car with Alice' },
];

export default function Home() {

  const images = importedImages.map(image => {
    return (
      <Image
        key={image.id}
        className="image"
        src={image.image}
        alt={image.desc}
        placeholder="blur"
        draggable="false"
      />
    );
  });

  const track = useRef(null);

  const handleOnDown = e => track.current.dataset.mouseDownAt = e.clientX;

  const handleOnUp = () => {
    track.current.dataset.mouseDownAt = "0";
    track.current.dataset.prevPercentage = track.current.dataset.percentage;
  };
  
  const handleOnMove = e => {
    if (track.current.dataset.mouseDownAt === "0") return;
    
    const mouseDelta = parseFloat(track.current.dataset.mouseDownAt) - e.clientX, maxDelta = window.innerWidth / 2;
    
    const percentage = (mouseDelta / maxDelta) * -100;
    const nextPercentageUnconstrained = parseFloat(track.current.dataset.prevPercentage) + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
    
    track.current.dataset.percentage = nextPercentage;
    
    track.current.animate({
      transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });
    
    for (const image of track.current.getElementsByClassName("image")) {
      image.animate({
        objectPosition: `${100 + nextPercentage}% center`
      }, { duration: 1200, fill: "forwards" });
    }
  };
  
  /* -- Had to add extra lines for touch events -- */
  window.onmousedown = e => handleOnDown(e);
  window.ontouchstart = e => handleOnDown(e.touches[0]);
  window.onmouseup = e => handleOnUp(e);
  window.ontouchend = e => handleOnUp(e.touches[0]);
  window.onmousemove = e => handleOnMove(e);
  window.ontouchmove = e => handleOnMove(e.touches[0]);

  return (
    <main>
      <div
        id="image-track"
        ref={track}
        data-mouse-down-at="0"
        data-prev-percentage="0"
      >
        {images}
      </div>
    </main>
  );
}
