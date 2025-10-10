import axiosInstance from "~/api/api-handler";

export interface IStockManagementSettings {
  low_stock_threshold: number;
  high_stock_threshold: number;
  enable_backorder: boolean;
  custom_warning_message: string;
  show_stock_warnings_checkout: boolean;
}

export interface IStockManagementResponse {
  data: Array<{
    name: string;
    setting: IStockManagementSettings;
  }>;
}

class StockManagementService {
  private static instance: StockManagementService;
  private settings: IStockManagementSettings | null = null;
  private settingsPromise: Promise<IStockManagementSettings> | null = null;

  public static getInstance(): StockManagementService {
    if (!StockManagementService.instance) {
      StockManagementService.instance = new StockManagementService();
    }
    return StockManagementService.instance;
  }

  public async getStockManagementSettings(): Promise<IStockManagementSettings> {
    if (this.settings) {
      return this.settings;
    }

    if (this.settingsPromise) {
      return this.settingsPromise;
    }

    this.settingsPromise = this.fetchSettings();
    this.settings = await this.settingsPromise;
    this.settingsPromise = null; // Clear the promise after it resolves
    return this.settings;
  }

  public clearCache(): void {
    this.settings = null;
    this.settingsPromise = null;
  }

  private async fetchSettings(): Promise<IStockManagementSettings> {
    try {
      const response = await axiosInstance.get<IStockManagementResponse>(
        "/setting/stock-management/all"
      );

      if (response.data.data && response.data.data.length > 0) {
        return response.data.data[0].setting;
      }

      // Return default settings if none found
      return {
        low_stock_threshold: 20,
        high_stock_threshold: 40,
        enable_backorder: false,
        custom_warning_message:
          "This item could be out of stock. Product Quantity is either 0 or below 0. If it is, we will contact you after your order is placed. Alternately, please contact us to check current stock levels.",
        show_stock_warnings_checkout: true,
      };
    } catch (error) {
      console.error("Failed to fetch stock management settings:", error);

      // Return default settings on error
      return {
        low_stock_threshold: 20,
        high_stock_threshold: 40,
        enable_backorder: false,
        custom_warning_message:
          "This item could be out of stock. Product Quantity is either 0 or below 0. If it is, we will contact you after your order is placed. Alternately, please contact us to check current stock levels.",
        show_stock_warnings_checkout: true,
      };
    }
  }

  public async getStockAvailability(stock: number): Promise<string> {
    const settings = await this.getStockManagementSettings();

    // Handle backorder (negative stock)
    if (stock < 0 && settings.enable_backorder) {
      return "on-backorder";
    }

    // Handle out of stock
    if (stock <= 0) {
      return "out-of-stock";
    }

    // Handle low stock
    if (stock <= settings.low_stock_threshold) {
      return "low-stock";
    }

    // Handle high stock
    if (stock >= settings.high_stock_threshold) {
      return "high-stock";
    }

    // Default to in-stock
    return "in-stock";
  }

  public async getCustomWarningMessage(): Promise<string> {
    const settings = await this.getStockManagementSettings();
    return settings.custom_warning_message;
  }

  public async shouldShowCheckoutWarnings(): Promise<boolean> {
    const settings = await this.getStockManagementSettings();
    return settings.show_stock_warnings_checkout;
  }
}

export default StockManagementService;
