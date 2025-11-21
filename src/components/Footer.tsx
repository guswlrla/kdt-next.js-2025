export default function Footer() {
  return (
    <footer className="w-full p-4 bg-gray-50 border-t border-gray-200 shadow-sm md:flex md:items-center md:justify-between md:p-6">
      <span className="text-sm sm:text-center text-gray-700">
        © 2023 
        <a className="hover:underline">Flowbite™</a>
        . All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0 text-gray-600">
        <li>
          <a href="#" className="hover:underline me-4 md:me-6">About</a>
        </li>
        <li>
          <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
        </li>
        <li>
          <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
        </li>
        <li>
          <a href="#" className="hover:underline">Contact</a>
        </li>
      </ul>
    </footer>
  )
}
