import {Entity, model, property, belongsTo} from '@loopback/repository';

interface IDefault {
	content: string;
}
interface ISEO {
	title: string;
	description: string;
	image: string;
	icon: string;
}
interface ICategory {
	title: string;
	description: string;
	image: string;
	icon: string;
}
type T = IDefault & ISEO & ICategory;

// @model({settings: {strict: false}})
export class PageField extends Entity implements T {
	@property({
		type: 'string',
	})
	content: string;
	@property({
		type: 'string',
	})
	title: string;
	@property({
		type: 'string',
	})
	description: string;
	@property({
		type: 'string',
	})
	image: string;
	@property({
		type: 'string',
	})
	icon: string;
	// Define well-known properties here

	// Indexer property to allow additional data
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[prop: string]: any;

	constructor(data?: Partial<PageField>) {
		super(data);
	}
}

export interface PageFieldRelations {
	// describe navigational properties here
}

export type PageFieldWithRelations = PageField & PageFieldRelations;
