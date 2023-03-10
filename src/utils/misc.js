import isEmpty from "./is-empty";
import { loadStripe } from '@stripe/stripe-js';

export const getNextAndPrevItemsOfArray = (array, currentItem) => {
  let nextItem = {}, prevItem = {}, nextItemIndex, prevItemIndex;
  const currentItemId = currentItem.details ? currentItem?.details?._id : currentItem._id
  array.find((item, index) => {
    if (item._id === currentItemId) {
      nextItemIndex = index + 1;
      prevItemIndex = index - 1;
      nextItem.details = array[nextItemIndex];
      prevItem.details = array[prevItem];
      nextItem.index = nextItemIndex;
      prevItem.index = prevItemIndex;
    }
  });
  // console.log("getNextAndPrevItemsOfArray", array, currentItem, nextItem, prevItem)

  return {
    nextItem: !isEmpty(nextItem) ? nextItem : null,
    prevItem: !isEmpty(prevItem) ? prevItem : null,
  };
};

export const sortObject = (obj) => {
  return Object.keys(obj).sort().reduce(function (result, key) {
    result[key] = obj[key];
    return result;
  }, {});
}

export const getAllItemsWithProgress = (allItems, progressArray) => {
  return allItems.map(details => {
    const progress = progressArray.find(progress => details._id === progress.id)

    return {
      details,
      progress
    }
  })
  // return progressArray.map(progress => {
  //   const details = allItems.find(details => details._id === progress.id)

  //   return {
  //     details,
  //     progress
  //   }
  // })
}
export const getItemWithProgress = (nextItem, prevItem, progressArray) => {
  // console.log("getItemWithProgress", nextItem, prevItem, progressArray)

  nextItem.progress = progressArray[nextItem.index]
  prevItem.progress = progressArray[prevItem.index]

  if (isEmpty(progressArray[nextItem.index])) nextItem = null
  if (isEmpty(progressArray[prevItem.index])) prevItem = null

  return {
    nextItem,
    prevItem
  };
};
export const getPercentage = (completed, total) => {
  return Math.round((completed / total) * 100);
};



export const sortArrayByDate = (array, key) => {
  if (isEmpty(key)) return array.sort((a, b) => new Date(a) - new Date(b));
  else
    return array.sort((a, b) => new Date(a[`${key}`]) - new Date(b[`${key}`]));
};

export const toggleFullScreen = () => {
  let myVideo = document.getElementById('myVideo');
  if (myVideo.requestFullscreen) {
    if (document.fullscreenElement) {
      // document.cancelFullScreen();
      document.webkitCancelFullScreen();
    } else {
      myVideo.requestFullscreen();
    }
  }
  else if (myVideo.msRequestFullscreen) {
    if (document.msFullscreenElement) {
      document.msExitFullscreen();
    } else {
      myVideo.msRequestFullscreen();
    }
  }
  else if (myVideo.mozRequestFullScreen) {
    if (document.mozFullScreenElement) {
      document.mozCancelFullScreen();
    } else {
      myVideo.mozRequestFullScreen();
    }
  }
  else if (myVideo.webkitRequestFullscreen) {
    if (document.webkitFullscreenElement) {
      document.webkitCancelFullScreen();
    } else {
      myVideo.webkitRequestFullscreen();
    }
  }
  else {
    alert("Fullscreen API is not supported");
  }
}

export const stripePromise = loadStripe('pk_test_51HfgSrIoqQ2sulu0x4TK6K2atQHghj1iIthjdrpD9qkE1yLx8nEFEYysxJrXn16tz6caSn1kMFFD6YnUl2MK05C800tBcU5bIH');

