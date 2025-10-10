// react
import React, { useEffect, useState } from "react";
// third-party
import classNames from "classnames";
import { FormattedMessage } from "react-intl";
// application
import { IProduct } from "~/interfaces/product";
import StockManagementService from "~/services/stockManagementService";

interface Props extends React.HTMLAttributes<HTMLElement> {
  product: IProduct;
  showQuantity?: boolean;
  className?: string;
}

function StockBadge(props: Props) {
  const { product, showQuantity = false, className, ...rootProps } = props;
  const [stockStatus, setStockStatus] = useState<string>("in-stock");
  const [customMessage, setCustomMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateStockStatus = async () => {
      try {
        const service = StockManagementService.getInstance();
        const status = await service.getStockAvailability(
          product.stock.quantity
        );
        const message = await service.getCustomWarningMessage();

        setStockStatus(status);
        setCustomMessage(message);
      } catch (error) {
        console.error("Error updating stock status:", error);
        setStockStatus(product.stock.availability);
      } finally {
        setIsLoading(false);
      }
    };

    updateStockStatus();
  }, [product.stock.quantity, product.stock.availability]);

  if (isLoading) {
    return null;
  }

  const getBadgeClasses = () => {
    return classNames("stock-badge", `stock-badge--${stockStatus}`, className);
  };

  const getBadgeText = () => {
    switch (stockStatus) {
      case "in-stock":
        return (
          <FormattedMessage
            id="TEXT_STOCK_IN_STOCK"
            defaultMessage="In Stock"
          />
        );
      case "out-of-stock":
        return (
          <FormattedMessage
            id="TEXT_STOCK_OUT_OF_STOCK"
            defaultMessage="Out of Stock"
          />
        );
      case "on-backorder":
        return (
          <FormattedMessage
            id="TEXT_STOCK_ON_BACKORDER"
            defaultMessage="Backorder"
          />
        );
      case "high-stock":
        return (
          <FormattedMessage
            id="TEXT_STOCK_HIGH_STOCK"
            defaultMessage="High Stock"
          />
        );
      case "low-stock":
        return (
          <FormattedMessage
            id="TEXT_STOCK_LOW_STOCK"
            defaultMessage="Low Stock"
          />
        );
      default:
        return (
          <FormattedMessage
            id="TEXT_STOCK_IN_STOCK"
            defaultMessage="In Stock"
          />
        );
    }
  };

  const getBadgeColor = () => {
    switch (stockStatus) {
      case "in-stock":
      case "high-stock":
        return "#28a745"; // Green
      case "low-stock":
      case "on-backorder":
        return "#ffc107"; // Yellow/Orange
      case "out-of-stock":
        return "#dc3545"; // Red
      default:
        return "#6c757d"; // Gray
    }
  };

  const shouldShowWarning =
    stockStatus === "low-stock" ||
    stockStatus === "on-backorder" ||
    stockStatus === "out-of-stock";

  return (
    <div className={getBadgeClasses()} {...rootProps}>
      <div
        className="stock-badge__indicator"
        style={{ backgroundColor: getBadgeColor() }}
      />
      <span className="stock-badge__text">
        {getBadgeText()}
        {showQuantity && (
          <span className="stock-badge__quantity">
            {" "}
            ({product.stock.quantity})
          </span>
        )}
      </span>
      {shouldShowWarning && customMessage && (
        <div className="stock-badge__warning" title={customMessage}>
          <span className="stock-badge__warning-icon">⚠️</span>
        </div>
      )}
    </div>
  );
}

export default StockBadge;
