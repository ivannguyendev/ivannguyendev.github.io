import {DefaultCrudRepository, repository} from '@loopback/repository';
// import {Page, PageRelations} from '@app/models';
import {DbDataSource} from '@app/datasources';
import {inject} from '@loopback/core';
import {UtilsDomainService} from '@app/services';

interface IOptions {
	locale?: string;
	sort?: string;
	pageSize?: string;
	pageIndex?: string;
	offset?: number;
	skip?: number;
}
interface IPageRepository {}

// export class PageRepository
// 	extends DefaultCrudRepository<Page, typeof Page.prototype.id, PageRelations>
// 	implements IPageRepository {
// 	constructor(
// 		@inject('datasources.db') dataSource: DbDataSource,
// 		@inject('services.UtilsDomainService')
// 		utils: UtilsDomainService,
// 	) {
// 		super(Page, dataSource);
// 	}


	// public async getOneBySlug(slug: string, options: IOptions): Promise<any> {
	// 	let postPromise = await this.findOne({
	// 		where: {
	// 			slug: slug,
	// 		},
	// 	});
	// 	if (postPromise == null) throw new Error('not found post');
	// 	let attribute = await this.postAttributeRepository.findOne({
	// 		where: {
	// 			post: postPromise.getId(),
	// 			locale: options.locale,
	// 		},
	// 	});
	// 	return {...postPromise, ...attribute};
	// }

	// public async getManyBySlug(slug: string, options: IOptions): Promise<any> {
	// 	let postArray = await this.find({
	// 		where: {
	// 			slug: slug,
	// 		},
	// 	});
	// 	let result = await Promise.all(
	// 		postArray.map(async postPromise => {
	// 			let attribute = await this.postAttributeRepository.findOne({
	// 				where: {
	// 					post: postPromise.getId(),
	// 					locale: options.locale,
	// 				},
	// 			});
	// 			return {...postPromise, ...attribute};
	// 		}),
	// 	);
	// 	return result;
	// }
	// public async create(entity: Partial<Post>, options?: any) {
	// 	entity.slug = this.utils.slugify(entity.name || '');
	// 	let postPromise = (await super.findOne({
	// 		where: {
	// 			slug: entity.slug,
	// 		},
	// 		order: ['noId DESC'],
	// 		fields: {noId: true},
	// 	})) || {noId: 0};
	// 	entity.noId = Number(postPromise.noId) + 1;
	// 	return super.create(entity, options);
	// }
// }
