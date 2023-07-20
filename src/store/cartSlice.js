import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    // items: [],
    // totalQuantity: 0,
    // totalPrice: 0,
    // changed: false, //was any change made in cart
    items: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")).items
      : [],
    totalQuantity: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")).totalQuantity
      : 0,
    totalPrice: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")).totalPrice
      : 0,
    changed: false, //was any change made in cart
  },
  reducers: {
    addToCart(state, action) {
      state.changed = true;
      const newItem = action.payload.pdata; //the product object
      const incrementQuantity = action.payload.quantity;

      //check if item is already available in list.
      const existingItem = state.items.find(
        (item) => item.product.id === newItem.id
      );
      //if there then increse quantity
      if (existingItem) {
        existingItem.quantity += incrementQuantity;
        existingItem.totalPrice += newItem.price * incrementQuantity;
        state.totalQuantity += incrementQuantity;
        state.totalPrice += newItem.price * incrementQuantity;
      } else {
        state.items.push({
          //you decide the strcute of cart
          product: newItem,
          quantity: incrementQuantity,
          totalPrice: newItem.price * incrementQuantity,
        });
        state.totalQuantity += incrementQuantity; //no of diffrent item present. not total items.
        state.totalPrice += newItem.price * incrementQuantity;
        // console.log(state.totalPrice, state.totalQuantity);
      }
      localStorage.setItem("cart", JSON.stringify(state)); //needed. to allow synchronisation to other tabs.
      // console.log(localStorage);  //debug
    },
    setShow(state) {
      state.showCart = !state.showCart; //toggle
    },

    removeFromCart(state, action) {
      state.changed = true;
      const id = action.payload; // payload will be only id
      const existingItem = state.items.find((item) => item.product.id === id);

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.product.id !== id);
        state.totalQuantity--;
        state.totalPrice -= existingItem.product.price;
      } else {
        existingItem.quantity--; //structure me samay do
        existingItem.totalPrice -= existingItem.product.price;
        state.totalQuantity--;
        state.totalPrice -= existingItem.product.price;
      }
      localStorage.setItem("cart", JSON.stringify(state)); //synchro
    },
    replaceData(state, action) {
      //will be used when fetching from server
      //   state.totalQuantity = action.payload.totalPrice;
      //   state.items = action.payload.itemsList;
      state.items = action.payload.items;
      state.totalPrice = action.payload.totalPrice;
      state.totalQuantity = action.payload.totalQuantity;

      localStorage.setItem("cart", JSON.stringify(state)); //synchro
    },
  },
});

export const cartActions = cartSlice.actions; //we didn't destructured inorder to avoid confusion in dispatching

export default cartSlice;

// action(a keyword) not actions(will give error and sate wont be updated)
//payload is the argument, not the like prop. prop encolse args inside of object

// Any time toJSON is called on the Model you create from this Schema, it will include an 'id' field that matches the _id field Mongo generates.
// As of Mongoose v4.0 part of this functionality is supported out of the box.
