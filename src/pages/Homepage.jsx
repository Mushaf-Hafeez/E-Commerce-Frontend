import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden flex items-center px-8 md:px-24 bg-zinc-50 text-zinc-900 dark:bg-black dark:text-white font-sans">
      {/* Radial Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,#e4e4e7_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_50%,#27272a_0%,transparent_50%)] opacity-50"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-xl">
        <p className="text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.3em] text-xs font-bold mb-4">
          Darmoshark
        </p>

        <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-8">
          M3 4K Wireless Gaming Mouse
        </h1>

        <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-10 max-w-sm">
          A Series Of Tools Designed And Engineered To Empower Creators, Makers,
          And Coders To Master What They Make.
        </p>

        {/* Pricing & CTA Section */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 text-zinc-400 text-sm">
            <div className="flex text-yellow-500">★★★★★</div>
            <span>50+ Reviews</span>
          </div>

          <div className="flex items-center gap-8">
            <Link
              to={"/products"}
              className="bg-zinc-900 text-white dark:bg-zinc-80 px-8 py-3 rounded-full text-sm font-semibold border border-transparent dark:border-zinc-700 shadow-xl dark:shadow-none hover:bg-zinc-800 dark:hover:bg-zinc-700 cursor-pointer"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Background "MX" Large Text */}
        <div className="absolute -bottom-20 -left-10 text-[20rem] font-black text-zinc-200/50 dark:text-zinc-900/30 select-none -z-10 pointer-events-none">
          M3
        </div>
      </div>

      {/* Product Image with Gray Saturation Adjustment */}
      <div className="h-full absolute right-0 top-1/2 -translate-y-1/2 w-1/2 lg:block hidden">
        <img
          src="hero-img.png"
          alt="Logitech MX Master 3S"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 brightness-90 grayscale-100 contrast-150 drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
        />
      </div>
    </section>
  );
};

export default Homepage;
