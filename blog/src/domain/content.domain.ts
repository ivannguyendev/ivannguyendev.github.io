import {Count, Filter, repository, Where} from '@loopback/repository';
import {Post, AuthorModel, CategoryModel} from '@app/models';
import {PostRepository} from '@app/repositories';
import {IOptions} from '@app/models';
import {inject, BindingScope, bind} from '@loopback/core';
import {UtilsDomainService, ButterCMSService, ContentfulCMSService} from '@app/services';

@bind({scope: BindingScope.SINGLETON})
export class ContentDomain {
	constructor(
		@repository(PostRepository)
		public postRepository: PostRepository,
		@inject('services.UtilsDomainService')
		public utils: UtilsDomainService,
		@inject('services.ContentfulCMSService')
		public cmsHeadless: ContentfulCMSService,
	) {}

	async findPosts(filter?: Filter<Post>, options: IOptions = {}): Promise<Post[]> {
		try {
			let postData = await this.postRepository.find(filter, options);
			return postData;
		} catch (error) {
			console.error(error);
			throw new Error('404 not found data');
		}
	}

	async getPostBySlug(slug: string, options: IOptions = {}): Promise<Post> {
		try {
			let postData = await this.postRepository.findOne({where: {slug: slug}}, options);
			if (postData) return postData;
			let newPostData = await this.cmsHeadless.postRetrieve(slug);
			if (!newPostData) throw new Error('404 not found data');
			return this.postRepository.create(newPostData);
		} catch (error) {
			console.error(error);
			throw new Error('404 not found data');
		}
	}

	async getPostById(id: string, options: IOptions = {}): Promise<Post> {
		try {
			let postData = await this.postRepository.findById(id, options);
			return postData;
		} catch (error) {
			console.error(error);
			throw new Error('404 not found data');
		}
	}

	async createOrUpdate(
		filter: Filter<Post>,
		newData: Partial<Post>,
		updateData: Partial<Post>,
		options: IOptions = {},
	): Promise<Post> {
		try {
			let postData = await this.postRepository.findOne(filter, options);
			if (!postData) return this.postRepository.create(newData);
			else {
				this.postRepository.updateById(postData.getId(), updateData);
				return postData;
			}
		} catch (error) {
			console.error(error);
			throw new Error('404 not found data');
		}
	}

	async deleteById(id: string, options: IOptions = {}): Promise<Boolean> {
		try {
			let postData = await this.postRepository.updateById(id, {
				status: 'hidden',
			} as Post);
			return true;
		} catch (error) {
			console.error(error);
			throw new Error('404 not found data');
		}
	}
}
