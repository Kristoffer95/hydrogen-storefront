export default ({featuredProducts}: {featuredProducts: any}) => {
  return (
    <div className="flex">
      {featuredProducts.collection.products.edges.map((product: any) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </div>
  );
};

const ProductCard = ({product}: {product: any}) => {
  return (
    <div className="border">
      {/* <pre>{JSON.stringify(product, null, 2)}</pre> */}
      <img src={product.node.featuredImage.url} alt="sample alt" />
    </div>
  );
};
