import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Page, PageWithRelations} from '@app/models/pages/pages.model';

@model()
export class PageToPage extends Entity {
	@property({
		type: 'string',
		id: true,
		index: true,
		required: true,
	})
	id: string;
	@belongsTo(() => Page)
	pageA: string;
	@belongsTo(() => Page)
	pageB: string;

	constructor(data?: Partial<PageToPage>) {
		super(data);
	}
}

export interface PageToPageRelations {
	// describe navigational properties here
	pageA: PageWithRelations;
	pageB: PageWithRelations;
}

export type PageToPageWithRelations = PageToPage & PageToPageRelations;
