const Footer: React.FC = () => {
  return (
    <>
      <footer className="bg-black mt-10 px-4 py-6 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h2 className="text-xl font-bold">In Case You missed it</h2>
            <article className="mt-4">
              <div className="flex gap-4 items-start">
                <img src="https://media.cnn.com/api/v1/images/stellar/prod/230808141753-simone-biles-mental-health-break-wellness.jpg?c=16x9&q=h_438,w_780,c_fill" className="w-36 h-24 object-cover rounded" alt="simone" />
                <div>
                  <h3 className="font-semibold">What we can learn from Simone Biles’ mental health break</h3>
                </div>
              </div>

              <ul className="list-disc pl-5 mt-3">
                <li><a href="#" className="hover:underline">Great Barrier Reef stays off UNESCO ‘in danger’ list but hot El Niño summer looms</a></li>
                <li><a href="#" className="hover:underline">Italian fugitive’s love of soccer gets him caught in Greece</a></li>
                <li><a href="#" className="hover:underline">Foo Fighters and Alanis Morissette pay tribute to Sinéad O’Connor</a></li>
                <li><a href="#" className="hover:underline">The UK will drill for more oil and gas in the North Sea</a></li>
                <li><a href="#" className="hover:underline">The minority who back Netanyahu to the hilt</a></li>
              </ul>
            </article>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4 ">
            <div>
              <h3 className="font-semibold">World</h3>
              <ul className="mt-2 text-sm space-y-1">
                <li><a href="#" className="hover:underline">Africa</a></li>
                <li><a href="#" className="hover:underline">Americas</a></li>
                <li><a href="#" className="hover:underline">Asia</a></li>
                <li><a href="#" className="hover:underline">Australia</a></li>
                <li><a href="#" className="hover:underline">China</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">US Politics</h3>
              <ul className="mt-2 text-sm space-y-1">
                <li><a href="#" className="hover:underline">The Biden Presidency</a></li>
                <li><a href="#" className="hover:underline">Facts First</a></li>
                <li><a href="#" className="hover:underline">US Elections</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">Business</h3>
              <ul className="mt-2 text-sm space-y-1">
                <li><a href="#" className="hover:underline">Markets</a></li>
                <li><a href="#" className="hover:underline">Tech</a></li>
                <li><a href="#" className="hover:underline">Media</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">More</h3>
              <ul className="mt-2 text-sm space-y-1">
                <li><a href="#" className="hover:underline">Photos</a></li>
                <li><a href="#" className="hover:underline">Longform</a></li>
                <li><a href="#" className="hover:underline">Investigations</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-6 border-t border-gray-200 pt-4 text-sm flex flex-col md:flex-row justify-between">
          <div className="space-y-2">
            <form className="flex items-center gap-2">
              <input className="border p-2 rounded w-56 text-sm" type="text" placeholder="Search New Time Africa..." />
              <button className="px-3 py-2 bg-white text-black font-bold rounded" type="submit">Search →</button>
            </form>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <i className="bi bi-facebook"></i>
              <i className="bi bi-twitter"></i>
              <i className="bi bi-instagram"></i>
            </div>

            <div>
              <a href="#" className="hover:underline mr-2">Terms of Use</a>
              <a href="#" className="hover:underline mr-2">Privacy Policy</a>
              <a href="#" className="hover:underline">Accessibility & CC</a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-4 text-xs text-white">
          &copy; 2023 Cable News Network. Bridgebelt All Rights Reserved.
          <br />
        </div>
      </footer>
    </>
  );
};
export default Footer;