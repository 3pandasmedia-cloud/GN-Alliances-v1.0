import Image from "next/image";

export default function Founders() {
  return (
    <section className="-mt-50 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-10">
          <p className="text-[#F2A900] uppercase tracking-[4px] font-semibold">
            FOUNDERS
          </p>

          <h2 className="text-5xl font-bold mt-1">
            Meet The Visionaries
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Founder 1 */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">

            <div className="aspect-[4/3] bg-slate-100 relative">
              <Image
                src="/founders/gulnaz-kaur.jpg"
                alt="Gulnaz Kaur"
                fill
                className="object-cover"
              />
            </div>

            <div className="p-8">
              <h3 className="text-3xl font-bold text-[#0A2E8A]">
                Gulnaz Kaur
              </h3>

              <p className="text-[#F2A900] font-semibold mt-2">
                Co-Founder
              </p>

              <p className="mt-6 text-slate-600 leading-relaxed">
                Leads strategic partnerships,
                business development and
                loyalty ecosystem growth.
              </p>
            </div>

          </div>

          {/* Founder 2 */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">

            <div className="aspect-[4/3] bg-slate-100 relative">
              <Image
                src="/founders/niroshini-sainath.jpg"
                alt="Niroshini Sainath"
                fill
                className="object-cover"
              />
            </div>

            <div className="p-8">
              <h3 className="text-3xl font-bold text-[#0A2E8A]">
                Niroshini Sainath
              </h3>

              <p className="text-[#F2A900] font-semibold mt-2">
                Co-Founder
              </p>

              <p className="mt-6 text-slate-600 leading-relaxed">
                Drives operations,
                merchant engagement and
                execution excellence.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}