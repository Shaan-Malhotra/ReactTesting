import React from 'react';

interface PosterImgProps {
  url: string;
}

const PosterImg: React.FC<PosterImgProps> = ({ url }) => {
  return (
    <div>
      <img src={url}/>
    </div>
  );
};

export default PosterImg;