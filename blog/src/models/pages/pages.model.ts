import {Entity, model, property} from '@loopback/repository';
import {PageField} from '@app/models/pages/page-fields.model';

export const CONST_PAGE_STATUS = <const>['draft', 'published', 'hidded', 'scheduled'];
export type TPageStatus = typeof CONST_PAGE_STATUS[number];
export const DefaultPageStatus = 'draft';

@model()
export class Page extends Entity {
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
		jsonSchema: {
			maxLength: 30,
			minLength: 5,
		},
	})
	title: string;
	@property({
		type: 'string',
		required: true,
		index: true,
	})
	slug: string;
	@property({
		type: 'string',
		required: true,
		index: true,
		jsonSchema: {
			enum: CONST_PAGE_STATUS,
		},
		default: DefaultPageStatus,
	})
	status: string;
	@property({
		type: 'string',
		required: true,
		index: true,
	})
	type: string;
	@property({
		type: 'string',
		required: true,
		index: true,
		default: 'vi',
	})
	locale: string;
	@property({
		type: 'object',
	})
	fields: PageField;

	constructor(data?: Partial<Page>) {
		super(data);
	}
}

export interface PageRelations {
	// describe navigational properties here
}

export type PageWithRelations = Page & PageRelations;
