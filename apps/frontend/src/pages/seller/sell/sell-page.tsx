import { addProductRoute, categoryRoute } from "@/api/api";
import { useSession } from "@/context/session-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import {
  AlertTriangle,
  Ban,
  ChevronDown,
  ExternalLink,
  MessageSquareWarning,
  PlusCircle,
  ScrollText,
  ShieldCheck,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3 MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const fileListSchema = (fieldName: string) =>
  z
    .instanceof(FileList)
    .refine((files) => files?.length >= 1, `${fieldName} is required.`)
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `${fieldName}: Max file size is 3MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type || ""),
      `${fieldName}: Only .jpg, .jpeg, .png and .webp formats are supported.`
    )
    .nullable()
    .optional();

const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Product name must be at least 3 characters" }),
  productDescription: z.string().min(20, {
    message: "Product description must be at least 20 characters",
  }),
  price: z.preprocess(
    (val) => parseFloat(String(val)),
    z.number().positive({ message: "Price must be a positive number" })
  ),
  categoryName: z.string().min(1, { message: "Category is required" }),
  displayImage: fileListSchema("Display image").refine(
    (val) => val !== null && val !== undefined && val.length > 0,
    { message: "Display image is required." }
  ),
  imageUrl: z
    .array(fileListSchema("Additional image"))
    .max(3, { message: "You can add a maximum of 3 additional images" })
    .optional()
    .default([]),
  stockQuantity: z.preprocess(
    (val) => parseInt(String(val), 10),
    z.number().int().min(0, { message: "Stock quantity cannot be negative" })
  ),
  details: z
    .string()
    .min(50, { message: "Details must be at least 50 characters" }),
  highlights: z
    .array(
      z
        .string()
        .min(10, { message: "Each highlight must be at least 10 characters" })
    )
    .length(3, { message: "Exactly 3 highlights are required" }),
});

type ProductFormValues = z.infer<typeof productSchema>;

const defaultFileArrayItem = undefined;

const SellPage = () => {
  const { user } = useSession();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      productDescription: "",
      price: undefined,
      categoryName: "",
      displayImage: undefined,
      imageUrl: [],
      stockQuantity: 0,
      details: "",
      highlights: ["", "", ""],
    },
  });

  const [displayImagePreview, setDisplayImagePreview] = useState<string | null>(
    null
  );
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState<
    (string | null)[]
  >([]);

  const { fields, append, remove } = useFieldArray<
    ProductFormValues,
    // @ts-ignore
    "imageUrl",
    "id"
  >({
    control,
    name: "imageUrl",
  });

  const handleFileUpload = async (file: File): Promise<string | null> => {
    if (!file) return null;
    if (file.size > MAX_FILE_SIZE) {
      alert(`File ${file.name} is too large (max 3MB).`);
      return null;
    }
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      alert(`File type for ${file.name} not supported.`);
      return null;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await addProductRoute.post("/uploadImage", formData);
      return response.data.publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Image upload failed. Please try again.");
      return null;
    }
  };

  const HandleAddProduct = async (data: ProductFormValues) => {
    const uploadedDisplayImageUrl = displayImagePreview;
    const uploadedAdditionalImageUrls = additionalImagePreviews.filter(
      (url) => url !== null
    ) as string[];
    uploadedAdditionalImageUrls.push(uploadedDisplayImageUrl as string);

    if (!uploadedDisplayImageUrl) {
      alert("Display image is missing.");
      return;
    }

    const payload = {
      ...data,
      sellerId: user?.id,
      displayImage: uploadedDisplayImageUrl,
      imageUrl: uploadedAdditionalImageUrls,
    };

    if (payload.stockQuantity === 0) {
      alert("Stock quantity cannot be 0");
      return;
    }

    try {
      const response = await addProductRoute.post("/InsertProduct", payload);
      if (response.data && response.status === 200) {
        alert("Product listed successfully!");
        reset();
        setDisplayImagePreview(null);
        setAdditionalImagePreviews([]);
      } else {
        alert(
          response.data?.message || "Failed to list product. Please try again."
        );
      }
    } catch (error: any) {
      console.error("Error submitting product form:", error);
      alert(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    }
  };

  const onSubmit = (data: ProductFormValues) => {
    HandleAddProduct(data);
  };

  const baseInputClass =
    "block w-full text-neutral-900 bg-white border border-neutral-300/90 rounded-lg shadow-sm placeholder-neutral-400 transition-colors duration-150 ease-in-out focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none disabled:bg-neutral-100 disabled:cursor-not-allowed hover:border-neutral-400";
  const inputClass = `${baseInputClass} py-2.5 px-3.5 text-sm`;
  const textareaClass = `${baseInputClass} py-2.5 px-3.5 text-sm min-h-[80px]`;
  const labelClass = "block text-sm font-medium text-neutral-700 mb-1.5";
  const errorClass = "flex items-center text-xs text-red-600 mt-1.5";
  const selectContainerClass = "relative w-full";
  const selectClass = `${inputClass} appearance-none pr-10`;
  const selectArrowClass =
    "pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500";

  const fileInputWrapperClass =
    "relative flex flex-col items-center justify-center w-full p-6 border-2 border-neutral-300/70 border-dashed rounded-xl cursor-pointer bg-neutral-50/50 hover:border-indigo-400 transition-colors duration-200";
  const fileInputTextClass = "text-xs text-neutral-500";
  const fileInputIconClass = "h-10 w-10 text-neutral-400 mb-2";

  const fetchCategories = async () => {
    const response = await categoryRoute.get("/allcategory");
    return response?.data;
  };

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return (
    <div className="min-h-screen bg-neutral-100 py-12 sm:py-16 lg:py-20 font-montserrat mt-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold text-neutral-900">
            Create New Listing
          </h1>
          <p className="mt-2 text-base text-neutral-600">
            Fill in the details below to get your product on the marketplace.
          </p>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-xl rounded-2xl p-8 sm:p-10 space-y-10 border border-neutral-200/70"
        >
          <div>
            <label htmlFor="name" className={labelClass}>
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className={inputClass}
              placeholder="e.g., Handcrafted Wooden Bowl"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className={errorClass}>
                <AlertTriangle size={14} className="mr-1.5 shrink-0" />
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="productDescription" className={labelClass}>
              Short Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="productDescription"
              rows={3}
              {...register("productDescription")}
              className={textareaClass}
              placeholder="A brief, catchy description (min. 20 characters)..."
              disabled={isSubmitting}
            />
            {errors.productDescription && (
              <p className={errorClass}>
                <AlertTriangle size={14} className="mr-1.5 shrink-0" />
                {errors.productDescription.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
            <div>
              <label htmlFor="price" className={labelClass}>
                Price (INR) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="price"
                step="0.01"
                {...register("price")}
                className={inputClass}
                placeholder="e.g., 1250.99"
                disabled={isSubmitting}
              />
              {errors.price && (
                <p className={errorClass}>
                  <AlertTriangle size={14} className="mr-1.5 shrink-0" />
                  {errors.price.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="categoryName" className={labelClass}>
                Category <span className="text-red-500">*</span>
              </label>
              <div className={selectContainerClass}>
                <select
                  id="categoryName"
                  {...register("categoryName")}
                  className={selectClass}
                  defaultValue=""
                  disabled={isSubmitting || categoriesLoading}
                >
                  <option value="" disabled>
                    {categoriesLoading
                      ? "Loading categories..."
                      : "Select a category"}
                  </option>
                  {categories?.map((category: { name: string }) => (
                    <option value={category.name} key={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className={selectArrowClass}>
                  <ChevronDown size={20} />
                </div>
              </div>
              {errors.categoryName && (
                <p className={errorClass}>
                  <AlertTriangle size={14} className="mr-1.5 shrink-0" />
                  {errors.categoryName.message}
                </p>
              )}
              <div className="mt-2.5 text-xs">
                <div
                  onClick={() => navigate("/seller/requestCategory")}
                  className="inline-flex items-center font-medium text-indigo-600 hover:text-indigo-500 transition-colors group cursor-pointer"
                >
                  Can't find your category? Request a new one
                  <ExternalLink
                    size={12}
                    className="ml-1 opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="displayImage-input" className={labelClass}>
              Main Display Image <span className="text-red-500">*</span>
            </label>
            <Controller
              name="displayImage"
              control={control}
              render={({
                field: { onChange: rhfOnChange, onBlur, name, ref },
              }) => (
                <>
                  <input
                    type="file"
                    id="displayImage-input"
                    className="sr-only"
                    onChange={async (
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = await handleFileUpload(file);
                        if (url) setDisplayImagePreview(url);
                        rhfOnChange(e.target.files);
                      } else {
                        setDisplayImagePreview(null);
                        rhfOnChange(null);
                      }
                    }}
                    onBlur={onBlur}
                    name={name}
                    accept={ACCEPTED_IMAGE_TYPES.join(",")}
                    ref={ref}
                    disabled={isSubmitting}
                  />
                  {displayImagePreview ? (
                    <div className="mt-2 relative group">
                      <img
                        src={displayImagePreview}
                        alt="Display Preview"
                        className="block max-h-72 w-auto rounded-lg border border-neutral-300/90 object-contain shadow-sm"
                      />
                      <div className="absolute top-2 right-2 flex space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <label
                          htmlFor="displayImage-input"
                          className="cursor-pointer rounded-md bg-white/80 backdrop-blur-sm p-1.5 text-neutral-700 shadow-md hover:bg-white hover:text-indigo-600 transition-all"
                          title="Change image"
                        >
                          <UploadCloud size={16} />
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setDisplayImagePreview(null);
                            setValue("displayImage", null, {
                              shouldValidate: true,
                            });
                            const fileInput = document.getElementById(
                              "displayImage-input"
                            ) as HTMLInputElement;
                            if (fileInput) fileInput.value = "";
                          }}
                          className="rounded-md bg-white/80 backdrop-blur-sm p-1.5 text-red-600 shadow-md hover:bg-white hover:text-red-700 transition-all"
                          aria-label="Remove display image"
                          title="Remove image"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label
                      htmlFor="displayImage-input"
                      className={`${fileInputWrapperClass} ${errors.displayImage ? "border-red-400 hover:border-red-500" : ""}`}
                    >
                      <UploadCloud className={fileInputIconClass} />
                      <p className="font-medium text-sm text-indigo-600">
                        Click to upload display image
                      </p>
                      <p className={fileInputTextClass}>
                        or drag and drop (PNG, JPG, WEBP up to 3MB)
                      </p>
                    </label>
                  )}
                  {errors.displayImage && (
                    <p className={errorClass}>
                      <AlertTriangle size={14} className="mr-1.5 shrink-0" />
                      {typeof errors.displayImage.message === "string"
                        ? errors.displayImage.message
                        : "Invalid image"}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <div>
            <label className={labelClass}>
              Additional Images (Up to 3, Optional)
            </label>
            <div className="space-y-4 mt-2">
              {fields.map((item, index) => (
                <div key={item.id} className="relative group">
                  <Controller
                    name={`imageUrl.${index}` as const}
                    control={control}
                    render={({
                      field: { onChange: rhfOnChange, onBlur, name, ref },
                    }) => (
                      <>
                        <input
                          type="file"
                          id={`imageUrl-input.${index}`}
                          className="sr-only"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = await handleFileUpload(file);
                              setAdditionalImagePreviews((prev) => {
                                const newPreviews = [...prev];
                                newPreviews[index] = url;
                                return newPreviews;
                              });
                              rhfOnChange(e.target.files);
                            } else {
                              setAdditionalImagePreviews((prev) => {
                                const newPreviews = [...prev];
                                newPreviews[index] = null;
                                return newPreviews;
                              });
                              rhfOnChange(null);
                            }
                          }}
                          onBlur={onBlur}
                          name={name}
                          accept={ACCEPTED_IMAGE_TYPES.join(",")}
                          ref={ref}
                          disabled={isSubmitting}
                        />
                        {additionalImagePreviews[index] ? (
                          <div className="relative">
                            <img
                              src={additionalImagePreviews[index]!}
                              alt={`Additional Preview ${index + 1}`}
                              className="block max-h-48 w-auto rounded-lg border border-neutral-300/90 object-contain shadow-sm"
                            />
                            <div className="absolute top-1.5 right-1.5 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <label
                                htmlFor={`imageUrl-input.${index}`}
                                className="cursor-pointer rounded-md bg-white/80 backdrop-blur-sm p-1 text-neutral-700 shadow-md hover:bg-white hover:text-indigo-600 transition-all"
                                title="Change image"
                              >
                                <UploadCloud size={14} />
                              </label>
                              <button
                                type="button"
                                onClick={() => {
                                  setAdditionalImagePreviews((prev) => {
                                    const newPreviews = [...prev];
                                    newPreviews[index] = null;
                                    return newPreviews;
                                  });
                                  setValue(`imageUrl.${index}` as any, null, {
                                    shouldValidate: true,
                                  });
                                  const fileInput = document.getElementById(
                                    `imageUrl-input.${index}`
                                  ) as HTMLInputElement;
                                  if (fileInput) fileInput.value = "";
                                }}
                                className="rounded-md bg-white/80 backdrop-blur-sm p-1 text-red-600 shadow-md hover:bg-white hover:text-red-700 transition-all"
                                aria-label={`Remove additional image ${index + 1}`}
                                title="Remove image"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <label
                            htmlFor={`imageUrl-input.${index}`}
                            className={`${fileInputWrapperClass} py-8 ${errors.imageUrl?.[index] ? "border-red-400 hover:border-red-500" : ""}`}
                          >
                            <UploadCloud className={fileInputIconClass} />
                            <p className="font-medium text-xs text-indigo-600">
                              Upload additional image {index + 1}
                            </p>
                            <p className={fileInputTextClass}>
                              PNG, JPG, WEBP up to 3MB
                            </p>
                          </label>
                        )}
                        {errors.imageUrl?.[index] && (
                          <p className={errorClass}>
                            <AlertTriangle
                              size={14}
                              className="mr-1.5 shrink-0"
                            />
                            {typeof errors.imageUrl[index]?.message === "string"
                              ? errors.imageUrl[index]?.message
                              : "Invalid image"}
                          </p>
                        )}
                      </>
                    )}
                  />
                  {fields.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        remove(index);
                        setAdditionalImagePreviews((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                      }}
                      className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full p-0.5 shadow-md hover:bg-red-600 transition-all duration-200"
                      aria-label={`Remove image slot ${index + 1}`}
                      title="Remove slot"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {fields.length < 3 && (
              <button
                type="button"
                onClick={() =>
                  append(defaultFileArrayItem as any, { shouldFocus: false })
                }
                className="mt-4 flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors group disabled:text-neutral-400 disabled:cursor-not-allowed"
                disabled={isSubmitting || fields.length >= 3}
              >
                <PlusCircle
                  size={16}
                  className="transition-transform group-hover:rotate-90 duration-200"
                />
                Add Another Image
              </button>
            )}
            {errors.imageUrl &&
              !Array.isArray(errors.imageUrl) &&
              typeof errors.imageUrl.message === "string" && (
                <p className={errorClass}>
                  <AlertTriangle size={14} className="mr-1.5 shrink-0" />
                  {errors.imageUrl.message}
                </p>
              )}
          </div>

          <div>
            <label htmlFor="stockQuantity" className={labelClass}>
              Stock Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="stockQuantity"
              min="0"
              {...register("stockQuantity")}
              className={inputClass}
              placeholder="e.g., 25"
              disabled={isSubmitting}
            />
            {errors.stockQuantity && (
              <p className={errorClass}>
                <AlertTriangle size={14} className="mr-1.5 shrink-0" />
                {errors.stockQuantity.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="details" className={labelClass}>
              Full Product Details <span className="text-red-500">*</span>
            </label>
            <textarea
              id="details"
              rows={5}
              {...register("details")}
              className={textareaClass}
              placeholder="Provide comprehensive details: materials, dimensions, care instructions, etc. (min. 50 characters)..."
              disabled={isSubmitting}
            />
            {errors.details && (
              <p className={errorClass}>
                <AlertTriangle size={14} className="mr-1.5 shrink-0" />
                {errors.details.message}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <label className={labelClass}>
              Product Highlights (Exactly 3 required, min. 10 chars each){" "}
              <span className="text-red-500">*</span>
            </label>
            {[0, 1, 2].map((index) => (
              <div key={index}>
                <input
                  type="text"
                  id={`highlights.${index}`}
                  {...register(`highlights.${index}` as const)}
                  className={inputClass}
                  placeholder={`Highlight ${index + 1}`}
                  disabled={isSubmitting}
                />
                {errors.highlights?.[index] && (
                  <p className={errorClass}>
                    <AlertTriangle size={14} className="mr-1.5 shrink-0" />
                    {errors.highlights[index]?.message}
                  </p>
                )}
              </div>
            ))}
            {errors.highlights &&
              !Array.isArray(errors.highlights) &&
              typeof errors.highlights.message === "string" && (
                <p className={errorClass}>
                  <AlertTriangle size={14} className="mr-1.5 shrink-0" />
                  {errors.highlights.message}
                </p>
              )}
          </div>

          <div className="pt-6 space-y-6">
            <div className="bg-neutral-50/80 border border-neutral-200/70 rounded-xl p-6 space-y-4">
              <h3 className="text-base font-semibold text-neutral-800 mb-3">
                Quick Guidelines & Our Commitment
              </h3>
              <ul className="space-y-2.5 text-sm text-neutral-700">
                <li className="flex items-start">
                  <Ban
                    size={18}
                    className="mr-2.5 mt-0.5 text-red-500 shrink-0"
                  />
                  <span>
                    Please do not spam image uploads with irrelevant or
                    low-quality content.
                  </span>
                </li>
                <li className="flex items-start">
                  <MessageSquareWarning
                    size={18}
                    className="mr-2.5 mt-0.5 text-amber-600 shrink-0"
                  />
                  <span>
                    Avoid using inappropriate, offensive, or misleading names
                    and descriptions for your products.
                  </span>
                </li>
                <li className="flex items-start">
                  <ScrollText
                    size={18}
                    className="mr-2.5 mt-0.5 text-indigo-500 shrink-0"
                  />
                  <span>
                    Ensure your product details are accurate, complete, and
                    adhere to our community standards. For more information,
                    refer to our{" "}
                    <Link
                      to="/seller-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-indigo-600 hover:underline"
                    >
                      Seller Policy
                    </Link>
                    .
                  </span>
                </li>
              </ul>
              <div className="flex items-start pt-3 mt-3 border-t border-neutral-200/70">
                <ShieldCheck
                  size={20}
                  className="mr-2.5 mt-0.5 text-green-600 shrink-0"
                />
                <p className="text-xs text-neutral-600">
                  We're committed to maintaining a trusted and high-quality
                  marketplace. Your thoughtful listings help us keep the
                  platform valuable and enjoyable for everyone!
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-200/80 mt-10">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 border border-transparent rounded-lg shadow-md text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-100 focus:ring-indigo-500 transition-all duration-200 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isSubmitting || Object.keys(errors).length > 0}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting Listing...
                </>
              ) : (
                "List Product Now"
              )}
            </button>
          </div>
        </form>
        <div className="text-center mt-8 pb-8">
          <p className="text-xs text-neutral-500">
            By listing a product, you agree to Trazor's Terms of Service and
            Seller Policies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellPage;
