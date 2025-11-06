import { fetchSingleCollection } from "@/api/products";
import { notFound } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import { Collection } from "@/types/api.types";
import { InnerPage } from "./InnerPage";

interface Params {
  collectionId: string;
}

export const revalidate = 300; // 5 minutes

export default async function CollectionPage(props: {
  params: Promise<Params>;
}) {
  const { collectionId } = await props.params;
  const nCollection = Number(collectionId);
  if (!nCollection) {
    return notFound();
  }
  const collection = (await fetchSingleCollection(nCollection))?.collection;
  if (!collection) {
    return notFound();
  }
  return (
    <AppLayout>
      <InnerPage collection={collection} />
    </AppLayout>
  );
}
