const AdminFooterPage = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-800 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center text-sm">
        <p>&copy; {currentYear} Trazor. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default AdminFooterPage;
