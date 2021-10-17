import React, { useContext, createContext, useReducer } from 'react'

const stateContext = createContext()
const { Provider } = stateContext

const reducer = (state, action) => {
  switch (action.type) {
    case 'set-cart-items':
      const toggled = {
        status: action.payload.status,
        currentArea: '',
        area: action.payload.area,
        hidden: action.payload.hidden,
      }
      return {
        ...state,
        cartItems: action.payload.cart,
        toggleChecked: toggled,
      }
    case 'add-item':
      console.log(`payload: `, action.payload)
      return { ...state, cartItems: action.payload }
    default:
      break
  }
}

const StateProvider = ({ value = false, ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    // state variable go here
    cartItems: [],
    toggleChecked: {
      status: false,
      currentArea: '',
      area: [],
      hidden: true,
    },
  })
  return <Provider value={[state, dispatch]} {...props} />
}
const useStateContext = () => {
  return useContext(stateContext)
}

export { StateProvider, useStateContext }
