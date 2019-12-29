import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Post, PostWithRelations} from '@app/models/post';
import {Category, CategoryWithRelations} from '@app/models/draft/category';

@model()
export class PageToPage extends Entity {
	@property({
		type: 'string',
		id: true,
		index: true,
		required: true,
	})
	id: string;
	@hasOne(() => Post)
	post: Post;
	@hasOne(() => Category)
	category: Category;

	constructor(data?: Partial<PageToPage>) {
		super(data);
	}
}

export interface PageToPageRelations {
	// describe navigational properties here
	post: PostWithRelations;
	category: CategoryWithRelations;
}

export type PageToPageWithRelations = PageToPage & PageToPageRelations;
