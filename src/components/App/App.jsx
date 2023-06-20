import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from 'components/Searchbar/';
import ImageGallery from 'components/ImageGallery/';
import Loader from 'components/Loader/';
import LoadMoreBtn from 'components/Button/';

import { Sections } from './App.styled';

import * as API from '../api';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    searchRequest: '',
    images: [],
    status: Status.IDLE,
    page: 1,
  };

  componentDidUpdate(_, prevState) {
    console.log('ffff');
    const { searchRequest, page } = this.state;
    if (searchRequest !== prevState.searchRequest || page !== prevState.page) {
      this.setState({ status: Status.PENDING });
      this.makeRequest();
    }
  }

  setStateNewRequestValue = input => {
    this.setState(prevState => {
      if (input !== prevState.searchRequest)
        return {
          searchRequest: input,
          images: [],
        };
      return null;
    });
  };

  setStateNewImages = newImages => {
    this.setState(prevState => ({
      images: [...prevState.images, ...newImages],
    }));
  };

  setStateUploadImages = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  makeRequest = async () => {
    try {
      const response = await API.searchPicture(
        this.state.searchRequest,
        this.state.page
      );
      if (response.data.total === 0) {
        throw new Error('No matches found');
      }
      this.setState({ status: Status.RESOLVED });
      this.setStateNewImages(response.data.hits);
    } catch (error) {
      this.setState({ status: Status.REJECTED });
      toast.warning(error.message);
    }
  };

  render() {
    const { images, status } = this.state;
    return (
      <Sections>
        <Searchbar enterNewSearchValue={this.setStateNewRequestValue} />
        <ImageGallery images={images} />
        {status === Status.PENDING && <Loader />}
        {status === Status.RESOLVED && (
          <LoadMoreBtn handleClick={this.setStateUploadImages} />
        )}
        <ToastContainer theme="colored" />
      </Sections>
    );
  }
}

export default App;
