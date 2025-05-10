export interface PRODUIT_T {
    product_name: string,
    id: string,
    description?: string,
    price: number,
    establishment: string,
    category?: string,
}
export interface PRODUIT_IMAGE_T {
    images: string,
    product: string,
    id: string,
}

export interface DRIVER_T {
    driver_name: string,
    id: string,
    piece: string,
    longitude?: number,
    latitude?: string,
    contact: string,
}