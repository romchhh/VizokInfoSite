import React, { useRef, useEffect } from "react";

function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;

      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 3
      ) {
        const nextSection = container.parentElement.nextElementSibling;
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <section className="hero z-0">
      <div
        ref={containerRef}
        className="container h-full relative overflow-y-auto"
      >
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-full">
          <h1 className="xl:text-3xl md:text-2xl text-xl text-white font-bold uppercase bg-black/45 xl:px-16 xl:py-6 sm:px-10 px-4 py-3 rounded-2xl text-center">
            Сервіс спільних поїздок Vizok 🚗
            <br />
            <span className="xl:text-lg lg:text-md text-xs">
              Шукайте водіїв чи пасажирів,<br /> організовуйте поїздки,<br /> економте час і гроші!
            </span>
          </h1>
        </div>

        <div className="absolute top-[50%] left-1/2 transform -translate-x-1/2 w-full px-4">
          <div className="flex flex-wrap justify-center gap-6 flex-col sm:flex-row mb-6 sm:mb-0">
            <Card
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 16v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M12 11V3M12 3l7 7-7 7" />
                </svg>
              }
              title="Вибирайте поїздки за низькою ціною та комфортом"
              text="Куди б ви не їхали, автобусом чи з попутниками, знайдіть ідеальну поїздку з безлічі напрямків і маршрутів – і подорожуйте за низькими цінами та відповідним комфортом."
            />
            <Card
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="14" y1="10" x2="14" y2="14" />
                  <line x1="10" y1="10" x2="10" y2="14" />
                </svg>
              }
              title="Довіряйте своїм попутникам"
              text="Ми надаємо можливість всім учасникам писати відгуки один одному, не залежно чи поїздка відбулась. Завдяки чому можна дізнатися не лише про майстерність водія чи поведінку пасажира але й про стиль спілкування людини. Це дасть Вам впевненість та додатковий комфорт подорожі."
            />
            <Card
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12h18M9 5l7 7-7 7" />
                </svg>
              }
              title="Просто та зручно в користуванні!"
              text="Забронювати поїздку ще ніколи не було так легко! Завдяки потужному алгоритму наш застосунок знайде водія поруч із вами всього за кілька секунд."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ icon, title, text }) {
  return (
    <div className="bg-gray-100 p-6 rounded-2xl shadow-lg flex flex-col items-center transition duration-300 ease-in-out hover:bg-gray-200 hover:shadow-xl w-full sm:w-80 xs:w-72">
      <div className="bg-gray-200 text-gray-600 p-4 rounded-full mb-4">{icon}</div>
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm text-center">{text}</p>
    </div>
  );
}

export default Hero;
