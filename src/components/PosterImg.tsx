import React from 'react';

interface PosterImgProps {
  url: string;
  children: any
}

const PosterImg: React.FC<PosterImgProps> = ({ url }) => {
  return (
    <div>
      <img src={url}/>
    </div>
  );
};

export default PosterImg;