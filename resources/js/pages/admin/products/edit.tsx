import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Image {
    id: number;
    image: string;
}

interface Product {
    id: number;
    name: string;
    description: string;
    category: string;
    price: string;
    images: Image[];
}

export default function EditProduct({
    product,
}: {
    product: Product;
}) {
    const { data, setData, post, processing } =
        useForm({
            name: product.name,
            description: product.description,
            category: product.category,
            price: product.price,
            images: [] as File[],
        });

    const submit = () => {
        post(`/admin/products/${product.id}`, {
            forceFormData: true,
            method: "put",
        });
    };

    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <h1 className="text-3xl font-bold">
                Edit Product
            </h1>

            <Card>
                <CardContent className="space-y-5 pt-6">
                    <div>
                        <Label>
                            Product Name
                        </Label>
                        <Input
                            value={data.name}
                            onChange={(e) =>
                                setData("name", e.target.value)
                            }
                        />
                    </div>

                    <div>
                        <Label>
                            Description
                        </Label>
                        <Textarea
                            value={data.description}
                            onChange={(e) =>
                                setData(
                                    "description",
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div>
                        <Label>
                            Category
                        </Label>
                        <Input
                            value={data.category}
                            onChange={(e) =>
                                setData(
                                    "category",
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div>
                        <Label>
                            Price
                        </Label>
                        <Input
                            type="number"
                            value={data.price}
                            onChange={(e) =>
                                setData(
                                    "price",
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div>
                        <Label>
                            Current Images
                        </Label>

                        <div className="mt-2 grid grid-cols-3 gap-3">
                            {product.images.map((img) => (
                                <img
                                    key={img.id}
                                    src={`/storage/${img.image}`}
                                    className="h-24 w-full rounded-md object-cover"
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <Label>
                            Add More Images
                        </Label>

                        <Input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) =>
                                setData(
                                    "images",
                                    Array.from(
                                        e.target.files ?? []
                                    )
                                )
                            }
                        />

                        <div className="mt-4 grid grid-cols-3 gap-3">
                            {data.images.map((img, i) => (
                                <img
                                    key={i}
                                    src={URL.createObjectURL(
                                        img
                                    )}
                                    className="h-24 rounded-md object-cover"
                                />
                            ))}
                        </div>
                    </div>

                    <Button
                        disabled={processing}
                        onClick={submit}
                    >
                        Save Changes
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}