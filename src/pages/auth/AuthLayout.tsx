import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className=" w-[100vw] grid grid-cols-2 h-[100vh] ">
      <section className="flex items-center justify-center h-[100vh] bg-primary rounded-r-4xl">
        <h1 className="text-center text-sm font-bold text-accent p-1.5 ">
          SISTEM PAKAR DIAGNOSA AUTISM PADA RUMAH SAKIT DAERAH MADANI
          MENGGUNAKAN METODE NAÏVE BAYES BERBASIS WEB
        </h1>
      </section>
      <section className="flex items-center justify-center h-[100vh]">
        {<Outlet />}
      </section>
    </div>
  );
}
