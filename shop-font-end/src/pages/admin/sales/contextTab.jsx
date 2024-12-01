import React, { useContext } from "react";

export const TabsContentContext = React.createContext({
 items: [
 ],
 handleAddItems: () => {},
 handleRemoveItem: () => {},
 handleAddUser: () => {},
 handleAddProduct: () => {},
 handleRemoveProduct: () => {},
 handleAddQuantities: () => {},
 handleSetTotalPrice: () => {}
})

export const useTabsContext = () => useContext(TabsContentContext)