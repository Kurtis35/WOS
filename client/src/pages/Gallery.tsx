export default function Gallery() {
  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">
          Gallery
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          <img
            src="/images/gallery1.jpg"
            alt="Gallery 1"
            className="w-full h-72 object-cover rounded-lg"
          />

          <img
            src="/images/gallery2.jpg"
            alt="Gallery 2"
            className="w-full h-72 object-cover rounded-lg"
          />

          <img
            src="/images/gallery3.jpg"
            alt="Gallery 3"
            className="w-full h-72 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}