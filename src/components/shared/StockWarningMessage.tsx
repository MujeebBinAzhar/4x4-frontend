// react
import React, { useEffect, useState } from "react";
// application
import { IProduct } from "~/interfaces/product";
import StockManagementService from "~/services/stockManagementService";

interface Props {
  product: IProduct;
  className?: string;
}

function StockWarningMessage(props: Props) {
  const { product, className } = props;
  const [customMessage, setCustomMessage] = useState<string>("");
  const [stockStatus, setStockStatus] = useState<string>("in-stock");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateStockInfo = async () => {
      try {
        const service = StockManagementService.getInstance();
        const status = await service.getStockAvailability(
          product.stock.quantity
        );
        const message = await service.getCustomWarningMessage();

        setStockStatus(status);
        setCustomMessage(message);
      } catch (error) {
        console.error("Error updating stock info:", error);
        setStockStatus(product.stock.availability);
        setCustomMessage(
          "This item could be out of stock. If it is, we will contact you after your order is placed. Alternately, please contact us to check current stock levels."
        );
      } finally {
        setIsLoading(false);
      }
    };

    updateStockInfo();
  }, [product.stock.quantity, product.stock.availability]);

  if (isLoading) {
    return null;
  }

  const shouldShowWarning =
    stockStatus === "low-stock" ||
    stockStatus === "on-backorder" ||
    stockStatus === "out-of-stock";

  if (!shouldShowWarning) {
    return null;
  }

  return (
    <div className={`stock-warning-message ${className || ""}`}>
      <div className="stock-warning-message__icon">⚠️</div>
      <p className="stock-warning-message__text">{customMessage}</p>
    </div>
  );
}

export default StockWarningMessage;
