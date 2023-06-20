import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { FaRegGrinBeam } from 'react-icons/fa';

import {
  SearchBar,
  SearchForm,
  SearchFormButton,
  Label,
  Input,
} from './Searchbar.styled';

const Searchbar = ({ enterNewSearchValue }) => {
  const handleSubmit = (values, { resetForm }) => {
    const formattedInput = values.input.toLowerCase().trim();
    if (formattedInput === '') {
      toast.info('Request cannot be empty');
      return;
    }
    enterNewSearchValue(formattedInput);
    resetForm();
  };

  return (
    <SearchBar>
      <Formik initialValues={{ input: '' }} onSubmit={handleSubmit}>
        <SearchForm>
          <SearchFormButton type="submit">
            <FaRegGrinBeam size={20} />
            <Label>Search</Label>
          </SearchFormButton>

          <Input
            name="input"
            type="text"
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Formik>
    </SearchBar>
  );
};

export default Searchbar;
