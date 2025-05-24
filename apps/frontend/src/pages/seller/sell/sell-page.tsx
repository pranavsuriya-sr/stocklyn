const SellPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 mt-20 pt-2">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
            Sell Your Item
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Fill out the details below to list your product on our platform.
          </p>
        </header>

        <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 lg:p-10 space-y-8 border border-gray-200">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-indigo-700 mb-1"
            >
              Product Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 py-3 px-4 text-base"
              placeholder="e.g., Vintage Leather Jacket"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-indigo-700 mb-1"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={4}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 py-3 px-4 text-base"
              placeholder="Describe your item in detail..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-indigo-700 mb-1"
              >
                Price (USD)
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 py-3 px-4 text-base"
                placeholder="e.g., 99.99"
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-indigo-700 mb-1"
              >
                Category
              </label>
              <select
                name="category"
                id="category"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-3 px-4 text-base appearance-none pr-8 bg-no-repeat bg-right-2"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                }}
                defaultValue=""
              >
                <option value="" disabled className="text-gray-500">
                  Select a category
                </option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing & Apparel</option>
                <option value="furniture">Furniture</option>
                <option value="books">Books & Media</option>
                <option value="collectibles">Collectibles & Art</option>
                <option value="vehicles">Vehicles</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="image-upload"
              className="block text-sm font-medium text-indigo-700 mb-1"
            >
              Product Image
            </label>
            <div className="mt-2 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-500 transition-colors">
              <div className="space-y-1 text-center">
                {/* Placeholder for image preview or SVG icon */}
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-500 justify-center">
                  <label
                    htmlFor="image-upload-input" // Changed htmlFor to avoid conflict if an input is added later
                    className="relative cursor-pointer bg-gray-100 rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-50 focus-within:ring-indigo-500 px-2 py-1"
                  >
                    <span>Upload a file</span>
                    {/* Input is not functional, for UI only */}
                    <input
                      id="image-upload-input"
                      name="image-upload"
                      type="file"
                      className="sr-only"
                      disabled
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="button" // Changed from submit as there's no form handling
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 transition-transform transform active:scale-95"
            >
              List Item for Sale
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellPage;
