/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import products from "../data/products.json";
import Carousel from "./Carousel";

import useEmblaCarousel from "embla-carousel-react";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Images
import shirtImage from "../assets/white-shirt-floor-4-3.jpg";
import shirtImage2 from "../assets/foto web remera.jpeg";
import shirtImage3 from "../assets/t-shirt-3.jpg";

import greyHoodieImage from "../assets/hoodie-grey.jpg";
import greyHoodieImage2 from "../assets/foto buzo girs.jpeg";
import greyHoodieImage3 from "../assets/grey-hoodie-3.jpg";

import whiteHoodieImage from "../assets/hoodie-white.jpg";
import whiteHoodieImage2 from "../assets/fotos web buzo blanco.jpeg";
import whiteHoodieImage3 from "../assets/white-hoodie-3.jpg";

import talles1 from "../assets/talles-1.jpg";
import talles2 from "../assets/talles-2.jpg";

import InputNumber from "./inputs/InputNumber";
import { Product } from "../App";
import Typography from "@mui/material/Typography";

export type ProductToAdd = {
  product: Product;
  quantity: number;
  size: string;
  image: string;
};

type AddToCartFunction = (productToAdd: ProductToAdd) => void;

function ProductPage({ addToCart }: { addToCart: AddToCartFunction }) {
  // Producto
  const { productId } = useParams();
  const product = products.find((product) => product.id === productId);
  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  // Talles
  const sizes = product.sizes || [];
  const [selectedSize, setSelectedSize] = useState("1");

  let sizeGuideImg: string;

  console.log(selectedSize);

  // Cantidad
  const [quantity, setQuantity] = useState(1);

  // Imagen
  let productImage: string;
  let productImage2: string;
  let productImage3: string;

  if (product.id === "1") {
    productImage = shirtImage;
    productImage2 = shirtImage2;
    productImage3 = shirtImage3;
    sizeGuideImg = talles1;
  } else if (product.id === "2") {
    productImage = greyHoodieImage;
    productImage2 = greyHoodieImage2;
    productImage3 = greyHoodieImage3;
    sizeGuideImg = talles2;
  } else {
    productImage = whiteHoodieImage;
    productImage2 = whiteHoodieImage2;
    productImage3 = whiteHoodieImage3;
    sizeGuideImg = talles2;
  }

  const [selectedImage, setSelectedImage] = useState(productImage);

  useEffect(() => {
    setSelectedImage(productImage);
  }, [productImage]);

  // Agregar al carrito
  const handleAddToCart = () => {
    const productToAdd = {
      product,
      quantity,
      size: selectedSize,
      image: productImage,
    };
    console.log(productToAdd);
    addToCart(productToAdd);
  };

  const formatCurrency = (number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0, // Para evitar decimales
      maximumFractionDigits: 0, // Para evitar decimales
    }).format(number);
  };

  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <div className="flex flex-col lg:mx-[32px] lg:grid lg:grid-cols-[250px_auto] gap-y-[32px] gap-x-[32px] mt-[94px] py-[8px]">
      <div className="hidden lg:flex flex-col items-center gap-8">
        <img
          onClick={() => setSelectedImage(productImage)}
          className={`${
            selectedImage === productImage ? "opacity-70" : ""
          } hover:opacity-70 max-w-[150px] cursor-pointer transition-opacity duration-500 ease-in-out`}
          src={productImage}
          alt={product.name}
        />
        <img
          onClick={() => setSelectedImage(productImage2)}
          className={`${
            selectedImage === productImage2 ? "opacity-70" : ""
          } hover:opacity-70 max-w-[150px] cursor-pointer transition-opacity duration-500 ease-in-out`}
          src={productImage2}
          alt={product.name}
        />
        <img
          onClick={() => setSelectedImage(productImage3)}
          className={`${
            selectedImage === productImage3 ? "opacity-70" : ""
          } hover:opacity-70 max-w-[150px] cursor-pointer transition-opacity duration-500 ease-in-out`}
          src={productImage3}
          alt={product.name}
        />
      </div>

      <div className="flex flex-col justify-between lg:flex-row gap-[32px]">
        {/* Images in mobile */}
        <div className="lg:hidden embla max-w-[600px]" ref={emblaRef}>
          <div className="embla__container">
            <div className="embla__slide max-w-[600px]">
              <img src={productImage} alt={product.name} />
            </div>
            <div className="embla__slide max-w-[600px]">
              <img src={productImage2} alt={product.name} />
            </div>
            <div className="embla__slide max-w-[600px]">
              <img src={productImage3} alt={product.name} />
            </div>
          </div>
        </div>

        {/* Images in desk */}
        <div className="hidden lg:flex w-fit h-fit max-w-[600px]">
          {selectedImage === productImage && (
            <img src={productImage} alt={product.name} />
          )}

          {selectedImage === productImage2 && (
            <img src={productImage2} alt={product.name} />
          )}

          {selectedImage === productImage3 && (
            <img src={productImage3} alt={product.name} />
          )}
        </div>

        <section className="w-full px-[8px] flex flex-col gap-[24px]">
          {product.salePrice ? (
            <div>
              <h1 className="text-2xl">{product.name}</h1>
              <del className="text-l mt-2">{formatCurrency(product.price)}</del>
              <p className="text-2xl flex gap-2">{formatCurrency(product.salePrice)} <div className="bg-red-700 flex"><span className="text-white flex p-1 items-center justify-center text-sm">15% OFF</span></div></p>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl">{product.name}</h1>
              <p className="text-2xl mt-2">{formatCurrency(product.price)}</p>
            </div>
          )}

          <div className="flex flex-col gap-[8px]">
            <p className="text-l">Talle</p>
            <div className="flex flex-row gap-[16px]">
              {sizes.map((size) => (
                <label key={size} className="flex items-center">
                  <input
                    type="radio"
                    name="size"
                    value={size}
                    checked={selectedSize === size}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="sr-only"
                  />
                  <div
                    className={`cursor-pointer border border-gray-200 w-[38px] h-[38px] flex items-center justify-center ${
                      selectedSize === size ? "bg-gray-50 !border-gray-500" : ""
                    }`}
                  >
                    {size}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-row gap-[16px] items-center">
            <InputNumber value={quantity} onChange={setQuantity} />

            <button
              onClick={handleAddToCart}
              className="bg-[#004080] rounded-sm transition-all duration-400 hover:bg-[#005780] w-full h-[42px] text-white text-lg"
            >
              Añadir al carrito
            </button>
          </div>

          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>Detalles</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {product.description.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>Guía de talles</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="flex justify-center">
                  <img
                    style={{ width: "200px" }}
                    src={sizeGuideImg}
                    alt="Guia de talles"
                  />
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </section>
      </div>

      <div className="col-span-2">
        <Carousel></Carousel>
      </div>
    </div>
  );
}

export default ProductPage;
