import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
    public async parse({ template }: IParseMailTemplateDTO): Promise<string> {
        return template;
    }
}

export default HandlebarsMailTemplateProvider