import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ otherProperties }) => {
  const { tags, webformatURL, largeImageURL } = otherProperties;

  return (
    <GalleryItem>
      <GalleryItemImage
        src={webformatURL}
        alt={tags}
        data-large={largeImageURL}
      />
    </GalleryItem>
  );
};

export default ImageGalleryItem;
