import Image from "next/image";

export default function EcosystemAnimation() {
  return (
    <div
      className="
        relative
        w-full
        max-w-[800px]
        aspect-square
        mx-auto
        -mt-6
        lg:-mt-20
        overflow-hidden
      "
    >
      {/* Rotating Circles */}

      <div className="absolute inset-0 orbit-bg">
        <Image
          src="/images/ecosystem/circlesss.png"
          alt=""
          fill
          className="object-contain"
          sizes="(max-width:768px) 100vw, 800px"
        />
      </div>

      {/* Ecosystem */}

      <div
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          z-20
        "
      >
        <Image
          src="/images/ecosystem/gn-ecosystem.png"
          alt="GN Ecosystem"
          width={760}
          height={760}
          className="
            w-full
            h-auto
            object-contain
          "
        />
      </div>
    </div>
  );
}