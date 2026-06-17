import Image from "next/image";

const items = [
  {
    icon: "/images/banks.png",
    title: "Banks",
    mobileSize: "w-[40px]",
    desktopSize: "w-[60px]",
  },
  {
    icon: "/images/fintechs.png",
    title: "FinTechs",
    mobileSize: "w-[70px]",
    desktopSize: "w-[90px]",
  },
  {
    icon: "/images/msme.png",
    title: "MSMEs",
    mobileSize: "w-[60px]",
    desktopSize: "w-[90px]",
  },
  {
    icon: "/images/corporates.png",
    title: "Corporates",
    mobileSize: "w-[60px]",
    desktopSize: "w-[90px]",
  },
  {
    icon: "/images/enterprises.png",
    title: "Enterprises",
    mobileSize: "w-[60px]",
    desktopSize: "w-[90px]",
  },
  {
    icon: "/images/merchant-partners.png",
    title: "Merchant Partners",
    mobileSize: "w-[60px]",
    desktopSize: "w-[90px]",
  },
];

export default function TrustedBusinesses() {
  return (
    <section className="-mt-1 lg:-mt-15 px-4 lg:px-0 relative z-20" id="industries">
      <div
        className="
          max-w-[1600px]
          mx-auto

          lg:bg-white
          lg:rounded-[28px]
          lg:border
          lg:border-gray-100
          lg:shadow-sm

          p-0
          lg:py-1
          lg:px-3
        "
      >
        {/* MOBILE */}
        <div className="lg:hidden">
          <h3
            className="
              text-center
              font-bold
              text-[#0B2E83]
              text-[18px]
              leading-tight
              mb-6
            "
          >
            TRUSTED BY LEADING
            <br />
            BUSINESSES
          </h3>

          <div
            className="
              grid
              grid-cols-3
              gap-y-6
              gap-x-4
            "
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="
                  flex
                  items-center
                  justify-center
                "
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={200}
                  height={200}
                  className={`${item.mobileSize} h-auto object-contain`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden lg:grid lg:grid-cols-[260px_repeat(6,1fr)] items-center">
          <div className="pr-6">
            <h3
              className="
                font-bold
                text-[#0B2E83]
                text-[20px]
                leading-[1.15]
              "
            >
              TRUSTED BY LEADING
              <br />
              BUSINESSES
            </h3>
          </div>

          {items.map((item, index) => (
            <div
              key={index}
              className="
                flex
                items-center
                justify-center
                border-l
                border-gray-200
                px-6
                min-h-[90px]
              "
            >
              <Image
                src={item.icon}
                alt={item.title}
                width={200}
                height={200}
                className={`${item.desktopSize} h-auto object-contain`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}