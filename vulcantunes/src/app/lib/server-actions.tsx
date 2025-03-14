export async function getProduct(model: string) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/product/${model}`, {
    next: { revalidate: 60 }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch product')
  }

  return res.json()
}
