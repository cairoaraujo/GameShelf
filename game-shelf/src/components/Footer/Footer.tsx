
export default function Footer() {
    return (
      <footer className="bg-[#060944] h-12">
        <div className="container mx-auto h-full flex items-center justify-center">
          <p className="text-white text-sm">
            &copy; {new Date().getFullYear()} GameShelf. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }