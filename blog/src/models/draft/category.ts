import {Entity, model, property, belongsTo} from '@loopback/repository';

export const CONST_CATEGORY_STATUS = <const>['draft', 'published', 'hidden'];
export type TCategoryStatus = typeof CONST_CATEGORY_STATUS[number];
export const DefaultCategoryStatus = 'draft';

@model()
export class Category extends Entity {
	@property({
		type: 'string',
		id: true,
		index: true,
		required: true,
	})
	id: string;
	@property({
		type: 'string',
		required: true,
		index: true,
	})
	slug: string;
	@property({
		type: 'string',
		required: true,
		jsonSchema: {
			maxLength: 100,
			minLength: 5,
		},
	})
	name: string;
	@property({
		type: 'string',
	})
	description: string;
	@property({
		type: 'string',
	})
	seo_title: string;
	@property({
		type: 'string',
		required: true,
		index: true,
		jsonSchema: {
			enum: CONST_CATEGORY_STATUS,
		},
		default: DefaultCategoryStatus,
	})
	status: string;
	@property({
		type: 'string',
	})
	thumbnail_image: string;
	@property({
		type: 'string',
	})
	url: string;
	@property({
		type: 'date',
		default: Date.now,
	})
	created_at: Date;
	@property({
		type: 'date',
	})
	published_at: Date;
	@property({
		type: 'string',
	})
	type: string;
	constructor(data?: Partial<Category>) {
		super(data);
	}
}

export interface CategoryRelations {
	// describe navigational properties here
}

export type CategoryWithRelations = Category & CategoryRelations;
