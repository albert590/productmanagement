from pathlib import Path
base = Path(r"c:\Users\ALBERT\weekly-product-management")
files = {
    "context/CartContext.tsx": """"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from \"react\";

import { Product } from \"@/types/product\";

const CART_STORAGE_KEY = \"weekly-product-management-cart\";

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

function loadCartFromStorage(): Product[] {
  if (typeof window === \"undefined\") return [];
  try {
    const item = window.localStorage.getItem(CART_STORAGE_KEY);
    return item ? (JSON.parse(item) as Product[]) : [];
  } catch {
    return [];
  }
}

function saveCartToStorage(cart: Product[]) {
  if (typeof window === \"undefined\") return;
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // ignore write errors
  }
}

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<Product[]>(() => loadCartFromStorage());

  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  function addToCart(product: Product) {
    setCart((previousCart) => [...previousCart, product]);
  }

  function removeFromCart(id: number) {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== id)
    );
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      \"useCart must be used within CartProvider\"
    );
  }

  return context;
}
""",
    "context/ProductContext.tsx": """"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from \"react\";

import { Product } from \"@/types/product\";

import {
  getProducts,
  addProduct,
  editProduct as updateProduct,
  deleteProduct,
} from \"@/services/productService\";

const PRODUCTS_STORAGE_KEY = \"weekly-product-management-products\";

interface ProductContextType {
  products: Product[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
  createProduct: (product: Omit<Product, \"id\">) => Promise<void>;
  editProduct: (id: number, product: Partial<Product>) => Promise<void>;
  removeProduct: (id: number) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

function loadProductsFromStorage(): Product[] | null {
  if (typeof window === \"undefined\") return null;
  try {
    const item = window.localStorage.getItem(PRODUCTS_STORAGE_KEY);
    return item ? (JSON.parse(item) as Product[]) : null;
  } catch {
    return null;
  }
}

function saveProductsToStorage(products: Product[]) {
  if (typeof window === \"undefined\") return;
  try {
    window.localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  } catch {
    // ignore write failures
  }
}

export function ProductProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchProducts() {
    try {
      setLoading(true);
      const savedProducts = loadProductsFromStorage();
      if (savedProducts) {
        setProducts(savedProducts);
      } else {
        const data = await getProducts();
        setProducts(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function createProduct(product: Omit<Product, \"id\">) {
    const newProduct = await addProduct(product);
    setProducts((prev) => {
      const nextProducts = [...prev, newProduct];
      saveProductsToStorage(nextProducts);
      return nextProducts;
    });
  }

  async function editProduct(id: number, product: Partial<Product>) {
    const updated = await updateProduct(id, product);
    setProducts((prev) => {
      const nextProducts = prev.map((item) =>
        item.id === id ? updated : item
      );
      saveProductsToStorage(nextProducts);
      return nextProducts;
    });
  }

  async function removeProduct(id: number) {
    await deleteProduct(id);
    setProducts((prev) => {
      const nextProducts = prev.filter((item) => item.id !== id);
      saveProductsToStorage(nextProducts);
      return nextProducts;
    });
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        fetchProducts,
        createProduct,
        editProduct,
        removeProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error(
      \"useProducts must be used within ProductProvider\"
    );
  }

  return context;
}
""",
    "app/products/[id]/page.tsx": """"use client";

import { useParams } from \"next/navigation\";
import { useProducts } from \"@/context/ProductContext\";
import { useCart } from \"@/context/CartContext\";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <main>
      <h1>Product Details</h1>

      <div
        style={{
          padding: \"20px\",
          border: \"1px solid #ddd\",
          width: \"400px\",
        }}
      >
        {product.thumbnail && (
          <img
            src={product.thumbnail}
            alt={product.title}
            width=\"200\"
          />
        )}

        <h2>{product.title}</h2>

        <p>Category: {product.category}</p>

        <p>Price: ${product.price}</p>

        <p>Stock: {product.stock}</p>

        <p>{product.description}</p>

        <button
          onClick={() => addToCart(product)}
          style={{
            marginTop: \"20px\",
            padding: \"10px 16px\",
            background: \"#2563eb\",
            color: \"white\",
            border: \"none\",
            borderRadius: \"8px\",
            cursor: \"pointer\",
          }}
        >
          Add to Cart
        </button>
      </div>
    </main>
  );
}
"""
}

for relative, content in files.items():
    path = base / relative
    path.write_text(content, encoding='utf-8')
print('updated files')
