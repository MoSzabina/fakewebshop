import { Link } from '@inertiajs/react';

export function Footer() {
    return (
        <footer className="border-t border-[#DDD8D0] bg-[#EDE8DF]">
            <div className="mx-auto w-full max-w-[1040px] px-8 pt-8">

                <div className="grid grid-cols-2 gap-8 text-sm">
                    {/* Left */}
                    <div className="flex flex-col gap-1">
                        <span className="mb-1 font-medium text-[#1C1917]">
                            Kapcsolat
                        </span>

                        <a
                            href="mailto:email@example.com"
                            className="text-[#6B6460] transition-colors hover:text-[#1C1917]"
                        >
                            email@example.com
                        </a>

                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#6B6460] transition-colors hover:text-[#1C1917]"
                        >
                            LinkedIn
                        </a>
                    </div>

                    {/* Right */}
                    <div className="flex justify-end">
                        <Link
                            href="/privacy"
                            className="text-[#6B6460] transition-colors hover:text-[#1C1917]"
                        >
                            Adatvédelem
                        </Link>
                    </div>
                </div>

                <span className="my-8 block h-px bg-[#DDD8D0]" />

                <div className="flex justify-end text-xs text-[#6B6460]">
                    © 2026 kamuwebshop — valami vicces szöveg majd ide kerül.
                </div>

            </div>
        </footer>
    );
}
