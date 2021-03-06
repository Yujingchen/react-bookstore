import {
  TOGGLE_SIDEBAR,
  GET_MYBOOKS,
  SEARCH_BOOK,
  GET_BOOK,
  LOAD_MORE_BOOK,
  SEARCH_MORE_BOOK,
  ADD_CART,
  INCREASE_CART_COUNT,
  DECREASE_CART_COUNT,
  DELETE_CART,
  ADD_WISHLIST,
  DELETE_WISHLIST,
  GET_TOP10_FICTION,
  GET_TOP10_CHILDREN,
  GET_TOP10_ROMANCE,
  GET_TOP10_COMICS
} from "../actions/types";

const initialState = {
  sidebarToggled: true,
  book: {},
  books: [],
  result: [],
  carts: [],
  wishlist: [],
  top10: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return { ...state, sidebarToggled: !state.sidebarToggled };
    case GET_MYBOOKS:
      return { ...state, books: action.payload };
    case SEARCH_BOOK:
      return { ...state, result: action.payload };
    case GET_BOOK:
      return { ...state, book: action.payload };
    case LOAD_MORE_BOOK:
      return { ...state, books: action.payload };
    case SEARCH_MORE_BOOK:
      return { ...state, result: action.payload };
    case DELETE_CART:
      return {
        ...state,
        carts: state.carts.filter(cart => cart.id !== action.payload)
      };
    case ADD_CART:
      let tempCart = [...state.carts];
      let tempProduct = [...state.books];
      let tempResult = [...state.result];
      let tempItem = tempCart.find(item => item.id === action.payload);
      let total = 0;
      if (!tempItem) {
        tempItem = tempProduct.find(item => item.id === action.payload);
        if (!tempItem) {
          tempItem = tempResult.find(item => item.id === action.payload);
        }
        if (tempItem.saleInfo.hasOwnProperty("listPrice")) {
          total = parseFloat(tempItem.saleInfo.listPrice.amount.toFixed(2));
        }
        let cartItem = { ...tempItem, count: 1, total };
        tempCart = [...tempCart, cartItem];
      } else {
        tempItem.count++;
        if (tempItem.saleInfo.hasOwnProperty("listPrice")) {
          tempItem.total =
            parseFloat(tempItem.saleInfo.listPrice.amount.toFixed(2)) *
            tempItem.count;
        }
      }

      return {
        ...state,
        carts: tempCart
      };

    case INCREASE_CART_COUNT:
      //note:spelling mistake on state.cart can disable the reducer to dispatch
      let tempcart = [...state.carts];
      let cartitem = tempcart.find(item => item.id === action.payload);
      //note: action.payload.id do not get data, any error in code can cause reducer do not dispatch
      cartitem.count++;
      if (cartitem.saleInfo.hasOwnProperty("listPrice")) {
        cartitem.total =
          parseFloat(cartitem.saleInfo.listPrice.amount.toFixed(2)) *
          cartitem.count;
      }
      cartitem.total = parseFloat(cartitem.total.toFixed(2));
      return {
        ...state,
        carts: tempcart
      };

    case DECREASE_CART_COUNT:
      let tempcartD = [...state.carts];
      let cartitemD = tempcartD.find(item => item.id === action.payload);
      if (cartitemD.count !== 0) {
        cartitemD.count--;
        if (cartitemD.saleInfo.hasOwnProperty("listPrice")) {
          cartitemD.total =
            parseFloat(cartitemD.saleInfo.listPrice.amount.toFixed(2)) *
            cartitemD.count;
        }
        cartitemD.total = parseFloat(cartitemD.total.toFixed(2));
      }
      return {
        ...state,
        carts: tempcartD
      };
    case ADD_WISHLIST:
      let index2 = state.wishlist.findIndex(Item => Item.id === action.payload);
      if (index2 === -1)
        return {
          ...state,
          wishlist: [...state.wishlist, state.book]
        };
      return state;
    case DELETE_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.payload)
      };
    case GET_TOP10_FICTION:
      return { ...state, top10: action.payload };
    case GET_TOP10_CHILDREN:
      return { ...state, top10: action.payload };
    case GET_TOP10_ROMANCE:
      return { ...state, top10: action.payload };
    case GET_TOP10_COMICS:
      return { ...state, top10: action.payload };

    default:
      return state;
  }
}
