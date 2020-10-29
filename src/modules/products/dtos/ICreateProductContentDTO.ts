enum Type {
    Photos = "P",
    Videos = "V",
    Texts = "T"
}

export default interface ICreateProductContentDTO {
    description: string;
    type: Type;
    product_id: string;
}