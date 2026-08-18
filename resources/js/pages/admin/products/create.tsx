import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CreateProduct() {
    const { data, setData, post, processing, errors } =
        useForm({
            name: "",
            description: "",
            category: "",
            price: "",
            images: [] as File[],
        });

    const submit = () => {
        post("/admin/products", {
            forceFormData: true,
        });
    };

    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <h1 className="text-3xl font-bold">
                Create Product
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
                        <p className="text-sm text-red-500">
                            {errors.name}
                        </p>
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
                            Images
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
                            {data.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(
                                        image
                                    )}
                                    className="h-24 w-full rounded-md object-cover"
                                />
                            ))}
                        </div>
                    </div>

                    <Button
                        disabled={processing}
                        onClick={submit}
                    >
                        Create Product
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}