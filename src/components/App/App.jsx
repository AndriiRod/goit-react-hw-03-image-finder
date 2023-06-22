import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from 'components/Searchbar/';
import ImageGallery from 'components/ImageGallery/';
import Loader from 'components/Loader/';
import LoadMoreBtn from 'components/Button/';
import Modal from 'components/Modal/Modal';

import { Sections } from './App.styled';

import * as API from '../api';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  COMPLETED: 'completed',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    searchRequest: '',
    images: [],
    status: Status.IDLE,
    showModal: false,
    selectedImage: '',
    page: 1,
    maxPage: 0,
    perPage: 12,
  };

  componentDidUpdate(_, prevState) {
    console.log('asss');
    const { searchRequest, page } = this.state;
    if (searchRequest !== prevState.searchRequest || page !== prevState.page) {
      this.setState({ status: Status.PENDING });
      this.makeRequest();
    }
  }

  setStateNewRequestValue = input => {
    if (input === this.state.searchRequest) {
      toast.info('Images for this query are already displayed');
      return;
    }
    this.setState({
      searchRequest: input,
      images: [],
      page: 1,
      maxPage: 0,
    });
  };

  setStateAddNewElement = newImages => {
    this.setState(
      prevState => ({
        images: [...prevState.images, ...newImages],
        status: Status.RESOLVED,
      }),
      () => {
        const { maxPage, page } = this.state;
        if (maxPage === page) {
          this.setState({
            status: Status.COMPLETED,
          });
        }
      }
    );
  };

  setStateIncrementPageCounter = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  makeRequest = async () => {
    const { searchRequest, page, perPage } = this.state;
    try {
      const response = await API.searchPicture(searchRequest, page, perPage);
      if (response.total === 0) {
        throw new Error('No matches found');
      }

      if (page === 1) {
        this.setState({
          maxPage: Math.ceil(response.totalHits / perPage),
        });
      }
      this.setStateAddNewElement(response.hits);
    } catch (error) {
      this.setState({ status: Status.REJECTED });
      toast.warning(error.message);
    }
  };

  toggleModal = imageUrl => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      selectedImage: imageUrl || '',
    }));
  };

  render() {
    const { images, status, showModal, selectedImage } = this.state;
    return (
      <Sections>
        <Searchbar enterNewSearchValue={this.setStateNewRequestValue} />
        <ImageGallery images={images} onOpenModal={this.toggleModal} />
        {status === Status.PENDING && <Loader />}
        {status === Status.RESOLVED && (
          <LoadMoreBtn handleClick={this.setStateIncrementPageCounter} />
        )}
        {showModal && (
          <Modal closeModal={this.toggleModal} selectedImage={selectedImage} />
        )}
        <ToastContainer theme="colored" />
      </Sections>
    );
  }
}

export default App;
