import { useMemo, useState } from "react"
import { TabsContentContext } from './contextTab'
import { App, message } from "antd";

const TabsProvider = ({ children }) => {
  const [items, setItems] = useState([{
    key: 1,
    product: [],
    user: {}
  }])

  const { message } = App.useApp()

  const handleAddItems = () => {
    setItems(pre => [...pre, { key: pre.length + 1, product: [], user: {} }])
  }

  const handleRemoveItem = (key) => {
    setItems(pre => pre.filter(item => item.key !== key))
  }

  const handleAddProduct = (key, product) => {
    setItems((prevItems) => {
      const itemIndex = prevItems.findIndex(item => item.key === key);
      const productExists = itemIndex !== -1 && prevItems[itemIndex].product.some(p => p.id === product.id);

      if (productExists) {
        message.open({
          type: "error",
          content: "Sản phẩm này đã được thêm.",
        });
        return prevItems;
      } else {
        return prevItems.map(item =>
          item.key === key
            ? {
              ...item,
              product: [...item.product, { ...product, quantityPr: 1, totalPrice: product.price }]
            }
            : item
        );
      }
    });
  };

  const handleAddQuantities = (key, product, quantity) => {
    setItems(pre => pre.map(item => item.key === key ? { ...item, product: item.product.map(p => p.id === product.id ? { ...p, quantityPr: quantity } : p) } : item))
  }
  const handleSetTotalPrice = (key, product, totalPrice) => {
    setItems(pre => pre.map(item => item.key === key ? { ...item, product: item.product.map(p => p.id === product.id ? { ...p, totalPrice: totalPrice } : p) } : item))
  }
  const handleAddUser = (key, user) => {
    setItems(pre => pre.map(item => item.key === key ? { ...item, user } : item))
  }

  const handleRemoveProduct = (key, id) => {
    setItems(pre => pre.map(item => item.key === key ? { ...item, product: item.product.filter(p => p.keyPr !== id) } : item))
  }

  const value = useMemo(() => ({
    items,
    handleAddItems,
    handleRemoveItem,
    handleAddProduct,
    handleRemoveProduct,
    handleAddUser,
    handleAddQuantities,
    handleSetTotalPrice
  }), [items])

  return <TabsContentContext.Provider value={value}>{children}</TabsContentContext.Provider>
}

export default TabsProvider