import React, { useContext, createContext, useReducer } from 'react'

const stateContext = createContext()
const { Provider } = stateContext

const reducer = (state, action) => {
  switch (action.type) {
    case 'set-cart-items':
      return { ...state, cartItems: action.payload }
    case 'add-item':
      return { ...state, cartItems: state.cartItems.concat(action.payload) }
    default:
      break
  }
}

const StateProvider = ({ value = false, ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    // state variable go here
    cartItems: [],
  })
  return <Provider value={[state, dispatch]} {...props} />
}
const useStateContext = () => {
  return useContext(stateContext)
}

export { StateProvider, useStateContext }
