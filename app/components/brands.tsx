import Image from "next/image";

export const Brands = () => {
    return (
        <section className="w-full py-12 px-6 md:px-16 lg:container lg:mx-auto">
            <ul className="flex flex-col items-center justify-center gap-9 md:justify-evenly md:flex-row md:flex-wrap">
                <li>
                    <Image
                        src="/images/google.svg"
                        alt="Google"
                        height={35}
                        width={110}
                        className="object-contain"
                    />
                </li>
                <li>
                    <Image
                        src="/images/oscar.svg"
                        alt="Oscar"
                        height={35}
                        width={112}
                        className="object-contain"
                    />
                </li>
                <li>
                    <Image
                        src="/images/stripe.svg"
                        alt="Stripe"
                        height={35}
                        width={83}
                        className="object-contain"
                    />
                </li>
                <li>
                    <Image
                        src="/images/reputation.svg"
                        alt="Reputation"
                        height={35}
                        width={190}
                        className="object-contain"
                    />
                </li>
                <li>
                    <Image
                        src="/images/ironclad.svg"
                        alt="Ironclad"
                        height={35}
                        width={185}
                        className="object-contain"
                    />
                </li>
            </ul>
        </section>
    );
};
