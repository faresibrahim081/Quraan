import Banner from "./Banner";

function Layout() {
  return (
    <section
      style={{ backgroundImage: `url(/images/bg-quran.jpg)` }}
      className={`flex flex-col bg-cover bg-center bg-no-repeat`}
    >
      <div className=" mx-auto pt-[8rem] pb-[3rem] text-center">
        <div className="max-w-xl mx-auto backdrop-blur-md p-4 rounded-lg">
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
            {" "}
            القران الكريم{" "}
          </h1>

          <p className="mt-4 max-w-lg text-white sm:text-lg/relaxed">
            لا تنسونا من صالح دعائكم جزانا الله و اياكم خيرا
          </p>
        </div>
      </div>
      <Banner />
    </section>
  );
}

export default Layout;
