import { getProductById } from "@/lib/getProdutos";
import { notFound } from "next/navigation";
import PageLayout from "@/app/components/PageLayout";
import SingleProduct from "@/app/components/SingleProduct";

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

// eslint-disable-next-line @next/next/no-async-client-component
export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = params;

  const product = await getProductById(Number(id));

  if (!product) {
    return notFound();
  }

  return (
    <PageLayout>
      <SingleProduct product={product} />
    </PageLayout>
  );
}
