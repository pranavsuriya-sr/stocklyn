import { addProductRoute, categoryRoute } from "@/api/api";
import { useSession } from "@/context/session-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import {
  FileIcon,
  PlusCircleIcon,
  Trash2Icon,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
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
    .refine((files) => files?.length === 1, `${fieldName} is required.`)
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

const productSchema = z
  .object({
    name: z.string().min(1, { message: "Product name is required" }),
    productDescription: z.string().min(10, {
      message: "Product description must be at least 10 characters",
    }),
    price: z.preprocess(
      (val) => parseFloat(String(val)),
      z.number().positive({ message: "Price must be a positive number" })
    ),
    categoryName: z.string().min(1, { message: "Category is required" }),
    otherCategoryName: z.string().optional(),
    displayImage: fileListSchema("Display image").refine(
      (val) => val !== null && val !== undefined && val.length > 0,
      { message: "Display image is required." }
    ),
    imageUrl: z
      .array(fileListSchema("Additional image"))
      .max(3, { message: "You can add a maximum of 3 additional images" })
      .default([]),
    stockQuantity: z.preprocess(
      (val) => parseInt(String(val), 10),
      z.number().int().min(0, { message: "Stock quantity cannot be negative" })
    ),
    details: z
      .string()
      .min(20, { message: "Details must be at least 20 characters" }),
    highlights: z
      .array(
        z
          .string()
          .min(5, { message: "Each highlight must be at least 5 characters" })
      )
      .length(3, { message: "Exactly 3 highlights are required" }),
  })
  .superRefine((data, ctx) => {
    if (
      data.categoryName === "other" &&
      (!data.otherCategoryName || data.otherCategoryName.trim() === "")
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["otherCategoryName"],
        message: "Please specify the category name when 'Other' is selected.",
      });
    }
  });

type ProductFormValues = z.infer<typeof productSchema>;

const defaultFileArrayItem = undefined;

const SellPage = () => {
  const { user } = useSession();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      productDescription: "",
      price: undefined,
      categoryName: "",
      otherCategoryName: "",
      displayImage: undefined,
      imageUrl: [],
      stockQuantity: undefined,
      details: "",
      highlights: ["", "", ""],
    },
  });

  const [displayImageUrl, setDisplayImageUrl] = useState<string | null>(null);
  const [additionalImageUrls, setAdditionalImageUrls] = useState<string[]>([]);

  const { fields, append, remove } = useFieldArray<
    ProductFormValues,
    // @ts-ignore
    "imageUrl",
    "id"
  >({
    control,
    name: "imageUrl",
  });

  const watchedCategory = watch("categoryName");
  const watchedDisplayImage = watch("displayImage");
  const watchedImageUrls = watch("imageUrl");

  const HandleAddProduct = async (data: ProductFormValues) => {
    const {
      name,
      productDescription,
      price,
      categoryName,
      otherCategoryName,
      stockQuantity,
      details,
      highlights,
    } = data;

    const sellerId = user?.id;
    const displayImage = displayImageUrl;
    const imageUrl = [...additionalImageUrls, displayImageUrl];
    // const colors: String[] = []; add colours later

    const payload = {
      name,
      categoryName,
      sellerId,
      details,
      productDescription,
      stockQuantity,
      displayImage,
      highlights,
      imageUrl,
      price,
      otherCategoryName,
    };

    try {
      const response = await addProductRoute.post("/InsertProduct", payload);
      console.log(response.data);
    } catch (error) {
      console.log("Error in submitting product form", error);
    }
  };

  const onSubmit = (data: ProductFormValues) => {
    HandleAddProduct(data);
  };

  const inputClass =
    "w-full bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 py-3 px-4 text-base disabled:bg-gray-100 disabled:cursor-not-allowed";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";
  const errorClass = "text-red-600 text-xs mt-1.5";
  const selectContainerClass = "relative w-full";
  const selectClass = `${inputClass} appearance-none pr-10`;
  const selectArrowClass =
    "pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500";

  const fileInputBaseClass =
    "flex items-center justify-center w-full px-6 py-10 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-indigo-500 transition-colors";
  const fileInputTextClass = "text-sm text-gray-500";
  const fileInputIconClass = "mx-auto h-12 w-12 text-gray-400 mb-2";

  const fetchCategories = async () => {
    const response = await categoryRoute.get("/allcategory");
    // console.log(response.data);
    return response?.data;
  };

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });

  const uploadDisplayImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      alert("Please select a file");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert("File size is too large");
    }
    // console.log(file);

    const formData = new FormData();
    formData.append("file", file);

    const response = await addProductRoute.post("/uploadImage", formData);
    setDisplayImageUrl(response.data.publicUrl);
  };

  const uploadAdditionalImages = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) {
      alert("Please select a file");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert("File size is too large");
    }
    const formData = new FormData();
    formData.append("file", file);
    const response = await addProductRoute.post("/uploadImage", formData);
    setAdditionalImageUrls((prev) => {
      const newUrls = [...prev];
      newUrls[index] = response.data.publicUrl;
      return newUrls;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 pt-28 font-montserrat mt-16">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold ">
            List Your Product
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Provide the details below to get your item listed on our platform.
          </p>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-xl rounded-xl p-6 sm:p-8 lg:p-10 space-y-8 border border-gray-200"
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
            />
            {errors.name && <p className={errorClass}>{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="productDescription" className={labelClass}>
              Display Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="productDescription"
              rows={4}
              {...register("productDescription")}
              className={inputClass}
              placeholder="Detailed description of your product (min. 10 characters)..."
            />
            {errors.productDescription && (
              <p className={errorClass}>{errors.productDescription.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
              />
              {errors.price && (
                <p className={errorClass}>{errors.price.message}</p>
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
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="other" key={"other"} className="font-bold">
                    other
                  </option>
                  {categories !== undefined &&
                    categories.map((category: { name: string }) => {
                      return (
                        <option value={category.name} key={category.name}>
                          {category.name}
                        </option>
                      );
                    })}
                </select>
                <div className={selectArrowClass}>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
              {errors.categoryName && (
                <p className={errorClass}>{errors.categoryName.message}</p>
              )}
            </div>
          </div>

          {watchedCategory === "other" && (
            <div>
              <label htmlFor="otherCategoryName" className={labelClass}>
                Please Specify Category <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="otherCategoryName"
                {...register("otherCategoryName")}
                className={inputClass}
                placeholder="e.g., Custom Pet Portraits"
              />
              {errors.otherCategoryName && (
                <p className={errorClass}>{errors.otherCategoryName.message}</p>
              )}
            </div>
          )}

          <div>
            <label htmlFor="displayImage-input" className={labelClass}>
              Main Display Image <span className="text-red-500">*</span>
            </label>
            <Controller
              name="displayImage"
              control={control}
              defaultValue={undefined}
              render={({
                field: { onChange: rhfOnChange, onBlur, name, value, ref },
              }) => (
                <>
                  <input
                    type="file"
                    id="displayImage-input"
                    className="sr-only"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      uploadDisplayImage(e);
                      rhfOnChange(
                        e.target.files && e.target.files.length > 0
                          ? e.target.files
                          : null
                      );
                    }}
                    onBlur={onBlur}
                    name={name}
                    accept={ACCEPTED_IMAGE_TYPES.join(",")}
                    ref={ref}
                  />

                  {displayImageUrl ? (
                    <div className="mt-2">
                      <img
                        src={displayImageUrl}
                        alt="Display Preview"
                        className="block max-h-60 w-auto rounded-md border border-gray-300 object-contain"
                      />
                      <div className="mt-2 flex items-center justify-between">
                        <label
                          htmlFor="displayImage-input"
                          className="cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Change Image
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setDisplayImageUrl(null);
                            setValue("displayImage", null, {
                              shouldValidate: true,
                            });
                            const fileInput = document.getElementById(
                              "displayImage-input"
                            ) as HTMLInputElement;
                            if (fileInput) {
                              fileInput.value = "";
                            }
                          }}
                          className="rounded-md p-1.5 text-red-600 hover:bg-red-100 hover:text-red-700"
                          aria-label="Remove display image"
                        >
                          <XIcon size={20} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label
                        htmlFor="displayImage-input"
                        className={`${fileInputBaseClass} ${errors.displayImage ? "border-red-500" : ""}`}
                      >
                        <div className="text-center">
                          <UploadCloudIcon className={fileInputIconClass} />
                          <p className="font-medium text-indigo-600">
                            Click to upload display image
                          </p>
                          <p className={fileInputTextClass}>or drag and drop</p>
                          <p className={fileInputTextClass}>
                            PNG, JPG, WEBP up to 3MB
                          </p>
                        </div>
                      </label>

                      {value && value.length > 0 && (
                        <div className="mt-2 p-2 border border-gray-300 rounded-md bg-gray-50 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileIcon className="h-5 w-5 text-gray-500" />
                            <span className="text-sm text-gray-700 truncate max-w-xs">
                              {value[0].name}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setValue("displayImage", null, {
                                shouldValidate: true,
                              });
                              const fileInput = document.getElementById(
                                "displayImage-input"
                              ) as HTMLInputElement;
                              if (fileInput) {
                                fileInput.value = "";
                              }
                            }}
                            className="p-1 text-red-500 hover:text-red-700"
                            aria-label="Clear selected file"
                          >
                            <XIcon size={18} />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  {errors.displayImage && (
                    <p className={errorClass}>
                      {errors.displayImage.message?.toString()}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <div>
            <label className={labelClass}>Additional Images (Up to 3)</label>
            {fields.map((item, index) => (
              <div key={item.id} className="mb-4">
                <Controller
                  name={`imageUrl.${index}` as const}
                  control={control}
                  defaultValue={undefined}
                  render={({
                    field: { onChange, onBlur, name, value, ref },
                  }) => (
                    <>
                      <div className="flex items-start gap-2">
                        <div className="flex-1">
                          <input
                            type="file"
                            id={`imageUrl-input.${index}`}
                            className="sr-only"
                            onChange={(e) => {
                              uploadAdditionalImages(e, index);
                              onChange(
                                e.target.files && e.target.files.length > 0
                                  ? e.target.files
                                  : null
                              );
                            }}
                            onBlur={onBlur}
                            name={name}
                            accept={ACCEPTED_IMAGE_TYPES.join(",")}
                            ref={ref}
                          />

                          {additionalImageUrls[index] ? (
                            <div className="mt-0">
                              <img
                                src={additionalImageUrls[index]}
                                alt={`Additional Preview ${index + 1}`}
                                className="block max-h-48 w-auto rounded-md border border-gray-300 object-contain"
                              />
                              <div className="mt-2 flex items-center justify-between">
                                <label
                                  htmlFor={`imageUrl-input.${index}`}
                                  className="cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
                                >
                                  Change
                                </label>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setAdditionalImageUrls((prev) => {
                                      const newUrls = [...prev];
                                      newUrls[index] = "";
                                      return newUrls;
                                    });
                                    setValue(`imageUrl.${index}` as any, null, {
                                      shouldValidate: true,
                                    });
                                    const fileInput = document.getElementById(
                                      `imageUrl-input.${index}`
                                    ) as HTMLInputElement;
                                    if (fileInput) fileInput.value = "";
                                  }}
                                  className="rounded-md p-1 text-red-600 hover:bg-red-100 hover:text-red-700"
                                  aria-label={`Remove additional image ${index + 1} preview`}
                                >
                                  <XIcon size={16} />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <label
                                htmlFor={`imageUrl-input.${index}`}
                                className={`${fileInputBaseClass} flex-1 ${errors.imageUrl?.[index] ? "border-red-500" : ""}`}
                              >
                                <div className="text-center">
                                  <UploadCloudIcon
                                    className={fileInputIconClass}
                                  />
                                  <p className="font-medium text-indigo-600">
                                    {value && value.length > 0
                                      ? "Change image"
                                      : `Upload additional image ${index + 1}`}
                                  </p>
                                  <p className={fileInputTextClass}>
                                    PNG, JPG, WEBP up to 3MB
                                  </p>
                                </div>
                              </label>
                              {value && value.length > 0 && (
                                <div className="mt-2 p-2 border border-gray-300 rounded-md bg-gray-50 flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <FileIcon className="h-5 w-5 text-gray-500" />
                                    <span className="text-sm text-gray-700 truncate max-w-[calc(100%-3rem)]">
                                      {value[0].name}
                                    </span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setValue(
                                        `imageUrl.${index}` as any,
                                        null,
                                        { shouldValidate: true }
                                      );
                                      const fileInput = document.getElementById(
                                        `imageUrl-input.${index}`
                                      ) as HTMLInputElement;
                                      if (fileInput) fileInput.value = "";
                                      setAdditionalImageUrls((prev) => {
                                        const newUrls = [...prev];
                                        if (newUrls[index]) newUrls[index] = "";
                                        return newUrls;
                                      });
                                    }}
                                    className="p-1 text-red-500 hover:text-red-700"
                                    aria-label={`Clear selected additional image ${index + 1}`}
                                  >
                                    <XIcon size={18} />
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            remove(index);
                            setAdditionalImageUrls((prev) =>
                              prev.filter((_, i) => i !== index)
                            );
                          }}
                          className="p-2 text-red-500 hover:text-red-700 transition-colors self-center mt-0"
                          aria-label={`Remove additional image slot ${index + 1}`}
                        >
                          <Trash2Icon size={20} />
                        </button>
                      </div>
                      {errors.imageUrl?.[index] && (
                        <p className={errorClass}>
                          {errors.imageUrl[index]?.message?.toString()}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
            ))}

            {fields.length < 3 && (
              <button
                type="button"
                onClick={() =>
                  append(defaultFileArrayItem as any, { shouldFocus: false })
                }
                className="mt-2 flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors p-2 rounded-md hover:bg-indigo-50"
              >
                <PlusCircleIcon size={18} className="mr-1" />
                Add Another Image
              </button>
            )}
            {errors.imageUrl &&
              !Array.isArray(errors.imageUrl) &&
              typeof errors.imageUrl.message === "string" && (
                <p className={errorClass}>{errors.imageUrl.message}</p>
              )}
          </div>

          <div>
            <label htmlFor="stockQuantity" className={labelClass}>
              Stock Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="stockQuantity"
              {...register("stockQuantity")}
              className={inputClass}
              placeholder="e.g., 25"
            />
            {errors.stockQuantity && (
              <p className={errorClass}>{errors.stockQuantity.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="details" className={labelClass}>
              Full Product Details <span className="text-red-500">*</span>
            </label>
            <textarea
              id="details"
              rows={6}
              {...register("details")}
              className={inputClass}
              placeholder="Provide comprehensive details about the product, materials, dimensions, care instructions, etc. (min. 20 characters)..."
            />
            {errors.details && (
              <p className={errorClass}>{errors.details.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <label className={labelClass}>
              Product Highlights (Exactly 3 required){" "}
              <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Summarize the best features of your product (min. 5 characters
              each).
            </p>
            {[0, 1, 2].map((index) => (
              <div key={index}>
                <input
                  type="text"
                  id={`highlights.${index}`}
                  {...register(`highlights.${index}` as const)}
                  className={inputClass}
                  placeholder={`Highlight ${index + 1}`}
                />
                {errors.highlights?.[index] && (
                  <p className={errorClass}>
                    {errors.highlights[index]?.message}
                  </p>
                )}
              </div>
            ))}
            {errors.highlights &&
              !Array.isArray(errors.highlights) &&
              typeof errors.highlights.message === "string" && (
                <p className={errorClass}>{errors.highlights.message}</p>
              )}
          </div>

          <div className="pt-6 border-t border-gray-200 mt-10">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 border border-transparent rounded-lg shadow-md text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={Object.keys(errors).length > 0}
            >
              List Product Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellPage;
