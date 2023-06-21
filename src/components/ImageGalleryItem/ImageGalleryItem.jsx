import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ otherProperties, onOpenModal }) => {
  const { tags, webformatURL, largeImageURL } = otherProperties;

  const handleClick = () => {
    onOpenModal(largeImageURL);
  };

  return (
    <GalleryItem>
      <GalleryItemImage src={webformatURL} alt={tags} onClick={handleClick} />
    </GalleryItem>
  );
};

export default ImageGalleryItem;
