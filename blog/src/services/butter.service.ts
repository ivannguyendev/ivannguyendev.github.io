import {bind, /* inject, */ BindingScope} from '@loopback/core';
import {map as _map, fromPairs as _fromPairs} from 'lodash';
import * as Butter from 'buttercms';
import {Post, AuthorModel, CategoryModel, CMSHeadlessService, ButterHookModel} from '@app/models';
const butter = Butter('dedd5338789d472e149f054741d8e6ec9e83cd93');

interface AuthorButter {
	slug: string;
	first_name: string;
	last_name: string;
	email: string;
	bio: string;
	title: string;
	linkedin_url: string;
	facebook_url: string;
	pinterest_url: string;
	instagram_url: string;
	twitter_handle: string;
	profile_image: string;
}
interface CategoryButter {
	slug: string;
	name: string;
}
interface TagButter {
	slug: string;
	name: string;
}
interface PostButter {
	url: string;
	created: Date;
	published: Date;
	author: AuthorButter;
	categories: CategoryButter[];
	tags: TagButter[];
	featured_image: string;
	slug: string;
	title: string;
	body: string;
	summary: string;
	seo_title: string;
	meta_description: string;
	status: string;
}
@bind({scope: BindingScope.SINGLETON})
export class ButterCMSService implements CMSHeadlessService {
	public WebhookModel: ButterHookModel;
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
		let resp = await butter.post.retrieve(slug);
		if (!resp.data) return null;
		let postDataButter: PostButter = resp.data.data;
		let postData = {
			author: postDataButter.author as AuthorModel,
			category: postDataButter.categories[0] as CategoryModel,
			tags: postDataButter.tags as CategoryModel[],
			body: postDataButter.body,
			featured_image: postDataButter.featured_image,
			meta_description: postDataButter.meta_description,
			seo_title: postDataButter.seo_title,
			slug: postDataButter.slug,
			status: postDataButter.status === 'draft' ? 'draft' : 'published',
			summary: postDataButter.summary,
			title: postDataButter.title,
			url: postDataButter.url,
			created_at: new Date(),
			published_at: postDataButter.published,
		} as Post;
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
	async authorRetrieve(slug: string): Promise<AuthorButter> {
		return butter.author
			.retrieve(slug)
			.then(resp => resp.data)
			.catch();
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
	async categoryRetrieve(slug: string): Promise<CategoryButter> {
		return butter.category
			.retrieve(slug)
			.then(resp => resp.data)
			.catch();
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
	async tagRetrieve(slug: string): Promise<TagButter> {
		return butter.tag
			.retrieve(slug)
			.then(resp => resp.data)
			.catch();
	}
	async feedRetrieve(slug: 'rss' | 'atom' | 'sitemap'): Promise<string> {
		return butter.feed
			.retrieve(slug)
			.then(resp => resp.data)
			.catch();
	}
}
