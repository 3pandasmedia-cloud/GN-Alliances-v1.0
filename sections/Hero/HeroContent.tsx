type HeroContentProps = {
  onRequestDemo: () => void;
};

export default function HeroContent({
  onRequestDemo,
}: HeroContentProps) {
  const features = [
    {
      icon: "/images/merchant-partners.png",
      title: "Merchant Network",
      width: "w-[100px]",
    },
    {
      icon: "/images/campaign-management.png",
      title: "Campaign Management",
      width: "w-[100px]",
    },
    {
      icon: "/images/analytics.png",
      title: "Analytics",
      width: "w-[90px]",
    },
    {
      icon: "/images/payouts.png",
      title: "Payouts",
      width: "w-[120px]",
    },
  ];

  const heroOffset = "lg:ml-0"; // change here

  return (
    <div
      className={`
    space-y-5
    mt-0
    lg:-mt-10
    xl:mt-30
    text-center
    lg:text-left
    ${heroOffset}
  `}
    >

      <div className="block lg:hidden -mt-10 md:mt-6 mb-8">
        <img
          src="/images/hero-ecosystem.png"
          alt="GN Ecosystem"
          className="w-full max-w-[300px] mx-auto"
        />
      </div>


      {/* Heading */}

      <h1 className="leading-[1] tracking-[-1px]">

        <span
          className="
            block
            text-[50px]
sm:text-[48px]
md:text-[52px]
xl:text-[82px]
            font-bold
            text-[#0B2E83]
          "
        >
          Partnerships
        </span>

        <span
          className="
            block
            text-[40px]
sm:text-[40px]
md:text-[50px]
xl:text-[72px]
            font-bold
            text-black
          "
        >
          That{" "}

          <span
            className="
              bg-[linear-gradient(90deg,#B97700_0%,#F2A900_25%,#FFD56A_50%,#F2A900_75%,#B97700_100%)]
              bg-clip-text
              text-transparent
            "
          >
            Drive Loyalty
          </span>

        </span>

      </h1>

      {/* Yellow Line */}

      <div
        className="
    w-20
    h-[3px]
    bg-[#E3A008]
    rounded-full
    mx-auto
    lg:mx-0
  "
      />

      {/* Description */}

      <p
        className="
          max-w-[650px]
mx-auto
xl:mx-0
          text-[16px]
md:text-[18px]
xl:text-[22px]
          leading-[1.7]
          px-2
          text-[#374151]
          font-medium
        "
      >
        GN Alliances helps Banks, FinTechs, MSMEs and Enterprises
        launch merchant-funded offers, rewards programs and
        engagement campaigns.
      </p>

      {/* Buttons */}

      <div
        className="
    flex
    flex-col
    sm:flex-row
    gap-4
    justify-center
    items-center
    xl:justify-start
    xl:items-start
    w-full
  "
      >

        <button
          onClick={onRequestDemo}
          className="
      w-full
      sm:w-auto
      lg:w-auto

      max-w-[380px]

      bg-[#0B2E83]
      text-white

      py-4
      px-10
      lg:px-12
      lg:py-5

      rounded-xl

      text-lg
      lg:text-xl

      font-semibold

      hover:bg-[#082468]
      transition
    "
        >
          Request Demo
        </button>

        <button
          className="
      w-full
      sm:w-auto
      lg:w-auto

      max-w-[380px]

      bg-[#F2A900]
      text-white

      py-4
      px-10
      lg:px-12
      lg:py-5

      rounded-xl

      text-lg
      lg:text-xl

      font-semibold

      hover:bg-[#D99800]
      transition
    "
        >
          Partner With Us
        </button>

      </div>

      {/* Desktop */}

      <div
        className="
    hidden
    lg:flex
    items-center
    justify-start
    mt-10
    xl:mt-12
  "
      >
        {features.map((item, index) => (
          <div
            key={index}
            className="
        flex
        items-center
        justify-center
      "
          >
            <div
              className="
          w-[140px]
md:w-[120px]
xl:w-[160px]
          flex
          justify-center
          items-center
        "
            >
              <img
                src={item.icon}
                alt={item.title}
                className={`${item.width} h-auto object-contain`}
              />
            </div>

            {index < features.length - 1 && (
              <div className="h-24 w-px bg-gray-300" />
            )}
          </div>
        ))}
      </div>

    </div>
  );
}