interface IProductDetail {
  name: string;
  unit: string;
  imageUrl: string;
  unitPrice: number;
  brandName: string;
  eanNumber: string;
  productCode: string;
  stockQuantity: number;
  articleNumber: string;
  minOrderQuantity: number;
}

interface IProductSearchResult {
  name: string;
  url: string;
  position: number;
}

enum Platforms {
  REXEL = "rexel",
  GRANZOW = "granzow",
}

interface IProductScraper {
  login(): Promise<void>;
  searchProducts(query: string): Promise<IProductSearchResult[]>;
  getProductDetails(url: string): Promise<IProductDetail>;
}

class RexelProductScraper implements IProductScraper {
  login(): Promise<void> {
    return Promise.resolve();
  }
  searchProducts(query: string): Promise<IProductSearchResult[]> {
    return Promise.resolve([
      {
        name: "SIEMENS ET200SP",
        url: "https://www.rexel.com/product/siemens-et200s",
        position: 1,
      },
    ]);
  }
  getProductDetails(url: string): Promise<IProductDetail> {
    return Promise.resolve({
      name: "SIEMENS ET200SP",
      unit: "PCS",
      imageUrl: "https://www.rexel.com/product/siemens-et200s",
      unitPrice: 100,
      brandName: "SIEMENS",
      eanNumber: "1234567890",
      productCode: "1234567890",
      stockQuantity: 100,
      articleNumber: "1234567890",
      minOrderQuantity: 1,
    });
  }
}

class GranzowProductScraper implements IProductScraper {
  login(): Promise<void> {
    return Promise.resolve();
  }
  searchProducts(query: string): Promise<IProductSearchResult[]> {
    return Promise.resolve([
      {
        name: "SIEMENS ET200SP",
        url: "https://www.granzow.com/product/siemens-et200s",
        position: 1,
      },
    ]);
  }
  getProductDetails(url: string): Promise<IProductDetail> {
    return Promise.resolve({
      name: "SIEMENS ET200SP",
      unit: "PCS",
      imageUrl: "https://www.granzow.com/product/siemens-et200s",
      unitPrice: 100,
      brandName: "SIEMENS",
      eanNumber: "1234567890",
      productCode: "1234567890",
      stockQuantity: 100,
      articleNumber: "1234567890",
      minOrderQuantity: 1,
    });
  }
}

class ProductScraperFactory {
  static createProductScraper(platform: Platforms): IProductScraper {
    switch (platform) {
      case Platforms.REXEL:
        return new RexelProductScraper();
      case Platforms.GRANZOW:
        return new GranzowProductScraper();
      default:
        throw new Error(`Platform ${platform} not supported`);
    }
  }
}

async function main() {
  const rexelProductScraper = ProductScraperFactory.createProductScraper(
    Platforms.REXEL,
  );
  const granzowProductScraper = ProductScraperFactory.createProductScraper(
    Platforms.GRANZOW,
  );

  const rexelProducts =
    await rexelProductScraper.searchProducts("SIEMENS ET200SP");
  console.log(rexelProducts);
  const granzowProducts =
    await granzowProductScraper.searchProducts("SIEMENS ET200SP");
  console.log(granzowProducts);
}

main();
