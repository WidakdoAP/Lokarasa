import { Link } from "@inertiajs/react";
import {
    Mail,
    MapPin,
    Phone,
} from "lucide-react";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

export default function FooterLayout() {
    return (
        <footer className="border-t bg-muted/40">
            <div className="container mx-auto px-4 py-12">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link
                            href="/"
                            className="text-xl font-bold tracking-tight"
                        >
                            Lokarasa
                        </Link>

                        <p className="max-w-xs text-sm text-muted-foreground">
                            Temukan berbagai produk lokal terbaik dengan mudah
                            dan nikmati pengalaman berbelanja yang nyaman.
                        </p>

                        <div className="flex gap-3">
                            <a
                                href="#"
                                aria-label="Facebook"
                                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                            >
                                <FaFacebook className="h-5 w-5" />
                            </a>

                            <a
                                href="#"
                                aria-label="Instagram"
                                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                            >
                                <FaInstagram className="h-5 w-5" />
                            </a>

                            <a
                                href="#"
                                aria-label="Twitter"
                                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                            >
                                <FaTwitter className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="mb-4 font-semibold">Navigasi</h3>

                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>
                                <Link
                                    href="/"
                                    className="transition-colors hover:text-foreground"
                                >
                                    Beranda
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/products"
                                    className="transition-colors hover:text-foreground"
                                >
                                    Produk
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/categories"
                                    className="transition-colors hover:text-foreground"
                                >
                                    Kategori
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/about"
                                    className="transition-colors hover:text-foreground"
                                >
                                    Tentang Kami
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="mb-4 font-semibold">Bantuan</h3>

                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>
                                <Link
                                    href="/contact"
                                    className="transition-colors hover:text-foreground"
                                >
                                    Hubungi Kami
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/faq"
                                    className="transition-colors hover:text-foreground"
                                >
                                    FAQ
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/shipping"
                                    className="transition-colors hover:text-foreground"
                                >
                                    Informasi Pengiriman
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/terms"
                                    className="transition-colors hover:text-foreground"
                                >
                                    Syarat & Ketentuan
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/privacy"
                                    className="transition-colors hover:text-foreground"
                                >
                                    Kebijakan Privasi
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="mb-4 font-semibold">Kontak</h3>

                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li className="flex gap-3">
                                <MapPin className="mt-0.5 h-5 w-5 shrink-0" />

                                <span>
                                    Indonesia
                                </span>
                            </li>

                            <li className="flex gap-3">
                                <Phone className="h-5 w-5 shrink-0" />

                                <span>
                                    +62 812-3456-7890
                                </span>
                            </li>

                            <li className="flex gap-3">
                                <Mail className="h-5 w-5 shrink-0" />

                                <span>
                                    support@lokarasa.com
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 flex flex-col gap-4 border-t pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
                    <p>
                        © {new Date().getFullYear()} Lokarasa. All rights
                        reserved.
                    </p>

                    <p>
                        Made with Love.
                    </p>
                </div>
            </div>
        </footer>
    );
}
