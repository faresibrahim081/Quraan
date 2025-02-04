import Banner from "./Banner";

function Layout() {
  return (
    <section
      style={{ backgroundImage: `url(/images/bg-quran.jpg)` }}
      className={`relative bg-cover bg-center bg-no-repeat`}
    >
      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-[70vh] tems-center lg:px-8">
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
            {" "}
            القران الكريم{" "}
          </h1>

          <p className="mt-4 max-w-lg text-white sm:text-xl/relaxed">
            لا تنسونا من صالح دعائكم والله يجزاكم خير
          </p>
        </div>
      </div>
      <Banner />
    </section>
  );
}

export default Layout;
