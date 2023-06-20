import { ButtonLM } from './Button.styled';

const LoadMoreBtn = ({ handleClick }) => {
  return (
    <ButtonLM type="button" onClick={handleClick}>
      Load more
    </ButtonLM>
  );
};

export default LoadMoreBtn;
