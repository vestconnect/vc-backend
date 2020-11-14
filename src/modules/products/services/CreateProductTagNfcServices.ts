import { inject, injectable } from 'tsyringe';
import IProductsTagsNfcRepository from '../repositories/IProductsTagsNfcRepository';
import ProductTagNfc from '../infra/typeorm/entities/ProductTagNfc';
import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import xls from 'read-excel-file/node';

interface IRequest {
    product_id: string;
    file: string;
}

interface ITagNfc {
    id: string;
}

@injectable()
class CreateProductTagNfcServices {
    constructor(
        @inject('ProductsTagsNfcRepository')
        private productsTagsNfcRepository: IProductsTagsNfcRepository
    ) { }

    public async execute({ product_id, file }: IRequest): Promise<ProductTagNfc[]> {
        let tags: ITagNfc[] = [];
        const productsTagsNfc: ProductTagNfc[] = [];

        await fs.promises.rename(
            path.resolve(uploadConfig.tmpFolder, file),
            path.resolve(uploadConfig.uploadsFolder, file)
        );

        const xlsTags = path.resolve(__dirname, '..', '..', '..', '..', 'tmp', 'uploads', file);

        const rows = await xls(xlsTags);

        rows.forEach((col: any) => {
            col.forEach((data: any) => {
                tags.push({ id: data });
            });
        });

        for (const tag of tags) {
            const productTag = await this.productsTagsNfcRepository.create({ product_id, tag_nfc: tag.id });

            productsTagsNfc.push({
                active: true,
                id: productTag.id,
                product: productTag.product,
                product_id: productTag.product_id,
                tag_nfc: productTag.tag_nfc
            });
        }

        return productsTagsNfc;
    }
}

export default CreateProductTagNfcServices;