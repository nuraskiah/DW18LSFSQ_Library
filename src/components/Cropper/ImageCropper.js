import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from './cropImage';

const ImageCropper = ({ getBlob, inputImg, aspect, shape, size, resize }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [minZoom, setMinZoom] = useState(1);
  const [zoom, setZoom] = useState(1);

  const onCropComplete = async (_, croppedAreaPixels) => {
    const croppedImage = await getCroppedImg(
      inputImg,
      croppedAreaPixels,
      resize
    );
    getBlob(croppedImage);
  };

  return (
    <div
      className="crop-container"
      style={{ position: 'relative', width: size.height, height: size.height }}
    >
      <Cropper
        image={inputImg}
        crop={crop}
        zoom={zoom}
        aspect={aspect}
        cropShape={shape}
        cropSize={size}
        showGrid={false}
        zoomSpeed={0.15}
        onMediaLoaded={(imageSize) => {
          imageSize.naturalHeight <= imageSize.naturalWidth
            ? setMinZoom(size.height / imageSize.height)
            : setMinZoom(size.width / imageSize.width);
          setZoom(minZoom);
        }}
        minZoom={minZoom}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />
    </div>
  );
};

export default ImageCropper;
