import { useEffect, useState } from "react";

const useLcdFilter = (products, selectedLcd) => {
  const [LCD, setLCD] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (products) {
      const lcdSet = new Set();
      products.forEach((product) => {
        if (product.lcd && product.lcd.size) {
          lcdSet.add(product.lcd.size);
        }
      });
      setLCD(Array.from(lcdSet));
    }
  }, [products]);

  useEffect(() => {
    if (selectedLcd.length === 0) {
      setFilteredProducts(products); 
    } else {
      const selectedLcdTitles = selectedLcd
        .map((index) => LCD[index])
        .filter(Boolean);
      const newFilteredProducts = products.filter(
        (product) => product.lcd && selectedLcdTitles.includes(product.lcd.size)
      );
      setFilteredProducts(newFilteredProducts);
    }
  }, [selectedLcd, LCD, products]);

  return { LCD, filteredProducts };
};

export default useLcdFilter;
