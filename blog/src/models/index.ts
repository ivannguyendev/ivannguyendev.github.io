import {Post} from '@app/models/post';

export interface IOptions {
	locale?: string;
	sort?: string;
	pageSize?: string;
	pageIndex?: string;
	offset?: number;
	skip?: number;
}
export interface CMSHeadlessService {
	postRetrieve(slug: string): Promise<Post | null>;
	authorRetrieve(slug: string): any;
	categoryRetrieve(slug: string): any;
	tagRetrieve(slug: string): any;
	feedRetrieve(slug: string): any;
}
export * from '@app/models/post';
export * from '@app/models/cmsheadless';
