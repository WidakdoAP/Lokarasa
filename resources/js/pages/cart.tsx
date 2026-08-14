import { router } from "@inertiajs/react";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Product } from "@/types";

interface CartItem {
    id: number;
    product_id: number;
    quantity: number;
    product: Product;
}

interface CartPageProps {
    cartItems: CartItem[];
}

export default function CartIndex({ cartItems }: CartPageProps) {
    const subtotal = cartItems.reduce(
        (total, item) =>
            total + Number(item.product.price) * item.quantity,
        0
    );

    const updateQuantity = (
        cartItem: CartItem,
        quantity: number
    ) => {
        if (quantity < 1) {
            return;
        }

        router.patch(`/cart/${cartItem.id}`, {
            quantity,
        });
    };

    const removeItem = (cartItem: CartItem) => {
        router.delete(`/cart/${cartItem.id}`);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Shopping Cart
                </h1>

                <p className="text-muted-foreground">
                    {cartItems.length}{" "}
                    {cartItems.length === 1
                        ? "product"
                        : "products"}{" "}
                    in your cart
                </p>
            </div>

            {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground" />

                    <h2 className="text-2xl font-semibold">
                        Your cart is empty
                    </h2>

                    <p className="mt-2 text-muted-foreground">
                        Add some products to your cart to get started.
                    </p>

                    <Button
                        className="mt-6"
                        onClick={() => router.visit("/")}
                    >
                        Continue Shopping
                    </Button>
                </div>
            ) : (
                <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
                    {/* Cart Items */}
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <Card key={item.id}>
                                <CardContent className="flex gap-4 p-4">
                                    {/* Product Image */}
                                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md bg-muted">
                                        {item.product.images?.length > 0 ? (
                                            <img
                                                src={`/storage/${item.product.images[0].image}`}
                                                alt={item.product.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center">
                                                <ShoppingBag className="text-muted-foreground" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Information */}
                                    <div className="flex flex-1 flex-col justify-between">
                                        <div>
                                            <h2 className="font-semibold">
                                                {item.product.name}
                                            </h2>

                                            <p className="text-sm text-muted-foreground">
                                                {formatPrice(
                                                    Number(
                                                        item.product.price
                                                    )
                                                )}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            {/* Quantity */}
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    className="h-8 w-8"
                                                    disabled={
                                                        item.quantity <= 1
                                                    }
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                >
                                                    <Minus />
                                                </Button>

                                                <span className="w-8 text-center">
                                                    {item.quantity}
                                                </span>

                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    className="h-8 w-8"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                >
                                                    <Plus />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Item Total */}
                                    <div className="flex flex-col justify-between">
                                        <p className="font-semibold text-xl">
                                            {formatPrice(
                                                Number(
                                                    item.product.price
                                                ) * item.quantity
                                            )}
                                        </p>
                                        {/* Remove */}
                                        <Button
                                            size="sm"
                                            className="bg-destructive text-destructive-foreground"
                                            onClick={() =>
                                                removeItem(item)
                                            }
                                        >
                                            <Trash2 />
                                            Remove
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <Card className="h-fit">
                        <CardHeader>
                            <CardTitle>
                                Order Summary
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Subtotal
                                </span>

                                <span>
                                    {formatPrice(subtotal)}
                                </span>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between text-lg font-bold">
                                    <span>
                                        Total
                                    </span>

                                    <span>
                                        {formatPrice(subtotal)}
                                    </span>
                                </div>
                            </div>

                            <Button
                                className="w-full"
                                size="lg"
                                onClick={() =>
                                    router.visit("/checkout")
                                }
                            >
                                Proceed to Checkout
                            </Button>

                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() =>
                                    router.visit("/")
                                }
                            >
                                Continue Shopping
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
