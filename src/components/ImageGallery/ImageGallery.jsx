import ImageGalleryItem from 'components/ImageGalleryItem';

import { GalleryList } from './ImageGallery.styled';

const ImageGallery = ({ images, onOpenModal }) => {
  if (!images || images.length === 0) {
    return <div></div>;
  }
  return (
    <GalleryList>
      {images.map(({ id, ...otherProperties }) => {
        return (
          <ImageGalleryItem
            key={id}
            otherProperties={otherProperties}
            onOpenModal={onOpenModal}
          />
        );
      })}
    </GalleryList>
  );
};

export default ImageGallery;
