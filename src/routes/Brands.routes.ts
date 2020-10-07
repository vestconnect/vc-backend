import { getRepository } from 'typeorm';
import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';
import multer from 'multer';
import Brand from '../models/Brand';
import BrandServices from '../services/Brand/BrandServices';

const brandsRouter = Router();
const upload = multer(uploadConfig);

brandsRouter.get('/', ensureAuthenticated, async (request, response) => {
    const brandRepository = getRepository(Brand);
    const brands = await brandRepository.find();

    response.json(brands);
});

brandsRouter.post('/', ensureAuthenticated, async (request, response) => {
    const brandRepository = getRepository(Brand);
    const { description } = request.body;

    const brand = brandRepository.create({
        description
    });

    await brandRepository.save(brand);

    response.json(brand);
});

brandsRouter.patch('/:id/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
    const brandServices = new BrandServices();
    const id = request.params.id;
    const avatar = request.file.filename;

    const brand = await brandServices.updateAvatar({ id, avatar });

    response.json(brand);
});

export default brandsRouter;