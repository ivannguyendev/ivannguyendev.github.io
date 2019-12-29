import {bind, /* inject, */ BindingScope} from '@loopback/core';
import {map as _map, fromPairs as _fromPairs} from 'lodash';
import * as Contentful from 'contentful';
import {
	Post,
	AuthorModel,
	CategoryModel,
	CMSHeadlessService,
	ContentfulHookModel,
} from '@app/models';
const contentful = Contentful.createClient({
	space: '57cdocdk35a2',
	accessToken: '-xQkbv0vF0o5s0cSX0eedHA5K4v3EwGlK6GLthJDn20',
});

@bind({scope: BindingScope.SINGLETON})
export class ContentfulCMSService implements CMSHeadlessService {
	public WebhookModel: ContentfulHookModel;
	constructor(/* Add @inject to inject parameters */) {}

	/*
	 * Add service methods here
	 */
	// async postList() {
	// 	butter.post
	// 		.list({
	// 			page: 1,
	// 			page_size: 10,
	// 			exclude_body: false,
	// 			author_slug: 'test-api',
	// 			category_slug: 'test-category',
	// 			tag_slug: 'test-tag',
	// 		})
	// 		.then(function(resp) {
	// 			console.log(resp.data);
	// 		})
	// 		.catch(function(resp) {
	// 			console.log(resp);
	// 		});
	// }
	async postRetrieve(slug: string): Promise<Post | null> {
		let resp = await contentful.getEntry<any>(slug);
		if (!resp.fields) return null;
		let postDataContentful = resp.fields;
		let postData = new Post({
			title: postDataContentful.title,
			slug: postDataContentful.slug,
			category: postDataContentful.category as CategoryModel,
			status: postDataContentful.status === 'draft' ? 'draft' : 'published',
			author: postDataContentful.author as AuthorModel,
			published_at: postDataContentful.publishedAt,
			summary: postDataContentful.description,
			body: postDataContentful.fullcontent,
			tags: postDataContentful.tags as CategoryModel[],
			attachments: postDataContentful.attachments || [],
			featured_image: postDataContentful.featured_image,
			meta_description: postDataContentful.description,
			seo_title: postDataContentful.title,
			url: postDataContentful.url,
			created_at: postDataContentful.sys.createdAt,
		});
		return postData;
	}
	// async postSearch(searchText: string, options: { page: 1, page_size: 10, } ) { butter.post
	// 		.search('buttercmsapi', {

	// 		})
	// 		.then(function(resp) {
	// 			console.log(resp.data);
	// 		})
	// 		.catch(function(resp) {
	// 			console.log(resp);
	// 		});
	// }
	// authorList() {
	// 	butter.author
	// 		.list({include: 'recent_posts'})
	// 		.then(function(resp) {
	// 			console.log(resp.data);
	// 		})
	// 		.catch(function(resp) {
	// 			console.log(resp);
	// 		});
	// }
	async authorRetrieve(slug: string): Promise<any> {
		// return butter.author
		// 	.retrieve(slug)
		// 	.then(resp => resp.data)
		// 	.catch();
	}
	// categoryList() {
	// 	butter.category
	// 		.list({
	// 			include: 'recent_posts',
	// 		})
	// 		.then(function(resp) {
	// 			console.log(resp.data);
	// 		})
	// 		.catch(function(resp) {
	// 			console.log(resp);
	// 		});
	// }
	async categoryRetrieve(slug: string): Promise<any> {
		// return butter.category
		// 	.retrieve(slug)
		// 	.then(resp => resp.data)
		// 	.catch();
	}
	// tagList() {
	// 	butter.tag
	// 		.list({include: 'recent_posts'})
	// 		.then(function(resp) {
	// 			console.log(resp.data);
	// 		})
	// 		.catch(function(resp) {
	// 			console.log(resp);
	// 		});
	// }
	async tagRetrieve(slug: string): Promise<any> {
		// return butter.tag
		// 	.retrieve(slug)
		// 	.then(resp => resp.data)
		// 	.catch();
	}
	async feedRetrieve(slug: 'rss' | 'atom' | 'sitemap'): Promise<any> {
		// return butter.feed
		// 	.retrieve(slug)
		// 	.then(resp => resp.data)
		// 	.catch();
	}
	transformData(raw: any): any {
		return contentful.parseEntries(raw);
	}
	transformPostModel(original: any, sys: any = {}): Post {
		let newPost = new Post({
			id: sys.id,
			title: original.name,
			slug: original.slug,
			category: original.category as CategoryModel,
			status: original.status === 'draft' ? 'draft' : 'published',
			author: original.author as AuthorModel,
			published_at: original.publishedAt,
			summary: original.description,
			body: original.fullcontent,
			tags: original.tags as CategoryModel[],
			attachments: original.attachments || [],
			featured_image: original.featured_image,
			meta_description: original.description,
			seo_title: original.title,
			url: original.url,
			created_at: sys.createdAt || undefined,
		});
		return newPost;
	}
}
