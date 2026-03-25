const brands = ["Toyota", "Honda", "Nissan", "Mazda", "Isuzu", "Ford", "Mitsubishi"];

export default function Brands() {
  return (
    <section className="py-10 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-center text-gray-400 text-xs uppercase tracking-widest mb-6">
          รองรับรถยนต์ทุกยี่ห้อชั้นนำ
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {brands.map((name) => (
            <div
              key={name}
              className="text-2xl font-black text-gray-300 hover:text-orange-500 transition-colors duration-300 select-none tracking-wider"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
