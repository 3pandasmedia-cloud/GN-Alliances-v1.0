import LakeeshopClient from "../../LakeeshopClient";

export default async function Page({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <LakeeshopClient page="detail" productCode={code}/>;
}
