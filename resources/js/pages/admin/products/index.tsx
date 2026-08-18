import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface ProductImage {
    id: number;
    image: string;
}

interface Product {
    id: number;
    name: string;
    price: string;
    category: string;
    images: ProductImage[];
}

interface PaginatedProducts {
    data: Product[];
}

interface Props {
    products: PaginatedProducts;
}

export default function ProductsIndex({
    products,
}: Props) {
    const deleteProduct = (id: number) => {
        if (!confirm("Delete this product?")) {
            return;
        }

        router.delete(
            `/admin/products/${id}`
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        Products
                    </h1>

                    <p className="text-muted-foreground">
                        Manage your products.
                    </p>
                </div>

                <Button asChild>
                    <Link href="/admin/products/create">
                        Add Product
                    </Link>
                </Button>
            </div>

            <div className="grid gap-4">
                {products.data.map((product) => (
                    <Card key={product.id}>
                        <CardHeader>
                            <CardTitle>
                                {product.name}
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p>
                                        {product.category}
                                    </p>

                                    <p className="font-bold">
                                        Rp{" "}
                                        {Number(
                                            product.price
                                        ).toLocaleString(
                                            "id-ID"
                                        )}
                                    </p>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        asChild
                                    >
                                        <Link
                                            href={`/admin/products/${product.id}/edit`}
                                        >
                                            Edit
                                        </Link>
                                    </Button>

                                    <Button
                                        variant="destructive"
                                        onClick={() =>
                                            deleteProduct(
                                                product.id
                                            )
                                        }
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}